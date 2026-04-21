import { useState } from "react";
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
  Divider,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function KatsastuksetMUI({ katsastukset, ajoneuvot }) {
  const [hakusana, setHakusana] = useState("");
  const [muokattava, setMuokattava] = useState(null);

  const haku = hakusana.toLowerCase();

  const format = (pvm) =>
    pvm ? new Date(pvm).toLocaleDateString("fi-FI") : "-";

  // Suodatus rekisterinumeron perusteella
  const naytettavatKatsastukset = katsastukset.filter((k) => {
    const ajoneuvo = ajoneuvot.find((a) => a.id === k.ajoneuvoId);
    const rek = ajoneuvo?.rekisterinumero?.toLowerCase() ?? "";
    return rek.includes(haku);
  });

  return (
    <Box sx={{ display: "flex", gap: 3, p: 2 }}>
      {/* VASEN PUOLI: KORTIT */}
      <Box sx={{ flex: 2 }}>
        <Typography variant="h4">
          Katsastukset
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Katsastustiedot ja niiden muokkaus
        </Typography>

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

        <Grid container spacing={3}>
          {naytettavatKatsastukset.map((k) => {
            const ajoneuvo = ajoneuvot.find((a) => a.id === k.ajoneuvoId);

            return (
              <Grid key={k.id} item xs={12} sm={6} md={4}>
                <Card sx={{ p: 1 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {/* Reknro tulee pakolliseksi tietokantaan, eli jos tulisi niin joku muu vika sovelluksessa olisi. Laitettu tarkistus kuitenkin varmuuden vuoksi.  */}
                      {ajoneuvo?.rekisterinumero ?? "Tuntematon ajoneuvo"}
                    </Typography>

                    <Typography variant="body2">
                      <strong>Päivä:</strong> {format(k.katsastus_pvm)}
                    </Typography>

                    <Typography variant="body2">
                      <strong>Voimassa asti:</strong> {format(k.voimassa_asti)}
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
                      onClick={() => setMuokattava(k)}
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

      {/* OIKEA PUOLI: MIKA ON MUOKKAUSLOMAKE */}
      <Box sx={{ flex: 1 }}>
        {muokattava ? (
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Muokkaa katsastusta
            </Typography>

            <TextField
              label="Katsastuspäivä"
              fullWidth
              sx={{ mb: 2 }}
              value={muokattava.katsastus_pvm}
              onChange={(e) =>
                setMuokattava({
                  ...muokattava,
                  katsastus_pvm: e.target.value,
                })
              }
            />

            <TextField
              label="Voimassa asti"
              fullWidth
              sx={{ mb: 2 }}
              value={muokattava.voimassa_asti}
              onChange={(e) =>
                setMuokattava({
                  ...muokattava,
                  voimassa_asti: e.target.value,
                })
              }
            />

            <TextField
              label="Kilometrit"
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
              sx={{ mb: 2 }}
              value={muokattava.huomiot}
              onChange={(e) =>
                setMuokattava({
                  ...muokattava,
                  huomiot: e.target.value,
                })
              }
            />

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="contained" color="primary">
                Tallenna
              </Button>

              <Button
                variant="outlined"
                color="error"
                onClick={() => setMuokattava(null)}
              >
                Peruuta
              </Button>

              <Button variant="contained" color="error">
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
