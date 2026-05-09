import { useEffect, useState } from "react";
import axios from "axios";

import {
  Grid,
  TextField,
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Button,
  Alert,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import { Link } from "react-router";

function KatsastuksetMUI() {
  const [katsastukset, setKatsastukset] = useState([]);
  const [ajoneuvot, setAjoneuvot] = useState([]);

  const [hakusana, setHakusana] = useState("");
  const [muokattava, setMuokattava] = useState(null);
  const [viesti, setViesti] = useState("");

  const url = "http://localhost:8080";

  // =========================
  // HAE TIEDOT TIETOKANNASTA
  // =========================

  const haeKatsastukset = async () => {
    try {
      const response = await axios.get(`${url}/katsastus/all`);
      setKatsastukset(response.data);
    } catch (error) {
      console.error("Katsastusten haku epäonnistui:", error);
      setViesti("Katsastusten haku epäonnistui.");
    }
  };

  const haeAjoneuvot = async () => {
    try {
      const response = await axios.get(`${url}/ajoneuvo/all`);
      setAjoneuvot(response.data);
    } catch (error) {
      console.error("Ajoneuvojen haku epäonnistui:", error);
      setViesti("Ajoneuvojen haku epäonnistui.");
    }
  };

  useEffect(() => {
    haeKatsastukset();
    haeAjoneuvot();
  }, []);

  // =========================
  // MUOKKAA KATSASTUSTA
  // =========================

const tallennaMuokkaus = async () => {
  try {
    // Varmistetaan, että ajoneuvoId on olemassa
    if (!muokattava.ajoneuvoId) {
      console.error("ajoneuvoId puuttuu muokattavasta!");
      setViesti("Virhe: ajoneuvoId puuttuu.");
      return;
    }

    const paivitettava = {
      ajoneuvoId: Number(muokattava.ajoneuvoId),
      katsastus_pvm: muokattava.katsastus_pvm,
      voimassa_asti: muokattava.voimassa_asti,
      tulos: muokattava.tulos,
      kilometrit: Number(muokattava.kilometrit),
      huomiot: muokattava.huomiot ?? "",
    };

    console.log("Lähetetään PUT-data:", paivitettava);

    const response = await axios.put(
      `${url}/katsastus/update/${muokattava.id}`,
      paivitettava
    );

    if (response.data.count > 0) {
      setViesti("Katsastus päivitettiin.");
      setMuokattava(null);
      haeKatsastukset();
    } else {
      setViesti("Katsastusta ei päivitetty.");
    }
  } catch (error) {
    console.error("Muokkaus epäonnistui:", error);
    setViesti("Katsastuksen muokkaus epäonnistui.");
  }
};


  // =========================
  // POISTA KATSASTUS
  // =========================

  const poistaKatsastus = async () => {
    try {
      const response = await axios.delete(
        `${url}/katsastus/delete/${muokattava.id}`
      );

      if (response.data.count > 0) {
        setViesti("Katsastus poistettiin.");
        setMuokattava(null);
        haeKatsastukset();
      } else {
        setViesti("Katsastusta ei poistettu.");
      }
    } catch (error) {
      console.error("Poisto epäonnistui:", error);
      setViesti("Katsastuksen poisto epäonnistui.");
    }
  };

  const haku = hakusana.toLowerCase();

  const format = (pvm) =>
    pvm ? new Date(pvm).toLocaleDateString("fi-FI") : "-";

  // =========================
  // SUODATUS REKISTERINUMEROLLA
  // =========================

  const naytettavatKatsastukset = katsastukset.filter((k) => {
    const ajoneuvo = ajoneuvot.find((a) => a.id === k.ajoneuvoId);
    const rek = ajoneuvo?.rekisterinumero?.toLowerCase() ?? "";
    return rek.includes(haku);
  });

  return (
    <Box sx={{ display: "flex", gap: 3, p: 2 }}>
      {/* VASEN PUOLI: KORTIT */}
      <Box sx={{ flex: 2 }}>
        <Typography variant="h4">Katsastukset</Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Katsastustiedot ja niiden muokkaus
        </Typography>

        {viesti && (
          <Alert severity="info" sx={{ mb: 2 }}>
            {viesti}
          </Alert>
        )}

        <TextField
          label="Hae rekisterinumerolla"
          fullWidth
          value={hakusana}
          onChange={(e) => setHakusana(e.target.value)}
          sx={{
            mb: 3,
            width: "30%",
            backgroundColor: "white",
            borderRadius: 1,
          }}
        />

        <IconButton color="primary" component={Link} to="/katsastuslomake">
          <AddIcon fontSize="large" sx={{ mb: 2 }} />
        </IconButton>

        <Grid container spacing={3}>
          {naytettavatKatsastukset.map((k) => {
            const ajoneuvo = ajoneuvot.find((a) => a.id === k.ajoneuvoId);

            return (
              <Grid key={k.id}>
                <Card sx={{ p: 1 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {ajoneuvo?.rekisterinumero ?? "Tuntematon ajoneuvo"}
                    </Typography>

                    <Typography variant="body2">
                      <strong>Päivä:</strong> {format(k.katsastus_pvm)}
                    </Typography>

                    <Typography variant="body2">
                      <strong>Voimassa asti:</strong>{" "}
                      {format(k.voimassa_asti)}
                    </Typography>

                    <Typography variant="body2">
                      <strong>Tulos:</strong> {k.tulos}
                    </Typography>

                    <Typography variant="body2">
                      <strong>Kilometrit:</strong> {k.kilometrit}
                    </Typography>

                    <Typography variant="body2">
                      <strong>Huomiot:</strong> {k.huomiot || "-"}
                    </Typography>
                  </CardContent>

                  <CardActions sx={{ justifyContent: "flex-end" }}>
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setMuokattava(k);
                        setViesti("");
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* OIKEA PUOLI: MUOKKAUSLOMAKE */}
      <Box sx={{ flex: 1 }}>
        {muokattava ? (
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Muokkaa katsastusta
            </Typography>

            <TextField
              label="Katsastuspäivä"
              type="date"
              fullWidth
              sx={{ mb: 2 }}
              value={muokattava.katsastus_pvm}
              onChange={(e) =>
                setMuokattava({
                  ...muokattava,
                  katsastus_pvm: e.target.value,
                })
              }
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />

            <TextField
              label="Voimassa asti"
              type="date"
              fullWidth
              sx={{ mb: 2 }}
              value={muokattava.voimassa_asti}
              onChange={(e) =>
                setMuokattava({
                  ...muokattava,
                  voimassa_asti: e.target.value,
                })
              }
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />

            <TextField
              label="Tulos"
              fullWidth
              sx={{ mb: 2 }}
              value={muokattava.tulos}
              onChange={(e) =>
                setMuokattava({
                  ...muokattava,
                  tulos: e.target.value,
                })
              }
            />

            <TextField
              label="Kilometrit"
              type="number"
              fullWidth
              sx={{ mb: 2 }}
              value={muokattava.kilometrit}
              onChange={(e) =>
                setMuokattava({
                  ...muokattava,
                  kilometrit: e.target.value,
                })
              }
            />

            <TextField
              label="Huomiot"
              fullWidth
              multiline
              rows={3}
              sx={{ mb: 2 }}
              value={muokattava.huomiot || ""}
              onChange={(e) =>
                setMuokattava({
                  ...muokattava,
                  huomiot: e.target.value,
                })
              }
            />

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={tallennaMuokkaus}
              >
                Tallenna
              </Button>

              <Button
                variant="outlined"
                color="error"
                onClick={() => setMuokattava(null)}
              >
                Peruuta
              </Button>

              <Button
                variant="contained"
                color="error"
                onClick={poistaKatsastus}
                startIcon={<DeleteIcon />}
              >
                Poista
              </Button>
            </Box>
          </Card>
        ) : (
          <Typography sx={{ opacity: 0.6 }}>
            Valitse katsastus muokattavaksi
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default KatsastuksetMUI;