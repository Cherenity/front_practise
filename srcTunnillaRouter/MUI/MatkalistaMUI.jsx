import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MatkakorttiMUI from './MatkakorttiMUI';

function MatkalistaMUI({ matkat }) {

  return (
    <Box sx={{
      maxHeight: '100vh',
      overflowY: 'auto',
    }}>
	{/* Yllä olevalla saadaan vierityspalkki tarvittaessa */}
	
      <Grid container spacing={2} sx={{ mt: 2 }} >
        {
          matkat.map(matka => {
            return (
              <Grid key={matka.id}>
                <MatkakorttiMUI matka={matka} />
              </Grid>
            )
          })
        }
      </ Grid>
    </Box>
  )
}

export default MatkalistaMUI;
