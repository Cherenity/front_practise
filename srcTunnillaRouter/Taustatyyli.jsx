import Box from '@mui/material/Box';

function Taustatyyli() {
    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'url(/kuvia/majakka.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: 0.4,
                zIndex: -1,
            }}
        />
    );
}
export default Taustatyyli;