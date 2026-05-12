import { Box, Typography } from "@mui/material";

function Virhe({ virhe = "Tapahtui virhe" }) {
  return (
    <Box  sx={{ p: 3 }}>
      <Typography variant="h4" color="error">
        Virhe
      </Typography>

      <Typography variant="body1" color="error">
        {virhe}
      </Typography>
    </Box>
  );
}

export default Virhe;