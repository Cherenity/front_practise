import { Box, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function Virhe({ virhe = "Tapahtui virhe" }) {
  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 6,
      }}
    >
      <ErrorOutlineIcon
        sx={{
          fontSize: 80,
          color: "primary.main",
          mb: 2,
        }}
      />

      <Typography
        variant="h4"
        sx={{
          color: "primary.main",
          mb: 1,
        }}
      >
        Virhe
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: "primary.main",
        }}
      >
        {virhe}
      </Typography>
    </Box>
  );
}

export default Virhe;