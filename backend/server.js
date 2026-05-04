const express = require('express');
const app = express();

const helmet = require('helmet');
// Sallitaan, että frontend voi hakea dataa backendistä
app.use(helmet({ crossOriginResourcePolicy: false }));

// Käsittelee lomakedataa
app.use(express.urlencoded({ limit: '5mb', extended: true }));

// Käsittelee JSON-muotoista dataa
app.use(express.json());

const cors = require('cors');
// Sallitaan pyynnöt Reactista
app.use(cors());

const sqlite3 = require('sqlite3').verbose();

// Avataan tietokanta
const db = new sqlite3.Database('ajoneuvot.db', (error) => {
  if (error) {
    console.log(error.message);
    return;
  }

  console.log('Tietokanta avattu');
});

// Käynnistetään backend
app.listen(8080, () => {
  console.log('Node toimii localhost:8080');
});

// Testireitti
app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Toimii' });
});

// Haetaan kaikki ajoneuvot
app.get('/ajoneuvo/all', (req, res) => {
  db.all('SELECT * FROM ajoneuvo', (error, result) => {
    if (error) {
      console.log(error.message);
      return res.status(400).json({ message: error.message });
    }

    return res.status(200).json(result);
  });
});

// Haetaan yksi ajoneuvo id:n perusteella
app.get('/ajoneuvo/one/:id', (req, res) => {
  let id = req.params.id;

  db.get('SELECT * FROM ajoneuvo WHERE id = ?', [id], (error, result) => {
    if (error) {
      console.log(error.message);
      return res.status(400).json({ message: error.message });
    }

    if (typeof result === 'undefined') {
      return res.status(404).json({ message: 'Haettua ajoneuvoa ei ole' });
    }

    return res.status(200).json(result);
  });
});

// Haetaan kaikki katsastukset
app.get('/katsastus/all', (req, res) => {
  db.all('SELECT * FROM katsastus', (error, result) => {
    if (error) {
      console.log(error.message);
      return res.status(400).json({ message: error.message });
    }

    return res.status(200).json(result);
  });
});

// Haetaan yhden ajoneuvon katsastukset
app.get('/katsastus/ajoneuvo/:id', (req, res) => {
  let id = req.params.id;

  db.all(
    'SELECT * FROM katsastus WHERE ajoneuvoId = ?',
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

// Lisätään uusi ajoneuvo
app.post('/ajoneuvo/add', (req, res) => {
  let ajoneuvo = req.body;

  db.run(
    `INSERT INTO ajoneuvo 
    (rekisterinumero, merkki, malli, tyyppi, kayttoonottoPvm, kaytossa)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [
      ajoneuvo.rekisterinumero,
      ajoneuvo.merkki,
      ajoneuvo.malli,
      ajoneuvo.tyyppi,
      ajoneuvo.kayttoonottoPvm,
      ajoneuvo.kaytossa,
    ],
    (error) => {
      if (error) {
        console.log(error.message);
        return res.status(400).json({ message: error.message });
      }

      return res.status(200).json({ count: 1 });
    }
  );
});

// Lisätään uusi katsastus
app.post('/katsastus/add', (req, res) => {
  let katsastus = req.body;

  db.run(
    `INSERT INTO katsastus 
    (ajoneuvoId, katsastus_pvm, voimassa_asti, tulos, kilometrit, huomiot)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [
      katsastus.ajoneuvoId,
      katsastus.katsastus_pvm,
      katsastus.voimassa_asti,
      katsastus.tulos,
      katsastus.kilometrit,
      katsastus.huomiot,
    ],
    (error) => {
      if (error) {
        console.log(error.message);
        return res.status(400).json({ message: error.message });
      }

      return res.status(200).json({ count: 1 });
    }
  );
});

// Poistetaan ajoneuvo id:n perusteella
app.delete('/ajoneuvo/delete/:id', (req, res) => {
  let id = req.params.id;

  db.run('DELETE FROM ajoneuvo WHERE id = ?', [id], function (error) {
    if (error) {
      console.log(error.message);
      return res.status(400).json({ message: error.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'Ei poistettavaa ajoneuvoa' });
    }

    return res.status(200).json({ count: this.changes });
  });
});

// Poistetaan katsastus id:n perusteella
app.delete('/katsastus/delete/:id', (req, res) => {
  let id = req.params.id;

  db.run('DELETE FROM katsastus WHERE id = ?', [id], function (error) {
    if (error) {
      console.log(error.message);
      return res.status(400).json({ message: error.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'Ei poistettavaa katsastusta' });
    }

    return res.status(200).json({ count: this.changes });
  });
});

// Jos pyydettyä reittiä ei ole olemassa
app.get('*splat', (req, res) => {
  return res.status(404).json({ message: 'Ei pyydettyä palvelua' });
});