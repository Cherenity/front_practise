import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function SaaMUI() {
    const [saatieto, setSaatieto] = useState({});
    const [viesti, setViesti] = useState('Haetaan...');

    const fetchUrl = async () => {
        try {
            const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=60.17&longitude=24.94&current_weather=true');
            const json = await response.json();
            setSaatieto(json);
            setViesti('');
            //console.log(json)
        } catch (error) {
            setViesti('Haku ei onnistunut. ');
        }
    }

    useEffect(() => { fetchUrl() }, []);

    if (viesti.length > 0) {
        return (<p>{viesti}</p>);
    }

    // Tuuli on kilometreissä ja se muutetaan metreiksi
    let tuuli = saatieto.current_weather.windspeed / 3.6;

    // Kuvastekstin tekeminen
    let kuvaus = 'Ollaan plussalla tai nollassa';
    if (saatieto.current_weather.temperature < 0) {
        kuvaus = 'Ollaan pakkasella';
    }

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant='h6'>Helsinki</Typography>
                <Typography>Lämpötila: {saatieto.current_weather.temperature}&nbsp;
                    {saatieto.current_weather_units.temperature}&nbsp;</Typography>

                {/*   Näytetään kuvausteksti */}
                {/*   {kuvaus}<br /> */}

                {/*   Näytetään tuuli muunnettuna */}
                <Typography>Tuuli: {/*  {tuuli.toFixed(0)} m/s */}

                    {/*   Näytetään perustuuli */}
                    {saatieto.current_weather.windspeed.toFixed(0)}&nbsp;
                    {saatieto.current_weather_units.windspeed}</Typography>
            </Box >
        </>
    );
}

export default SaaMUI;