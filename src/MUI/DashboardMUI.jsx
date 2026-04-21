import { Box, Typography, Card, CardContent } from "@mui/material";
import PieChartIcon from "@mui/icons-material/PieChart";

function DashboardMUI({ ajoneuvot = [], katsastukset = [] }) {
  const hyvaksytyt = katsastukset.filter(k => k.tulos === "Hyväksytty").length;
  const hylatyt = katsastukset.filter(k => k.tulos === "Hylätty").length;

  const Kortti = ({ title, value, color }) => (
    <Card
      sx={{
        flex: 1,
        position: "relative",
        borderRadius: 2,
        boxShadow: 2,
        
        // Tämä luo ohuen värillisen viivan kortin vasempaan reunaan.
        "&::before": {
          content: '""',
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "6px",
          bgcolor: color + ".main",  // muodostaa theme.palette[color].main arvon
        },
      }}
    >
      <CardContent sx={{ pl: 3 }}>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h4" sx={{ mt: 1, fontWeight: 700 }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Otsikko + alaotsikko */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PieChartIcon sx={{ fontSize: 40, color: "primary.main" }} />
          <Typography variant="h4">Dashboard</Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Ajoneuvojen ja katsastusten yhteenveto
        </Typography>
      </Box>

      {/* Kortit */}
      <Box sx={{ display: "flex", gap: 3 }}>
        <Kortti title="Ajoneuvoja yhteensä" value={ajoneuvot.length} color="primary" />
        <Kortti title="Katsastuksia yhteensä" value={katsastukset.length} color="info" />
        <Kortti title="Hyväksytyt" value={hyvaksytyt} color="success" />
        <Kortti title="Hylätyt" value={hylatyt} color="error" />
      </Box>
    </Box>
  );
}

export default DashboardMUI;