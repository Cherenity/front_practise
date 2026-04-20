import { Box, Typography, Card, CardContent } from "@mui/material";
import PieChartIcon from "@mui/icons-material/PieChart";

function DashboardMUI({ ajoneuvot, katsastukset }) {
  return (
    <Box sx={{ p: 3 }}>
      {/* Otsikko + ikoni */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <PieChartIcon sx={{ fontSize: 40, color: "primary.main" }} />
        <Typography variant="h4">Dashboard</Typography>
      </Box>

      {/* Esimerkkikortit */}
      <Box sx={{ display: "flex", gap: 3 }}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6">Ajoneuvoja yhteensä</Typography>
            <Typography variant="h4" sx={{ mt: 1 }}>
              {ajoneuvot.length}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6">Katsastuksia yhteensä</Typography>
            <Typography variant="h4" sx={{ mt: 1 }}>
              {katsastukset.length}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, backgroundColor: "greenyellow" }}>
          <CardContent>
            <Typography variant="h6">Hyväksyttyjä katsastuksia</Typography>
            <Typography variant="h4" sx={{ mt: 1 }}>
              {katsastukset.filter(k => k.tulos === "Hyväksytty").length}
            </Typography>
          </CardContent>
        </Card>

        
        <Card sx={{ flex: 1, backgroundColor: "red"}}>
          <CardContent>
            <Typography variant="h6">Hylättyjä katsastuksia</Typography>
            <Typography variant="h4" sx={{ mt: 1 }}>
              {katsastukset.filter(k => k.tulos === "Hylätty").length}
            </Typography>
          </CardContent>
        </Card>






      </Box>
    </Box>
  );
}

export default DashboardMUI;
