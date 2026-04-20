import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function EtusivuMUI() {
    const nyt = new Date();
    const paiva = nyt.toLocaleDateString('fi-FI', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 1
        }}>
            <Typography>Tämä on tuntiesimerkki Front end -ohjelmointi opintojaksolle.</Typography>
            <Typography>Tänään on {paiva}.</Typography>
        </Box>
    )
}

export default EtusivuMUI;