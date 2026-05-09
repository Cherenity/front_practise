import { useState, useEffect } from "react";
import { useParams } from "react-router";

import {
  Button,
  TextField,
  Box,
  Switch,
  Typography,
  MenuItem,
  FormControlLabel,
  Paper,
  Alert,
} from "@mui/material";

// Tuodaan kantakäsittelijästä funktiot, joilla haetaan,
// lisätään ja päivitetään ajoneuvon tiedot tietokantaan.
import {
  getAjoneuvo,
  addAjoneuvo,
  updateAjoneuvo,
} from "../MUI/ajoneuvotKatsastukset";

function AjoneuvoLomakeMUI() {
  // Haetaan osoiteriviltä id-parametri.
  // Jos osoite on esimerkiksi /ajoneuvontiedot/3,
  // id saa arvon 3.
  const { id } = useParams();

  // Jos id löytyy, ollaan muokkaustilassa.
  // Jos id:tä ei ole, ollaan uuden ajoneuvon lisäystilassa.
  const muokkaustila = Boolean(id);

  // =========================
  // LOMAKKEEN TILAMUUTTUJAT
  // =========================

  // Jokaiselle lomakekentälle on oma state-muuttuja.
  // Näiden avulla kenttien arvoja voidaan lukea ja muuttaa.
  const [reknro, setReknro] = useState("");
  const [merkki, setMerkki] = useState("");
  const [malli, setMalli] = useState("");
  const [tyyppi, setTyyppi] = useState("");
  const [kayttoonottoPvm, setKayttoonottoPvm] = useState("");
  const [kaytossa, setKaytossa] = useState(false);

  // =========================
  // KÄYTTÄJÄLLE NÄYTETTÄVÄT VIESTIT
  // =========================

  // viesti sisältää käyttäjälle näytettävän tekstin.
  // onnistui määrittää, näytetäänkö viesti success- vai warning-tyylillä.
  // ladataan kertoo, onko haku tai tallennus parhaillaan käynnissä.
  const [viesti, setViesti] = useState("");
  const [onnistui, setOnnistui] = useState(false);
  const [ladataan, setLadataan] = useState(false);

  // Tarkistetaan rekisterinumeron muoto.
  // Sallittu muoto on esimerkiksi:
  // A-1, AB-12 tai ABC-123.
  const tarkistaRekNro = (arvo) => {
    const regex = /^[A-Z]{1,3}-[0-9]{1,3}$/;
    return regex.test(arvo);
  };

  // =========================
  // AJONEUVON HAKU MUOKKAUSTILASSA
  // =========================

  useEffect(() => {
    const haeAjoneuvo = async () => {
      // Jos ei olla muokkaustilassa, mitään vanhaa ajoneuvoa ei tarvitse hakea.
      if (!muokkaustila) {
        return;
      }

      try {
        // Näytetään latausviesti ja tyhjennetään mahdolliset vanhat viestit.
        setLadataan(true);
        setViesti("");
        setOnnistui(false);

        // Haetaan yksi ajoneuvo tietokannasta id:n perusteella.
        const response = await getAjoneuvo(id);

        // Jos haku onnistui, täytetään lomake tietokannasta saaduilla tiedoilla.
        if (response.status === 200) {
          const ajoneuvo = response.data;

          // ?? "" estää sen, ettei kenttään tule undefined-arvoa,
          // jos jokin tieto puuttuisi tietokannasta.
          setReknro(ajoneuvo.rekisterinumero ?? "");
          setMerkki(ajoneuvo.merkki ?? "");
          setMalli(ajoneuvo.malli ?? "");
          setTyyppi(ajoneuvo.tyyppi ?? "");
          setKayttoonottoPvm(ajoneuvo.kayttoonottoPvm ?? "");

          // SQLite tallentaa boolean-arvon usein numerona 0 tai 1.
          // Boolean(...) muuttaa sen Reactin Switchille sopivaksi true/false-arvoksi.
          setKaytossa(Boolean(ajoneuvo.kaytossa));
        } else {
          // Jos serveri palauttaa virheen, näytetään virheilmoitus käyttäjälle.
          setViesti(response.message || "Ajoneuvon haku ei onnistunut.");
          setOnnistui(false);
        }
      } catch (error) {
        // Tämä suoritetaan, jos esimerkiksi serveriin ei saada yhteyttä.
        setViesti("Ajoneuvon haku ei onnistunut: " + error.message);
        setOnnistui(false);
      } finally {
        // finally suoritetaan aina lopuksi, onnistui haku tai ei.
        setLadataan(false);
      }
    };

    haeAjoneuvo();

    // useEffect suoritetaan uudelleen, jos id tai muokkaustila muuttuu.
  }, [id, muokkaustila]);

  // =========================
  // LISÄYS TAI PÄIVITYS TIETOKANTAAN
  // =========================

  const lisaaTaiPaivitaTiedot = async () => {
    // Kentät, jotka käyttäjän on pakko täyttää ennen tallennusta.
    const pakollisetKentat = [
      reknro,
      merkki,
      malli,
      tyyppi,
      kayttoonottoPvm,
    ];

    // Tarkistetaan, onko jokin pakollinen kenttä tyhjä.
    // trim() poistaa alusta ja lopusta välilyönnit.
    const onTyhja = pakollisetKentat.some((k) => !k.trim());

    if (onTyhja) {
      setViesti(
        "Täytä vähintään ajoneuvon rekisterinumero, merkki, malli, tyyppi ja käyttöönottopäivämäärä.",
      );
      setOnnistui(false);
      return;
    }

    // Tarkistetaan rekisterinumeron muoto ennen tallennusta.
    if (!tarkistaRekNro(reknro)) {
      setViesti(
        "Rekisterinumero ei kelpaa. Käytä muotoa ABC-123, jossa 1-3 kirjainta, väliviiva ja 1-3 numeroa.",
      );
      setOnnistui(false);
      return;
    }

    // Muodostetaan olio, joka lähetetään backendille.
    // Kenttien nimet vastaavat serverin odottamia nimiä.
    const ajoneuvo = {
      rekisterinumero: reknro,
      merkki,
      malli,
      tyyppi,
      kayttoonottoPvm,

      // Switch antaa true/false-arvon.
      // Muutetaan se tietokantaa varten numeroksi 1 tai 0.
      kaytossa: kaytossa ? 1 : 0,
    };

    try {
      setLadataan(true);
      setViesti("");
      setOnnistui(false);

      let response;

      // Jos ollaan muokkaustilassa, kutsutaan PUT-reittiä.
      // Muuten kutsutaan POST-reittiä uuden ajoneuvon lisäämiseksi.
      if (muokkaustila) {
        response = await updateAjoneuvo(id, ajoneuvo);
      } else {
        response = await addAjoneuvo(ajoneuvo);
      }

      // Serveri palauttaa päivityksestä yleensä 200 ja lisäyksestä 201.
      if (response.status === 200 || response.status === 201) {
        setViesti(
          muokkaustila
            ? "Ajoneuvon tiedot päivitettiin."
            : "Ajoneuvon tiedot tallennettiin.",
        );
        setOnnistui(true);

        // Uuden ajoneuvon lisäyksen jälkeen lomake tyhjennetään.
        // Muokkaustilassa lomaketta ei tyhjennetä, koska käyttäjä muokkaa olemassa olevaa tietoa.
        if (!muokkaustila) {
          setReknro("");
          setMerkki("");
          setMalli("");
          setTyyppi("");
          setKayttoonottoPvm("");
          setKaytossa(false);
        }
      } else {
        // Jos serveri palauttaa jonkin muun statuskoodin, näytetään virheilmoitus.
        setViesti(response.message || "Tallennus epäonnistui.");
        setOnnistui(false);
      }
    } catch (error) {
      // Tämä suoritetaan esimerkiksi, jos palvelimeen ei saada yhteyttä.
      setViesti("Tallennus epäonnistui: " + error.message);
      setOnnistui(false);
    } finally {
      // Tallennuksen jälkeen lataustila poistetaan aina.
      setLadataan(false);
    }
  };

  // Tyhjentää lomakkeen kentät käsin.
  const tyhjennaTiedot = () => {
    setReknro("");
    setMerkki("");
    setMalli("");
    setTyyppi("");
    setKayttoonottoPvm("");
    setKaytossa(false);
    setViesti("");
    setOnnistui(false);
  };

  // Päivämääräkentän suurin sallittu arvo.
  // Tällä estetään tulevaisuuden päivämäärän valinta.
  const today = new Date().toISOString().split("T")[0];

  return (
    <Paper
      elevation={24}
      square={false}
      sx={{ width: 450, margin: "40px auto", p: 3 }}
    >
      {/* Otsikko vaihtuu sen mukaan, lisätäänkö uutta vai muokataanko olemassa olevaa ajoneuvoa. */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
        {muokkaustila ? "Muokkaa ajoneuvon tietoja" : "Lisää ajoneuvo"}
      </Typography>

      {/* Näytetään latausilmoitus, kun tietoa haetaan tai tallennetaan. */}
      {ladataan && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Ladataan...
        </Alert>
      )}

      {/* Rekisterinumero muutetaan automaattisesti isoiksi kirjaimiksi. */}
      <TextField
        label="Rekisterinumero"
        fullWidth
        value={reknro}
        onChange={(e) => {
          setReknro(e.target.value.toUpperCase());
          setViesti("");
          setOnnistui(false);
        }}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Merkki"
        fullWidth
        value={merkki}
        onChange={(e) => {
          setMerkki(e.target.value);
          setViesti("");
          setOnnistui(false);
        }}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Malli"
        fullWidth
        value={malli}
        onChange={(e) => {
          setMalli(e.target.value);
          setViesti("");
          setOnnistui(false);
        }}
        sx={{ mb: 2 }}
      />

      {/* select tekee TextFieldistä alasvetovalikon. */}
      <TextField
        select
        label="Tyyppi"
        fullWidth
        value={tyyppi}
        onChange={(e) => {
          setTyyppi(e.target.value);
          setViesti("");
          setOnnistui(false);
        }}
        sx={{ mb: 2 }}
      >
        <MenuItem value="">Valitse tyyppi</MenuItem>
        <MenuItem value="Henkilöauto">Henkilöauto</MenuItem>
        <MenuItem value="Pakettiauto">Pakettiauto</MenuItem>
      </TextField>

      {/* type="date" näyttää päivämäärävalitsimen. */}
      <TextField
        label="Käyttöönotto pvm"
        type="date"
        fullWidth
        value={kayttoonottoPvm}
        onChange={(e) => {
          setKayttoonottoPvm(e.target.value);
          setViesti("");
          setOnnistui(false);
        }}
        inputProps={{ max: today }}
        slotProps={{ inputLabel: { shrink: true } }}
        sx={{ mb: 2 }}
      />

      <Typography sx={{ mt: 1, mb: 1 }}>Liikennekäytössä</Typography>

      {/* Switch tallentaa true/false-arvon kaytossa-stateen. */}
      <FormControlLabel
        control={
          <Switch
            checked={kaytossa}
            onChange={(e) => {
              setKaytossa(e.target.checked);
              setViesti("");
              setOnnistui(false);
            }}
          />
        }
        label={kaytossa ? "Kyllä" : "Ei"}
        sx={{ mb: 2 }}
      />

      <Box display="flex" gap={2}>
        {/* Sama nappi joko lisää uuden ajoneuvon tai tallentaa muutokset. */}
        <Button
          variant="outlined"
          color="primary"
          onClick={lisaaTaiPaivitaTiedot}
          disabled={ladataan}
        >
          {muokkaustila ? "Tallenna muutokset" : "Lisää"}
        </Button>

        {/* Tyhjentää lomakkeen kentät. */}
        <Button
          variant="outlined"
          color="secondary"
          onClick={tyhjennaTiedot}
          disabled={ladataan}
        >
          Tyhjennä
        </Button>
      </Box>

      {/* Näytetään käyttäjälle onnistumis- tai virheilmoitus. */}
      {viesti && (
        <Alert severity={onnistui ? "success" : "warning"} sx={{ mt: 2 }}>
          {viesti}
        </Alert>
      )}
    </Paper>
  );
}

export default AjoneuvoLomakeMUI;