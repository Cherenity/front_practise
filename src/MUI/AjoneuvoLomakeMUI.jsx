import { useState } from "react";
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

function AjoneuvoLomakeMUI() {
  const { id } = useParams();
  const muokkaustila = Boolean(id);

  // Lomakkeen tiedot
  const [reknro, setReknro] = useState("");
  const [merkki, setMerkki] = useState("");
  const [malli, setMalli] = useState("");
  const [tyyppi, setTyyppi] = useState("");
  const [kayttoonottoPvm, setKayttoonottoPvm] = useState("");
  const [kaytossa, setKaytossa] = useState(false);

  // Viestintä käyttäjälle
  const [viesti, setViesti] = useState("");

  const tarkistaRekNro = (arvo) => {
    // Rekisterinumeron tarkistus: 1-3 kirjainta, väliviiva, 1-3 numeroa
    const regex = /^[A-Z]{1,3}-[0-9]{1,3}$/;
    return regex.test(arvo);
  };

  const pakollisetKentat = [reknro, merkki, malli, tyyppi, kayttoonottoPvm];

  const lisaaTaiPaivitaTiedot = () => {
    const onTyhja = pakollisetKentat.some((k) => !k.trim());

    if (onTyhja) {
      setViesti(
        "Täytä vähintään ajoneuvon rekisterinumero, merkki, malli, tyyppi ja käyttöönottopäivämäärä.",
      );
      return;
    }

    if (!tarkistaRekNro(reknro)) {
      setViesti(
        "Rekisterinumero ei kelpaa. Käytä muotoa ABC-123, jossa 1-3 kirjainta, väliviiva ja 1-3 numeroa.",
      );
      return;
    }

    if (muokkaustila) {
      // Päivitetään olemassa olevan ajoneuvon tiedot
      setViesti("Ajoneuvon tiedot päivitettiin.");
    } else {
      // Lisätään uusi ajoneuvo
      setViesti("Ajoneuvon tiedot tallennettiin.");
    }

    setReknro("");
    setMerkki("");
    setMalli("");
    setTyyppi("");
    setKayttoonottoPvm("");
    setKaytossa(false);
  };

  const tyhjennaTiedot = () => {
    setReknro("");
    setMerkki("");
    setMalli("");
    setTyyppi("");
    setKayttoonottoPvm("");
    setKaytossa(false);
    setViesti("");
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    // elavation 0 = ei varjoa, 24 = syvin varjo, square = false => pyöristetyt kulmat
    <Paper
      elevation={24}
      square={false}
      sx={{ width: 450, margin: "40px auto", p: 3 }}
    >
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
        {muokkaustila ? "Muokkaa ajoneuvon tietoja" : "Lisää ajoneuvo"}
      </Typography>

      <TextField
        label="Rekisterinumero"
        fullWidth
        value={reknro}
        onChange={(e) => {
          setReknro(e.target.value.toUpperCase());
          setViesti("");
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
        }}
        sx={{ mb: 2 }}
      />

      <TextField
        select
        label="Tyyppi"
        fullWidth
        value={tyyppi}
        onChange={(e) => {
          setTyyppi(e.target.value);
          setViesti("");
        }}
        sx={{ mb: 2 }}
      >
        <MenuItem value="">Valitse tyyppi</MenuItem>
        <MenuItem value="Henkilöauto">Henkilöauto</MenuItem>
        <MenuItem value="Pakettiauto">Pakettiauto</MenuItem>
      </TextField>

      <TextField
        label="Käyttöönotto pvm"
        type="date"
        fullWidth
        value={kayttoonottoPvm}
        onChange={(e) => {
          setKayttoonottoPvm(e.target.value);
          setViesti("");
        }}
        // max arvo on tänään, ehkä hieman kankea pitää miettiä vielä (ei voi laittaa tulevaisuuteen päivää)
        inputProps={{ max: today }}
        slotProps={{ inputLabel: { shrink: true } }}
        sx={{ mb: 2 }}
      />

      {/* mt = marigin top, mb = margin bottom yms. */}
      <Typography sx={{ mt: 1, mb: 1 }}>Liikennekäytössä</Typography>

      <FormControlLabel
        control={
          <Switch
            checked={kaytossa}
            onChange={(e) => {
              setKaytossa(e.target.checked);
              setViesti("");
            }}
          />
        }
        label={kaytossa ? "Kyllä" : "Ei"}
        sx={{ mb: 2 }}
      />

      <Box display="flex" gap={2}>
        <Button
          variant="outlined"
          color="primary"
          onClick={lisaaTaiPaivitaTiedot}
        >
          {muokkaustila ? "Tallenna muutokset" : "Lisää"}
        </Button>

        <Button variant="outlined" color="secondary" onClick={tyhjennaTiedot}>
          Tyhjennä
        </Button>
      </Box>

      {viesti && (
        <Alert
          severity={
            viesti === "Ajoneuvon tiedot tallennettiin." ? "success" : "warning"
          }
          sx={{ mt: 2 }}
        >
          {viesti}
        </Alert>
      )}
    </Paper>
  );
}

export default AjoneuvoLomakeMUI;
