import { useState } from "react";



function AjoneuvoLomake() {
  const tyhjaLomake = {
    rekisterinumero: "",
    merkki: "",
    malli: "",
    tyyppi: "",
    vuosimalli: new Date().getFullYear(), // Lisätty nykyinen vuosi oletuksena, mutta käyttäjä voi muuttaa sen halutessaan (oletuksena uusia ajonevuoja)
    kayttoonottoPvm: "",
    kayttovoima: "",
    vaihteisto: "",
    kulutus: "",
    kulutusYksikko: "",
    ymparistoLuokitus: "",
    neliveto: false,
    katsastettu_pvm: "",
    seuraava_katsastus: "",
    ajokilometrit: 0,
    kaytossa: false,
  };

  const [lomake, setLomake] = useState(tyhjaLomake);
  const [viesti, setViesti] = useState("");

  const muuta = (e) => {
    // erotellaaan even-objektista tarvittavat tiedot: name, value, type ja checked
    const { name, value, type, checked } = e.target;

    setLomake((lomake) => {
      const paivitetty = {
        ...lomake,

        // Päivitetään se kenttä jota muutettiin
        // Jos kyseessä checkbox niin käytetään true/false, muuten käytetään value (string)
        // menee myös numeraaliset kentät tekstiksi nyt, mutta se ei ole ongelma, koska ei ole tarkoitus tehdä laskuja
        [name]: type === "checkbox" ? checked : value,
      };

      if (name === "kayttovoima") {
        paivitetty.kulutusYksikko = value === "Sähkö" ? "kWh/100km" : "l/100km"; // Päivitetään kulutusYksikko automaattisesti käyttovoiman mukaan - kokeiltu printeillä ja näyttäisi toimivan oikein!
      }
      return paivitetty;
    });

    setViesti("");
  };

  const lisaaTiedot = () => {
    // pakoalliset kentät
    if (
      !lomake.rekisterinumero.trim() ||
      !lomake.merkki.trim() ||
      !lomake.malli.trim() ||
      !lomake.tyyppi ||
      !lomake.kayttoonottoPvm ||
      !lomake.kayttovoima ||
      !lomake.vaihteisto
    ) {
      setViesti(
        "Täytä vähintään rekisterinumero, merkki, malli, tyyppi, käyttöönottopvm, käyttovoima ja vaihteisto",
      );
      return;
    }

    setViesti(
      "Ajoneuvon tiedot tallennettiin (ei oikeasti tallennettu mihinkään)",
    );
    setLomake(tyhjaLomake);
  };

  return (
    <>
      <h2 style={{ fontFamily: "Arial", margin: 0, padding: 0 }}>
        Ajoneuvolomake
      </h2>

      <form id="ajoneuvo-lomake">
        <label>
          Rekisterinumero:{" "}
          <input
            type="text"
            name="rekisterinumero"
            value={lomake.rekisterinumero}
            onChange={muuta}
          />
          <br />
        </label>

        <label>
          Merkki:{" "}
          <input
            type="text"
            name="merkki"
            value={lomake.merkki}
            onChange={muuta}
          />
          <br />
        </label>

        <label>
          Malli:{" "}
          <input
            type="text"
            name="malli"
            value={lomake.malli}
            onChange={muuta}
          />
          <br />
        </label>

                <label>
          Liikennekäytössä:{" "}
          <input
            type="checkbox"
            name="kaytossa"
            checked={lomake.kaytossa}
            onChange={muuta}
          />
          <br />
        </label>


        {/* Dropdown*/}
        <label>
          Tyyppi:{" "}
          <select name="tyyppi" value={lomake.tyyppi} onChange={muuta}>
            <option value="">Valitse tyyppi</option>
            <option value="Henkilöauto">Henkilöauto</option>
            <option value="Pakettiauto">Pakettiauto</option>
            <option value="Kuorma-auto">Kuorma-auto</option>
          </select>
          <br />
        </label>

        <label>
          Vuosimalli:{" "}
          <input
            type="number"
            name="vuosimalli"
            value={lomake.vuosimalli}
            onChange={muuta}
          />
          <br />
        </label>


        {/* Dropdown*/}

        {/* Datepicker = type=date*/}
        <label>
          Katsastettu pvm:{" "}
          <input
            type="date"
            name="katsastettu_pvm"
            value={lomake.katsastettu_pvm}
            onChange={muuta}
          />
          <br />
        </label>
        {/* Datepicker = type=date*/}
        <label>
          Seuraava katsastus:{" "}
          <input
            type="date"
            name="seuraava_katsastus"
            value={lomake.seuraava_katsastus}
            onChange={muuta}
          />
          <br />
        </label>

        <label>
          Ajokilometrit:{" "}
          <input
            type="number"
            name="ajokilometrit"
            value={lomake.ajokilometrit}
            onChange={muuta}
          />
          <br />
        </label>

        {/* Checkboxi */}

        {/* Painike */}
        <input type="button" value="Lisää" onClick={lisaaTiedot} />
      </form>
      <br />
      {viesti}
    </>
  );
}

export default AjoneuvoLomake;
