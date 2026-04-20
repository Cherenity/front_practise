import { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  MenuItem,
  Paper,
  Alert,
} from "@mui/material";

function KatsastusLomakeMUI({ ajoneuvot }) {
  const [ajoneuvoId, setAjoneuvoId] = useState("");
  const [katsastusPvm, setKatsastusPvm] = useState("");
  const [voimassaAsti, setVoimassaAsti] = useState("");
  const [tulos, setTulos] = useState("");
  const [kilometrit, setKilometrit] = useState("");
  const [huomiot, setHuomiot] = useState("");
  const [viesti, setViesti] = useState("");

  const pakollisetKentat = [
    ajoneuvoId,
    katsastusPvm,
    voimassaAsti,
    tulos,
    kilometrit,
  ];

  const lisaaTiedot = () => {
    const onTyhja = pakollisetKentat.some((k) => String(k).trim() === "");

    if (onTyhja) {
      setViesti(
        "Täytä vähintään ajoneuvo, katsastuspäivä, voimassa asti, tulos ja kilometrit."
      );
      return;
    }

    if (Number(kilometrit) < 0) {
      setViesti("Kilometrien pitää olla 0 tai enemmän.");
      return;
    }
  
    if (voimassaAsti < katsastusPvm) {
      setViesti("Voimassa asti -päivä ei voi olla ennen katsastuspäivää.");
      return;
    }

    const uusiKatsastus = {
      ajoneuvoId: Number(ajoneuvoId),
      katsastus_pvm: katsastusPvm,
      voimassa_asti: voimassaAsti,
      tulos,
      kilometrit: Number(kilometrit),
      huomiot,
    };

    console.log("Tallennettava katsastus:", uusiKatsastus);

    setViesti("Katsastuksen tiedot tallennettiin.");

    setAjoneuvoId("");
    setKatsastusPvm("");
    setVoimassaAsti("");
    setTulos("");
    setKilometrit("");
    setHuomiot("");
  };

  const tyhjennaTiedot = () => {
    setAjoneuvoId("");
    setKatsastusPvm("");
    setVoimassaAsti("");
    setTulos("");
    setKilometrit("");
    setHuomiot("");
    setViesti("");
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <Paper
      elevation={24}
      square={false}
      sx={{ width: 450, margin: "40px auto", p: 3 }}
    >
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
        Katsastuslomake
      </Typography>

      <TextField
        select
        label="Ajoneuvo"
        fullWidth
        value={ajoneuvoId}
        onChange={(e) => {
          setAjoneuvoId(e.target.value);
          setViesti("");
        }}
        sx={{ mb: 2 }}
      >
        <MenuItem value="">Valitse ajoneuvo</MenuItem>
        {ajoneuvot.map((a) => (
          <MenuItem key={a.id} value={a.id}>
            {a.rekisterinumero} - {a.merkki} {a.malli}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Katsastuspäivä"
        type="date"
        fullWidth
        value={katsastusPvm}
        onChange={(e) => {
          setKatsastusPvm(e.target.value);
          setViesti("");
        }}
        inputProps={{ max: today }}
        slotProps={{ inputLabel: { shrink: true } }}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Voimassa asti"
        type="date"
        fullWidth
        value={voimassaAsti}
        onChange={(e) => {
          setVoimassaAsti(e.target.value);
          setViesti("");
        }}
        slotProps={{ inputLabel: { shrink: true } }}
        sx={{ mb: 2 }}
      />

      <TextField
        select
        label="Tulos"
        fullWidth
        value={tulos}
        onChange={(e) => {
          setTulos(e.target.value);
          setViesti("");
        }}
        sx={{ mb: 2 }}
      >
        <MenuItem value="">Valitse tulos</MenuItem>
        <MenuItem value="Hyväksytty">Hyväksytty</MenuItem>
        <MenuItem value="Hylätty">Hylätty</MenuItem>
      </TextField>

      <TextField
        label="Kilometrit"
        type="number"
        fullWidth
        value={kilometrit}
        onChange={(e) => {
          setKilometrit(e.target.value);
          setViesti("");
        }}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Huomiot"
        fullWidth
        multiline
        rows={3}
        value={huomiot}
        onChange={(e) => {
          setHuomiot(e.target.value);
          setViesti("");
        }}
        sx={{ mb: 2 }}
      />

      <Box display="flex" gap={2}>
        <Button variant="outlined" color="primary" onClick={lisaaTiedot}>
          Lisää
        </Button>

        <Button variant="outlined" color="secondary" onClick={tyhjennaTiedot}>
          Tyhjennä
        </Button>
      </Box>

      {viesti && (
        <Alert
          severity={
            viesti === "Katsastuksen tiedot tallennettiin."
              ? "success"
              : "warning"
          }
          sx={{ mt: 2 }}
        >
          {viesti}
        </Alert>
      )}
    </Paper>
  );
}

export default KatsastusLomakeMUI;