const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("ajoneuvot.db");

const ajoneuvot = [
  {
    id: 1,
    rekisterinumero: "ABK-115",
    merkki: "Toyota",
    malli: "Yaris",
    tyyppi: "Henkilöauto",
    kayttoonottoPvm: "2021-03-15",
    kaytossa: 1,
  },
  {
    id: 2,
    rekisterinumero: "ABC-456",
    merkki: "Ford",
    malli: "Transit",
    tyyppi: "Pakettiauto",
    kayttoonottoPvm: "2019-06-20",
    kaytossa: 0,
  },
  {
    id: 3,
    rekisterinumero: "GHI-789",
    merkki: "Tesla",
    malli: "Model joku",
    tyyppi: "Henkilöauto",
    kayttoonottoPvm: "2023-05-12",
    kaytossa: 1,
  },
  {
    id: 4,
    rekisterinumero: "JKL-221",
    merkki: "Mercedes-Benz",
    malli: "Vito",
    tyyppi: "Pakettiauto",
    kayttoonottoPvm: "2020-02-18",
    kaytossa: 1,
  },
  {
    id: 5,
    rekisterinumero: "PRS-905",
    merkki: "Skoda",
    malli: "Octavia",
    tyyppi: "Henkilöauto",
    kayttoonottoPvm: "2017-11-03",
    kaytossa: 0,
  },
];

const katsastukset = [
  {
    id: 1,
    ajoneuvoId: 1,
    katsastus_pvm: "2023-04-10",
    voimassa_asti: "2026-04-10",
    tulos: "Hyväksytty",
    kilometrit: 15000,
    huomiot: "Ei huomautettavaa",
  },
  {
    id: 2,
    ajoneuvoId: 2,
    katsastus_pvm: "2016-11-05",
    voimassa_asti: "2020-11-05",
    tulos: "Hylätty",
    kilometrit: 50000,
    huomiot: "Jarrut kuluneet",
  },
  {
    id: 3,
    ajoneuvoId: 2,
    katsastus_pvm: "2020-01-05",
    voimassa_asti: "2024-01-05",
    tulos: "Hyväksytty",
    kilometrit: 8000,
    huomiot: "Ei huomautettavaa",
  },
  {
    id: 4,
    ajoneuvoId: 3, 
    katsastus_pvm: "2024-02-14",
    voimassa_asti: "2025-02-14",
    tulos: "Hyväksytty",
    kilometrit: 12000,
    huomiot: "Sähköjärjestelmä tarkastettu",
  },
  {
    id: 5,
    ajoneuvoId: 1, 
    katsastus_pvm: "2022-03-22",
    voimassa_asti: "2023-03-22",
    tulos: "Hylätty",
    kilometrit: 38000,
    huomiot: "Pakokaasupäästöt liian korkeat",
  },
  {
    id: 6,
    ajoneuvoId: 4, 
    katsastus_pvm: "2023-09-10",
    voimassa_asti: "2024-09-10",
    tulos: "Hyväksytty",
    kilometrit: 54000,
    huomiot: "Etujarrut kuluneet, seurattava",
  },
  {
    id: 7,
    ajoneuvoId: 5, 
    katsastus_pvm: "2021-05-05",
    voimassa_asti: "2022-05-05",
    tulos: "Hylätty",
    kilometrit: 92000,
    huomiot: "Iskunvaimentimet vuotavat",
  },
  {
    id: 8,
    ajoneuvoId: 3, // Tesla
    katsastus_pvm: "2022-12-01",
    voimassa_asti: "2023-12-01",
    tulos: "Hyväksytty",
    kilometrit: 8000,
    huomiot: "Ei huomautettavaa",
  },
];

db.serialize(() => {
  db.run("DROP TABLE IF EXISTS katsastus");
  db.run("DROP TABLE IF EXISTS ajoneuvo");

  db.run(`
    CREATE TABLE ajoneuvo (
      id INTEGER PRIMARY KEY,
      rekisterinumero TEXT,
      merkki TEXT,
      malli TEXT,
      tyyppi TEXT,
      kayttoonottoPvm TEXT,
      kaytossa INTEGER
    )
  `);

  console.log("Taulu ajoneuvo luotiin");

  db.run(`
    CREATE TABLE katsastus (
      id INTEGER PRIMARY KEY,
      ajoneuvoId INTEGER,
      katsastus_pvm TEXT,
      voimassa_asti TEXT,
      tulos TEXT,
      kilometrit INTEGER,
      huomiot TEXT,
      FOREIGN KEY (ajoneuvoId) REFERENCES ajoneuvo(id)
    )
  `);

  console.log("Taulu katsastus luotiin");

  const ajoneuvoStmt = db.prepare(`
    INSERT INTO ajoneuvo
    (id, rekisterinumero, merkki, malli, tyyppi, kayttoonottoPvm, kaytossa)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  ajoneuvot.forEach((ajoneuvo) => {
    ajoneuvoStmt.run(
      ajoneuvo.id,
      ajoneuvo.rekisterinumero,
      ajoneuvo.merkki,
      ajoneuvo.malli,
      ajoneuvo.tyyppi,
      ajoneuvo.kayttoonottoPvm,
      ajoneuvo.kaytossa,
    );

    console.log(
      "Rivi lisättiin " +
        ajoneuvo.rekisterinumero +
        " " +
        ajoneuvo.merkki +
        " " +
        ajoneuvo.malli,
    );
  });

  ajoneuvoStmt.finalize();

  const katsastusStmt = db.prepare(`
    INSERT INTO katsastus
    (id, ajoneuvoId, katsastus_pvm, voimassa_asti, tulos, kilometrit, huomiot)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  katsastukset.forEach((katsastus) => {
    katsastusStmt.run(
      katsastus.id,
      katsastus.ajoneuvoId,
      katsastus.katsastus_pvm,
      katsastus.voimassa_asti,
      katsastus.tulos,
      katsastus.kilometrit,
      katsastus.huomiot,
    );

    console.log(
      "Rivi lisättiin katsastus " +
        katsastus.katsastus_pvm +
        " " +
        katsastus.tulos,
    );
  });

  katsastusStmt.finalize();
});

db.close();
