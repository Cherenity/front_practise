import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Paper,
  LinearProgress,
  Stack,
  Alert,
  Divider,
  Chip,
} from "@mui/material";

import PieChartIcon from "@mui/icons-material/PieChart";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import TrafficIcon from "@mui/icons-material/Traffic";

// Tuodaan kantakäsittelijästä funktiot, joilla haetaan tiedot backendiltä.
// Backend hakee varsinaiset tiedot SQLite-tietokannasta.
import {
  getAjoneuvot,
  getKatsastukset,
} from "../MUI/ajoneuvotKatsastukset";

function DashboardMUI() {
  // =========================
  // TIETOKANNASTA HAETTAVAT TIEDOT
  // =========================

  // Ajoneuvot tallennetaan tähän stateen, kun ne on haettu tietokannasta.
  const [ajoneuvot, setAjoneuvot] = useState([]);

  // Katsastukset tallennetaan tähän stateen, kun ne on haettu tietokannasta.
  const [katsastukset, setKatsastukset] = useState([]);

  // ladataan kertoo, onko tietojen haku vielä kesken.
  const [ladataan, setLadataan] = useState(true);

  // virheeseen tallennetaan käyttäjälle näytettävä virheilmoitus,
  // jos tietojen haku epäonnistuu.
  const [virhe, setVirhe] = useState("");

  // =========================
  // TIETOJEN HAKU TIETOKANNASTA
  // =========================

  useEffect(() => {
    const haeTiedot = async () => {
      try {
        setLadataan(true);
        setVirhe("");

        // Haetaan ajoneuvot ja katsastukset backendiltä.
        // Promise.all tekee haut rinnakkain, jolloin näkymä latautuu nopeammin.
        const [ajoneuvoResponse, katsastusResponse] = await Promise.all([
          getAjoneuvot(),
          getKatsastukset(),
        ]);

        // Jos ajoneuvojen haku onnistui, tallennetaan data stateen.
        if (ajoneuvoResponse.status === 200) {
          setAjoneuvot(ajoneuvoResponse.data);
        } else {
          setVirhe(
            ajoneuvoResponse.message || "Ajoneuvojen haku ei onnistunut.",
          );
        }

        // Jos katsastusten haku onnistui, tallennetaan data stateen.
        if (katsastusResponse.status === 200) {
          setKatsastukset(katsastusResponse.data);
        } else {
          setVirhe(
            katsastusResponse.message || "Katsastusten haku ei onnistunut.",
          );
        }
      } catch (error) {
        // Tänne tullaan esimerkiksi silloin, jos backend ei ole käynnissä.
        setVirhe("Tietojen haku epäonnistui: " + error.message);
      } finally {
        // Lataustila poistetaan aina lopuksi, onnistui haku tai ei.
        setLadataan(false);
      }
    };

    haeTiedot();
  }, []);

  // =========================
  // LASKETTAVAT YHTEENVETOTIEDOT
  // =========================

  // Lasketaan hyväksyttyjen ja hylättyjen katsastusten määrät.
  const hyvaksytyt = katsastukset.filter(
    (k) => k.tulos === "Hyväksytty",
  ).length;

  const hylatyt = katsastukset.filter((k) => k.tulos === "Hylätty").length;

  // Lasketaan liikennekäytössä olevat ajoneuvot.
  // SQLite palauttaa kaytossa-arvon usein numerona 0 tai 1.
  const kaytossa = ajoneuvot.filter((a) => Number(a.kaytossa) === 1).length;

  // Lasketaan prosentit visuaalisia palkkeja varten.
  // Jos katsastuksia ei ole, prosentiksi asetetaan 0, ettei tule jakovirhettä.
  const hyvaksytytProsentti =
    katsastukset.length > 0 ? (hyvaksytyt / katsastukset.length) * 100 : 0;

  const hylatytProsentti =
    katsastukset.length > 0 ? (hylatyt / katsastukset.length) * 100 : 0;

  // Tehdään viimeisimmistä katsastuksista oma lista.
  // Kopioidaan taulukko ensin [...katsastukset], jotta alkuperäinen state ei muutu.
  const viimeisimmatKatsastukset = [...katsastukset]
    .sort((a, b) => new Date(b.katsastus_pvm) - new Date(a.katsastus_pvm))
    .slice(0, 5);

  // =========================
  // PIENI SISÄINEN KORTTIKOMPONENTTI
  // =========================

  // Kortti-komponenttia käytetään dashboardin yläosan tunnuslukukorteissa.
  // Näin samaa ulkoasua ei tarvitse kirjoittaa neljään kertaan.
  const Kortti = ({ title, value, color, icon }) => (
    <Card
      sx={{
        flex: 1,
        minWidth: 180,
        position: "relative",
        borderRadius: 3,
        boxShadow: 3,
        overflow: "hidden",

        // Hieman eloa kortteihin: kortti nousee kevyesti hoverissa.
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },

        // Tämä luo ohuen värillisen viivan kortin vasempaan reunaan.
        "&::before": {
          content: '""',
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "6px",
          bgcolor: color + ".main",
        },
      }}
    >
      <CardContent sx={{ pl: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ color: color + ".main" }}>{icon}</Box>

          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
        </Box>

        <Typography variant="h4" sx={{ mt: 1, fontWeight: 700 }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );

  // =========================
  // LATAUS JA VIRHETILANTEET
  // =========================

  if (ladataan) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info">Ladataan dashboardin tietoja...</Alert>
      </Box>
    );
  }

  if (virhe) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">{virhe}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* =========================
          OTSIKKO
          ========================= */}

      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PieChartIcon sx={{ fontSize: 40, color: "primary.main" }} />

          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Dashboard
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Ajoneuvojen ja katsastusten yhteenveto tietokannasta
        </Typography>
      </Box>

      {/* =========================
          YHTEENVETOKORTIT
          ========================= */}

      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexWrap: "wrap",
          mb: 3,
        }}
      >
        <Kortti
          title="Ajoneuvoja yhteensä"
          value={ajoneuvot.length}
          color="primary"
          icon={<DirectionsCarIcon />}
        />

        <Kortti
          title="Katsastuksia yhteensä"
          value={katsastukset.length}
          color="info"
          icon={<FactCheckIcon />}
        />

        <Kortti
          title="Hyväksytyt"
          value={hyvaksytyt}
          color="success"
          icon={<CheckCircleIcon />}
        />

        <Kortti
          title="Hylätyt"
          value={hylatyt}
          color="error"
          icon={<CancelIcon />}
        />

        <Kortti
          title="Liikennekäytössä"
          value={kaytossa}
          color="warning"
          icon={<TrafficIcon />}
        />
      </Box>

      {/* =========================
          LISÄVISUAALIT
          ========================= */}

      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexWrap: "wrap",
        }}
      >
        {/* Katsastustulosten prosentit */}
        <Paper
          sx={{
            flex: 1,
            minWidth: 300,
            p: 3,
            borderRadius: 3,
            boxShadow: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            Katsastusten tulosjakauma
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 0.5,
              }}
            >
              <Typography variant="body2">Hyväksytyt</Typography>

              <Typography variant="body2">
                {hyvaksytytProsentti.toFixed(0)} %
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={hyvaksytytProsentti}
              color="success"
              sx={{ height: 10, borderRadius: 5 }}
            />
          </Box>

          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 0.5,
              }}
            >
              <Typography variant="body2">Hylätyt</Typography>

              <Typography variant="body2">
                {hylatytProsentti.toFixed(0)} %
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={hylatytProsentti}
              color="error"
              sx={{ height: 10, borderRadius: 5 }}
            />
          </Box>
        </Paper>

        {/* Viimeisimmät katsastukset */}
        <Paper
          sx={{
            flex: 1,
            minWidth: 300,
            p: 3,
            borderRadius: 3,
            boxShadow: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            Viimeisimmät katsastukset
          </Typography>

          {viimeisimmatKatsastukset.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              Katsastuksia ei ole vielä lisätty.
            </Typography>
          ) : (
            <Stack spacing={1.5}>
              {viimeisimmatKatsastukset.map((k) => (
                <Box key={k.id}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="body2" fontWeight="bold">
                        Katsastus #{k.id}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        {k.katsastus_pvm
                          ? new Date(k.katsastus_pvm).toLocaleDateString(
                              "fi-FI",
                            )
                          : "-"}
                      </Typography>
                    </Box>

                    <Chip
                      label={k.tulos}
                      color={k.tulos === "Hyväksytty" ? "success" : "error"}
                      size="small"
                    />
                  </Box>

                  <Divider sx={{ mt: 1 }} />
                </Box>
              ))}
            </Stack>
          )}
        </Paper>
      </Box>
    </Box>
  );
}

export default DashboardMUI;