import { useState, useEffect } from "react";

import {
  Button,
  TextField,
  Box,
  Typography,
  MenuItem,
  Paper,
  Alert,
} from "@mui/material";

// kantakäsittelijä
import { addKatsastus, getAjoneuvot } from "../MUI/ajoneuvotKatsastukset";

function KatsastusLomakeMUI() {

  // state-muuttujat lomakedatalle

  const [ajoneuvoId, setAjoneuvoId] = useState("");
  const [katsastusPvm, setKatsastusPvm] = useState("");
  const [voimassaAsti, setVoimassaAsti] = useState("");
  const [tulos, setTulos] = useState("");
  const [kilometrit, setKilometrit] = useState("");
  const [huomiot, setHuomiot] = useState("");
  const [viesti, setViesti] = useState("");

  // state-ajoneuvot haettavalle ajoneuvolistalle, joka näytetään lomakkeen dropdown-valikossa
  const [ajoneuvot, setAjoneuvot] = useState([]);

  // Haetaan ajoneuvot lomakkeen alussa
  useEffect(() => {
    const haeAjoneuvot = async () => {
      try {
        const response = await getAjoneuvot();
        setAjoneuvot(response.data);
      } catch (error) {
        console.error("Ajoneuvojen haku epäonnistui:", error);
      }
    };

    haeAjoneuvot();
  }, []);


  const pakollisetKentat = [
    ajoneuvoId,
    katsastusPvm,
    voimassaAsti,
    tulos,
    kilometrit,
  ];


  
  const lisaaTiedot = async () => {

    // Tarkistetaan että pakolliset kentät on täytetty
    const onTyhja = pakollisetKentat.some(
      (k) => String(k).trim() === ""
    );

    // Jos kenttiä puuttuu
    if (onTyhja) {

      setViesti(
        "Täytä vähintään ajoneuvo, katsastuspäivä, voimassa asti, tulos ja kilometrit."
      );

      return;
    }

    // Tarkistetaan että kilometrit eivät ole negatiiviset
    if (Number(kilometrit) < 0) {

      setViesti(
        "Kilometrien pitää olla 0 tai enemmän."
      );

      return;
    }

    // Tarkistetaan että voimassa asti ei ole ennen katsastuspäivää
    if (voimassaAsti < katsastusPvm) {

      setViesti(
        "Voimassa asti -päivä ei voi olla ennen katsastuspäivää."
      );

      return;
    }

    // Rakennetaan backendille lähetettävä objekti
    const uusiKatsastus = {

      // Muutetaan numerot Number()-funktiolla
      ajoneuvoId: Number(ajoneuvoId),

      // Päivämäärät
      katsastus_pvm: katsastusPvm,
      voimassa_asti: voimassaAsti,

      // Katsastuksen tulos
      tulos: tulos,

      // Kilometrit numeroksi
      kilometrit: Number(kilometrit),

      // Huomiot
      huomiot: huomiot,
    };

    // Lähetetään tiedot backendille
    const response = await addKatsastus(
      uusiKatsastus
    );

    // Jos tallennus onnistui
    if (response.data) {

      setViesti(
        "Katsastuksen tiedot tallennettiin."
      );

      // Tyhjennetään lomake
      setAjoneuvoId("");
      setKatsastusPvm("");
      setVoimassaAsti("");
      setTulos("");
      setKilometrit("");
      setHuomiot("");

    } else {

      // Näytetään virheviesti
      setViesti(response.message);
    }
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



  const today =
    new Date().toISOString().split("T")[0];



  return (

    <Paper
      elevation={24}
      square={false}
      sx={{
        width: 450,
        margin: "40px auto",
        p: 3
      }}
    >

      {/* Otsikko */}
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          fontWeight: "bold"
        }}
      >
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

                slotProps={{
          inputLabel: {
            htmlFor: "ajoneuvo",
          },
          select: {
            inputProps: {
              id: "ajoneuvo",
              name: "ajoneuvo",
            },
          },
        }}

        sx={{ mb: 2 }}
      >

        <MenuItem value="">
          Valitse ajoneuvo
        </MenuItem>

        {ajoneuvot.map((a) => (

          <MenuItem
            key={a.id}
            value={a.id}
          >
            {a.rekisterinumero}
            {" - "}
            {a.merkki}
            {" "}
            {a.malli}
          </MenuItem>
        ))}
      </TextField>


      {/* KATSASTUSPÄIVÄ */}
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

        slotProps={{
          inputLabel: {
            shrink: true
          }
        }}

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

        slotProps={{
          inputLabel: {
            shrink: true
          }
        }}

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
                slotProps={{
          inputLabel: {
            htmlFor: "tulos",
          },
          select: {
            inputProps: {
              id: "tulos",
              name: "tulos",
            },
          },
        }}
        

        sx={{ mb: 2 }}
      >

        <MenuItem value="">
          Valitse tulos
        </MenuItem>

        <MenuItem value="Hyväksytty">
          Hyväksytty
        </MenuItem>

        <MenuItem value="Hylätty">
          Hylätty
        </MenuItem>

      </TextField>


      {/* KILOMETRIT */}
      <TextField
        label="Kilometrit"
        name="kilometrit"
        id="kilometrit"
        type="number"
        fullWidth
        value={kilometrit}

        onChange={(e) => {
          setKilometrit(e.target.value);
          setViesti("");
        }}

        sx={{ mb: 2 }}
      />


      {/* HUOMIOT */}
      <TextField
        label="Huomiot"
        name="huomiot"
        id="huomiot"
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


      {/* PAINIKKEET */}
      <Box display="flex" gap={2}>

        {/* Lisää */}
        <Button
          variant="outlined"
          color="primary"
          onClick={lisaaTiedot}
        >
          Lisää
        </Button>

        {/* Tyhjennä */}
        <Button
          variant="outlined"
          color="secondary"
          onClick={tyhjennaTiedot}
        >
          Tyhjennä
        </Button>

      </Box>


      {/* VIESTI */}
      {viesti && (

        <Alert
          severity={
            viesti ===
            "Katsastuksen tiedot tallennettiin."
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