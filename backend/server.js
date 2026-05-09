const express = require('express');
const app = express();

const helmet = require('helmet');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

// =========================
// MIDDLEWARET
// =========================

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors());

// Mahdollistaa lomakedatan lukemisen
app.use(express.urlencoded({ limit: '5mb', extended: true }));

// Mahdollistaa JSON-bodyn lukemisen
app.use(express.json());

// =========================
// TIETOKANTA
// =========================

const db = new sqlite3.Database('ajoneuvot.db', (error) => {
  if (error) {
    console.log('Tietokannan avaus epäonnistui:', error.message);
    return;
  }

  console.log('Tietokanta avattu');
});

// =========================
// PALVELIMEN KÄYNNISTYS
// =========================

app.listen(8080, () => {
  console.log('Node toimii localhost:8080');
});

// =========================
// TESTIREITTI
// =========================

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Toimii' });
});

// =========================
// AJONEUVOT
// =========================

// Hae kaikki ajoneuvot
app.get('/ajoneuvo/all', (req, res) => {
  db.all('select * from ajoneuvo', (error, result) => {
    if (error) {
      console.log(error.message);
      return res.status(400).json({ message: error.message });
    }

    return res.status(200).json(result);
  });
});

// Hae yksi ajoneuvo id:n perusteella
app.get('/ajoneuvo/one/:id', (req, res) => {
  const id = Number(req.params.id);

  db.get('select * from ajoneuvo where id = ?', [id], (error, result) => {
    if (error) {
      console.log(error.message);
      return res.status(400).json({ message: error.message });
    }

    if (!result) {
      return res.status(404).json({ message: 'Haettua ajoneuvoa ei ole' });
    }

    return res.status(200).json(result);
  });
});

// Hae yksi ajoneuvo ja sen katsastukset
app.get('/ajoneuvo/one/:id/katsastukset', (req, res) => {
  const id = Number(req.params.id);

  db.get('select * from ajoneuvo where id = ?', [id], (error, ajoneuvo) => {
    if (error) {
      console.log(error.message);
      return res.status(400).json({ message: error.message });
    }

    if (!ajoneuvo) {
      return res.status(404).json({ message: 'Haettua ajoneuvoa ei ole' });
    }

    db.all(
      'select * from katsastus where ajoneuvoId = ?',
      [id],
      (error, katsastukset) => {
        if (error) {
          console.log(error.message);
          return res.status(400).json({ message: error.message });
        }

        return res.status(200).json({
          ...ajoneuvo,
          katsastukset: katsastukset
        });
      }
    );
  });
});

// Lisää uusi ajoneuvo
app.post('/ajoneuvo/add', (req, res) => {
  const ajoneuvo = req.body;

  db.run(
    `insert into ajoneuvo 
    (rekisterinumero, merkki, malli, tyyppi, kayttoonottoPvm, kaytossa)
    values (?, ?, ?, ?, ?, ?)`,
    [
      ajoneuvo.rekisterinumero,
      ajoneuvo.merkki,
      ajoneuvo.malli,
      ajoneuvo.tyyppi,
      ajoneuvo.kayttoonottoPvm,
      Number(ajoneuvo.kaytossa)
    ],
    function (error) {
      if (error) {
        console.log(error.message);
        return res.status(400).json({ message: error.message });
      }

      return res.status(201).json({
        message: 'Ajoneuvo lisättiin',
        count: 1,
        id: this.lastID
      });
    }
  );
});

// Muokkaa ajoneuvoa
app.put('/ajoneuvo/update/:id', (req, res) => {
  const id = Number(req.params.id);
  const ajoneuvo = req.body;

  console.log('PUT /ajoneuvo/update/' + id);
  console.log('Body:', ajoneuvo);

  db.run(
    `update ajoneuvo
     set rekisterinumero = ?,
         merkki = ?,
         malli = ?,
         tyyppi = ?,
         kayttoonottoPvm = ?,
         kaytossa = ?
     where id = ?`,
    [
      ajoneuvo.rekisterinumero,
      ajoneuvo.merkki,
      ajoneuvo.malli,
      ajoneuvo.tyyppi,
      ajoneuvo.kayttoonottoPvm,
      Number(ajoneuvo.kaytossa),
      id
    ],
    function (error) {
      if (error) {
        console.log('SQL-virhe:', error.message);
        return res.status(400).json({ message: error.message });
      }

      console.log('Muutettuja ajoneuvoja:', this.changes);

      if (this.changes === 0) {
        return res.status(404).json({
          message: 'Ajoneuvoa ei löytynyt id:llä ' + id
        });
      }

      return res.status(200).json({
        message: 'Ajoneuvo päivitettiin',
        count: this.changes
      });
    }
  );
});

