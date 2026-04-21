import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Typography,
  Stack,
  Paper,
  TextField,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";

import { Link } from "react-router";

function AjoneuvotMUI({ ajoneuvot, katsastukset }) {
  const [valittuId, setValittuId] = useState(null);
  const [hakusana, setHakusana] = useState("");
  const [suodatin, setSuodatin] = useState("kaikki");

  const haku = hakusana.toLowerCase();

  // Suodatetaan ajoneuvot haun ja tyypin perusteella
  const suodatetutAjoneuvot = ajoneuvot.filter((a) => {
    const tekstit = [a.rekisterinumero, a.merkki, a.malli].map((x) =>
      (x ?? "").toLowerCase(),
    );

    const tyyppi = (a.tyyppi ?? "").toLowerCase();

    const osuuHakuun = tekstit.some((t) => t.includes(haku));
    const osuuTyyppiin = suodatin === "kaikki" || suodatin === tyyppi;

    return osuuHakuun && osuuTyyppiin;
  });

  // Jos valittu ajoneuvo ei enää ole suodatetussa listassa, poistetaan valinta
  useEffect(() => {
    if (!suodatetutAjoneuvot.some((a) => a.id === valittuId)) {
      setValittuId(null);
    }
  }, [suodatetutAjoneuvot, valittuId]);

  // Klikkaus valitsee ajoneuvon, toinen klikkaus poistaa valinnan
  const handleValinta = (id) => {
    setValittuId(valittuId === id ? null : id);
  };

  // Haetaan valittu ajoneuvo talteen
  const valittuAjoneuvo = ajoneuvot.find((a) => a.id === valittuId);

  // Haetaan valitun ajoneuvon katsastukset
  const valitunKatsastukset = katsastukset.filter(
    (k) => k.ajoneuvoId === valittuId,
  );

  return (
    <Box sx={{ display: "flex", gap: 2, p: 2 }}>
      {/* VASEN */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Ajoneuvot
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <TextField
            label="Hae ajoneuvoa"
            fullWidth
            value={hakusana}
            onChange={(e) => setHakusana(e.target.value)}
            sx={{
              mb: 2,
              width: "50%",
              backgroundColor: "white",
              borderRadius: 1,
            }}
          />
          <IconButton color="primary" component={Link} to="/ajoneuvolomake">
            <AddIcon fontSize="large" sx={{ mb: 2 }} />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <Button
            variant={suodatin === "kaikki" ? "contained" : "outlined"}
            onClick={() => setSuodatin("kaikki")}
          >
            Kaikki
          </Button>

          <Button
            variant={suodatin === "henkilöauto" ? "contained" : "outlined"}
            onClick={() => setSuodatin("henkilöauto")}
          >
            Henkilöautot
          </Button>

          <Button
            variant={suodatin === "pakettiauto" ? "contained" : "outlined"}
            onClick={() => setSuodatin("pakettiauto")}
          >
            Pakettiautot
          </Button>
        </Box>

        <Stack spacing={2}>
          {suodatetutAjoneuvot.map((a) => (
            <Paper
              key={a.id}
              onClick={() => handleValinta(a.id)}
              sx={{
                p: 2,
                cursor: "pointer",
                backgroundColor:
                  a.id === valittuId ? "primary.light" : "background.paper",
                border: a.id === valittuId ? 2 : 1,
                borderColor: a.id === valittuId ? "primary.main" : "divider",
                transition: "all 0.2s ease",
              }}
            >
              <Card elevation={0}>
                <CardContent>
                  <Typography fontWeight="bold">{a.rekisterinumero}</Typography>

                  <Typography variant="body2" color="text.secondary">
                    {a.merkki} {a.malli}
                  </Typography>
                </CardContent>

                {valittuId === a.id && (
                  <CardActions>
                    <Button
                      size="small"
                      variant="outlined"
                      component={Link}
                      to={`/ajoneuvontiedot/${a.id}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Muokkaa
                    </Button>

                  </CardActions>
                )}
              </Card>
            </Paper>
          ))}
        </Stack>
      </Box>

      {/* OIKEA */}
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Typography variant="h4" sx={{ mb: 1 }}>
            Katsastukset
          </Typography>

          <IconButton color="primary" component={Link} to="/katsastuslomake">
            <AddIcon fontSize="large" />
          </IconButton>
        </Box>

        {!valittuAjoneuvo ? (
          <Paper sx={{ p: 2 }}>
            <Typography>Valitse ajoneuvo</Typography>
          </Paper>
        ) : (
          <>
            {/* Valitun ajoneuvon tiedot */}
            <Paper
              sx={{ p: 2, mb: 2, border: 2, borderColor: "primary.light" }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                Valittu ajoneuvo
              </Typography>

              <Typography>{valittuAjoneuvo.rekisterinumero}</Typography>

              <Typography variant="body2" color="text.secondary">
                {valittuAjoneuvo.merkki} {valittuAjoneuvo.malli}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Tyyppi: {valittuAjoneuvo.tyyppi}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Käyttöönottopäivä:{" "}
                {valittuAjoneuvo.kayttoonottoPvm
                  ? new Date(
                      valittuAjoneuvo.kayttoonottoPvm,
                    ).toLocaleDateString("fi-FI")
                  : "-"}{" "}
                {/* jos päivämäärä on null tai undefined, näytetään viivanen.
                Näin ei pitäisi olla, sillä lomakkeella vaaditaan päivämäärä,
                mutta varmuuden vuoksi. */}
              </Typography>
            </Paper>

            {/* Katsastukset */}
            {valitunKatsastukset.length === 0 ? (
              <Paper sx={{ p: 2 }}>
                <Typography>Ei katsastuksia</Typography>
              </Paper>
            ) : (
              <Stack spacing={2}>
                {valitunKatsastukset.map((k) => (
                  <Paper key={k.id} sx={{ p: 2 }}>
                    <Typography variant="body2" sx={{ mb: 0 }}>
                      {"Katsastuspäivä: "}
                      {k.katsastus_pvm
                        ? new Date(k.katsastus_pvm).toLocaleDateString("fi-FI")
                        : "-"}
                    </Typography>

                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {"Voimassa asti: "}

                      {k.voimassa_asti
                        ? new Date(k.voimassa_asti).toLocaleDateString("fi-FI")
                        : "-"}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color:
                          k.tulos === "Hyväksytty"
                            ? "success.main"
                            : "error.main",
                        fontWeight: "bold",
                      }}
                    >
                      {k.tulos}
                    </Typography>
                    <Typography variant="body2">
                      Kilometrit: {k.kilometrit}
                    </Typography>

                    <Typography variant="body2">
                      Huomiot: {k.huomiot}
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}

export default AjoneuvotMUI;
