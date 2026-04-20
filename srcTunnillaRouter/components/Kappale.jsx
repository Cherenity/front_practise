import { useState, useEffect } from "react";

function Kappale() {

    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [viesti, setViesti] = useState('Haetaan');

    const fetchUrl = async () => {
        try {
            const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ffeeds.publicradio.org%2Fpublic_feeds%2Fsong-of-the-day%2Frss%2Frss');
            const json = await response.json();

            setTitle(json.items[0].title);
            setLink(json.items[0].enclosure.link);

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

    return (
        <>
            <h5>{title}</h5>

            <audio controls autoPlay>
                <source src={link} type='audio/mpeg' />
            </audio>
        </>
    );
}

export default Kappale;