// Poista ajoneuvo
app.delete('/ajoneuvo/delete/:id', (req, res) => {
  const id = Number(req.params.id);

  db.run('delete from ajoneuvo where id = ?', [id], function (error) {
    if (error) {
      console.log(error.message);
      return res.status(400).json({ message: error.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'Ei poistettavaa ajoneuvoa' });
    }

    return res.status(200).json({
      message: 'Ajoneuvo poistettiin',
      count: this.changes
    });
  });
});

// =========================
// KATSASTUKSET
// =========================

// Hae kaikki katsastukset
app.get('/katsastus/all', (req, res) => {
  db.all('select * from katsastus', (error, result) => {
    if (error) {
      console.log(error.message);
      return res.status(400).json({ message: error.message });
    }

    return res.status(200).json(result);
  });
});

// Hae yhden ajoneuvon katsastukset
app.get('/katsastus/ajoneuvo/:id', (req, res) => {
  const id = Number(req.params.id);

  db.all(
    'select * from katsastus where ajoneuvoId = ?',
    [id],
    (error, result) => {
      if (error) {
        console.log(error.message);
        return res.status(400).json({ message: error.message });
      }

      return res.status(200).json(result);
    }
  );
});

// Lisää uusi katsastus
app.post('/katsastus/add', (req, res) => {
  const katsastus = req.body;

  db.run(
    `insert into katsastus
    (ajoneuvoId, katsastus_pvm, voimassa_asti, tulos, kilometrit, huomiot)
    values (?, ?, ?, ?, ?, ?)`,
    [
      Number(katsastus.ajoneuvoId),
      katsastus.katsastus_pvm,
      katsastus.voimassa_asti,
      katsastus.tulos,
      Number(katsastus.kilometrit),
      katsastus.huomiot
    ],
    function (error) {
      if (error) {
        console.log(error.message);
        return res.status(400).json({ message: error.message });
      }

      return res.status(201).json({
        message: 'Katsastus lisättiin',
        count: 1,
        id: this.lastID
      });
    }
  );
});

// Muokkaa katsastusta
app.put('/katsastus/update/:id', (req, res) => {
  const id = Number(req.params.id);
  const katsastus = req.body;

  console.log('PUT /katsastus/update/' + id);
  console.log('Body:', katsastus);

  db.run(
    `update katsastus
     set ajoneuvoId = ?,
         katsastus_pvm = ?,
         voimassa_asti = ?,
         tulos = ?,
         kilometrit = ?,
         huomiot = ?
     where id = ?`,
    [
      Number(katsastus.ajoneuvoId),
      katsastus.katsastus_pvm,
      katsastus.voimassa_asti,
      katsastus.tulos,
      Number(katsastus.kilometrit),
      katsastus.huomiot,
      id
    ],
    function (error) {
      if (error) {
        console.log('SQL-virhe:', error.message);
        return res.status(400).json({ message: error.message });
      }

      console.log('Muutettuja katsastuksia:', this.changes);

      if (this.changes === 0) {
        return res.status(404).json({
          message: 'Katsastusta ei löytynyt id:llä ' + id
        });
      }

      return res.status(200).json({
        message: 'Katsastus päivitettiin',
        count: this.changes
      });
    }
  );
});

// Poista katsastus
app.delete('/katsastus/delete/:id', (req, res) => {
  const id = Number(req.params.id);

  db.run('delete from katsastus where id = ?', [id], function (error) {
    if (error) {
      console.log(error.message);
      return res.status(400).json({ message: error.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'Ei poistettavaa katsastusta' });
    }

    return res.status(200).json({
      message: 'Katsastus poistettiin',
      count: this.changes
    });
  });
});

// =========================
// VIRHEELLINEN REITTI
// Tämä pitää olla aina viimeisenä
// =========================

app.use((req, res) => {
  return res.status(404).json({ message: 'Ei pyydettyä palvelua' });
});