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
  Switch,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import DriveEtaIcon from "@mui/icons-material/DriveEta";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import { Link } from "react-router";

// kantakäsittelin funktiot ajoneuvojen ja katsastusten hakemiseen
import { getAjoneuvot, getKatsastukset } from "../MUI/ajoneuvotKatsastukset";

function AjoneuvotMUI() {
  // tallennetaan ajoneuvot ja katsastukset stateen
  const [ajoneuvot, setAjoneuvot] = useState([]);
  const [katsastukset, setKatsastukset] = useState([]);

  // tallennetaan valittu ajoneuvo, hakusana ja aktiivinen suodatin
  const [valittuId, setValittuId] = useState(null);
  const [hakusana, setHakusana] = useState("");
  const [suodatin, setSuodatin] = useState("kaikki");
  const [kaytossa, setKaytossa] = useState(false);

  // tallennetaan mahdollinen virhe ja lataustila
  const [virhe, setVirhe] = useState("");
  const [ladataan, setLadataan] = useState(true);

  // haetaan ajoneuvot ja katsastukset, kun komponentti avataan
  useEffect(() => {
    const haeTiedot = async () => {
      try {
        // aloitetaan lataus ja tyhjennetään vanha virhe
        setLadataan(true);
        setVirhe("");

        // haetaan ajoneuvot ja katsastukset palvelusta
        const ajoneuvoResponse = await getAjoneuvot();
        const katsastusResponse = await getKatsastukset();

        // tallennetaan ajoneuvot, jos haku onnistuu
        if (ajoneuvoResponse.status === 200) {
          setAjoneuvot(ajoneuvoResponse.data);
        } else {
          setVirhe(ajoneuvoResponse.message || "Ajoneuvojen haku epäonnistui");
        }

        // tallennetaan katsastukset, jos haku onnistuu
        if (katsastusResponse.status === 200) {
          setKatsastukset(katsastusResponse.data);
        } else {
          setVirhe(
            katsastusResponse.message || "Katsastusten haku epäonnistui",
          );
        }
      } catch (error) {
        // näytetään virhe, jos tietojen haku epäonnistuu
        setVirhe("Tietojen haku epäonnistui: " + error.message);
      } finally {
        // lopetetaan lataus aina haun jälkeen
        setLadataan(false);
      }
    };

    haeTiedot();
  }, []);

  // muutetaan hakusana pieniksi kirjaimiksi hakua varten
  const haku = hakusana.toLowerCase();

  // suodatetaan ajoneuvot hakusanan, tyypin ja käyttötilan perusteella
  const suodatetutAjoneuvot = ajoneuvot.filter((a) => {
    // muutetaan hakukentät pieniksi kirjaimiksi ja korvataan tyhjät arvot tyhjällä merkkijonolla
    const tekstit = [a.rekisterinumero, a.merkki, a.malli].map((x) =>
      (x ?? "").toLowerCase(),
    );

    // muutetaan tyyppi pieniksi kirjaimiksi ja korvataan tyhjä arvo
    const tyyppi = (a.tyyppi ?? "").toLowerCase();

    // käy taulukon arvoja läpi ja tarkistaa, täyttääkö edes yksi arvo annetun ehdon
    const osuuHakuun = tekstit.some((t) => t.includes(haku));

    // tarkistetaan täsmääkö ajoneuvon tyyppi valittuun suodattimeen
    const osuuTyyppiin = suodatin === "kaikki" || suodatin === tyyppi;

    // muutetaan tietokannan 0 tai 1 boolean-tyyppiseksi tarkistukseksi
    const ajoneuvoKaytossa = Number(a.kaytossa) === 1;

    // jos switch on pois päältä, näytetään käytössä olevat
    // jos switch on päällä, näytetään ei käytössä olevat
    const osuuKaytossaSuodattimeen = kaytossa
      ? !ajoneuvoKaytossa
      : ajoneuvoKaytossa;

    // palautetaan vain ajoneuvot, jotka täsmäävät hakuun, tyyppiin ja käyttötilaan
    return osuuHakuun && osuuTyyppiin && osuuKaytossaSuodattimeen;
  });

  // tyhjennetään valinta, jos valittu ajoneuvo ei enää näy suodatetuissa tuloksissa
  useEffect(() => {
    if (!suodatetutAjoneuvot.some((a) => a.id === valittuId)) {
      setValittuId(null);
    }
  }, [suodatetutAjoneuvot, valittuId]);

  // valitaan ajoneuvo tai poistetaan valinta, jos samaa klikataan uudelleen
  const handleValinta = (id) => {
    setValittuId(valittuId === id ? null : id);
  };

  // etsitään valitun ajoneuvon tiedot id:n perusteella
  const valittuAjoneuvo = ajoneuvot.find((a) => a.id === valittuId);

  // haetaan valitulle ajoneuvolle kuuluvat katsastukset
  const valitunKatsastukset = katsastukset.filter(
    (k) => Number(k.ajoneuvoId) === Number(valittuId),
  );

  // näytetään latausteksti, kun tietoja haetaan
  if (ladataan) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography>Ladataan ajoneuvoja...</Typography>
      </Box>
    );
  }

  // näytetään virheilmoitus, jos tietojen haussa tapahtuu virhe
  if (virhe) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="error">{virhe}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", gap: 2, p: 2 }}>
      {/* vasen puoli, jossa näytetään ajoneuvolista */}
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <DriveEtaIcon sx={{ fontSize: 40, color: "primary.main" }} />
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Ajoneuvot
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Ajoneuvot ja niiden katsastukset
        </Typography>

        {/* hakukenttä ja uuden ajoneuvon lisäyspainike */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <TextField
            label="Hae rekisterinumerolla, merkillä tai mallilla"
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

          {/* uusi ajoneuvo -painike, joka vie ajoneuvolomakkeelle */}
          <IconButton color="primary" component={Link} to="/ajoneuvolomake">
            <AddIcon fontSize="large" sx={{ mb: 2 }} />
          </IconButton>
        </Box>

        {/* ajoneuvotyypin suodatinpainikkeet */}
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

          <Box display="flex" alignItems="center" gap={1}>
            <Switch
              checked={kaytossa}
              onChange={(e) => setKaytossa(e.target.checked)}
            />
            <Typography>{kaytossa ? "Ei käytössä" : "Käytössä"}</Typography>
          </Box>
        </Box>

        {/* näytetään suodatetut ajoneuvot listana */}
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
              {/* elevation poistaa Card-komponentin varjostuksen */}
              <Card elevation={0}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      {/* näytetään ajoneuvon rekisterinumero */}
                      <Typography fontWeight="bold">
                        {a.rekisterinumero}
                      </Typography>

                      {/* näytetään ajoneuvon merkki ja malli */}
                      <Typography variant="body2" color="text.secondary">
                        {a.merkki} {a.malli}
                      </Typography>
                    </Box>

                    {Number(a.kaytossa) === 1 ? (
                      <CheckCircleIcon
                        sx={{ color: "success.main", fontSize: 32 }}
                      />
                    ) : (
                      <CancelIcon sx={{ color: "error.main", fontSize: 32 }} />
                    )}
                  </Box>
                </CardContent>

                {/* näytetään muokkauspainike vain valitulle ajoneuvolle */}
                {valittuId === a.id && (
                  <CardActions>
                    <Button
                      size="small"
                      variant="outlined"
                      component={Link}
                      to={`/ajoneuvontiedot/${a.id}`}
                      // estetään tapahtuman leviäminen, jotta kortti ei valitse uudestaan klikattaessa muokkauspainiketta
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

      {/* oikea puoli, jossa näytetään valitun ajoneuvon tiedot */}
      <Box sx={{ flex: 1 }}>
        {!valittuAjoneuvo ? (
          // näytetään ohjeteksti, jos ajoneuvoa ei ole valittu
          <Paper sx={{ p: 2 }}>
            <Typography>Valitse ajoneuvo</Typography>
          </Paper>
        ) : (
          <>
            {/* valitun ajoneuvon perustiedot */}
            <Paper
              sx={{
                p: 2,
                mb: 2,
                border: 2,
                borderColor: "primary.light",
                backgroundColor: "primary.light",
              }}
            >
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color="primary.contrastText"
              >
                Valittu ajoneuvo
              </Typography>

              <Typography color="primary.contrastText">
                {valittuAjoneuvo.rekisterinumero}
              </Typography>

              <Typography variant="body2" color="secondary.contrastText">
                {valittuAjoneuvo.merkki}{" "}
                {valittuAjoneuvo.malli}
              </Typography>

              <Typography variant="body2" color="secondary.contrastText">
                Tyyppi: {valittuAjoneuvo.tyyppi}
              </Typography>

              <Typography variant="body2" color="secondary.contrastText">
                Käyttöönottopäivä:{" "}
                {valittuAjoneuvo.kayttoonottoPvm
                  ? new Date(
                      valittuAjoneuvo.kayttoonottoPvm,
                    ).toLocaleDateString("fi-FI")
                  : "-"}
              </Typography>
            </Paper>

            {/* näytetään ilmoitus, jos valitulla ajoneuvolla ei ole katsastuksia */}
            {valitunKatsastukset.length === 0 ? (
              <Paper sx={{ p: 2 }}>
                <Typography>Ei katsastuksia</Typography>
              </Paper>
            ) : (
              // näytetään valitun ajoneuvon katsastukset
              <Stack spacing={2}>
                {valitunKatsastukset.map((k) => (
                  <Paper key={k.id} sx={{ p: 2 }}>
                    {/* näytetään katsastuspäivä */}
                    <Typography variant="body2" sx={{ mb: 0 }}>
                      Katsastuspäivä:{" "}
                      {k.katsastus_pvm
                        ? new Date(k.katsastus_pvm).toLocaleDateString("fi-FI")
                        : "-"}
                    </Typography>

                    {/* näytetään katsastuksen voimassaolopäivä */}
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Voimassa asti:{" "}
                      {k.voimassa_asti
                        ? new Date(k.voimassa_asti).toLocaleDateString("fi-FI")
                        : "-"}
                    </Typography>

                    {/* näytetään katsastuksen tulos eri värillä tuloksen mukaan */}
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

                    {/* näytetään ajokilometrit */}
                    <Typography variant="body2">
                      Kilometrit: {k.kilometrit}
                    </Typography>

                    {/* näytetään katsastuksen huomiot */}
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
