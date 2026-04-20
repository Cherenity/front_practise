import { useState, useEffect } from "react";

function Saa() {

    const [saatieto, setSaatieto] = useState({});
    const [viesti, setViesti] = useState('Haetaan');

    const fetchUrl = async () => {
        try {
            const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=60.17&longitude=24.94&current_weather=true');
            const json = await response.json();
            setSaatieto(json);
            setViesti('');

        } catch (error) {
            setViesti('Kappaleen haku ei onnistunut');
        }
    }

    useEffect(() => {
        fetchUrl();
    }, []);

    if (viesti.length > 0) {
        return (
            <p>{viesti}</p>
        )
    }

    let kuvaus = "Ei ole pakkasella";
    if (saatieto.current_weather.temperature <= 0) {
        kuvaus = "On pakkasella tai nollaa";
    }

    return (
        <>
            <h5>Helsinki</h5>
            Lampötila: {saatieto.current_weather.temperature} {saatieto.current_weather_units.temperature} <br />
            {kuvaus}<br />
            Tuuli: {(saatieto.current_weather.windspeed / 3.6).toFixed(1)} m/s
        </>
    );
}
export default Saa;