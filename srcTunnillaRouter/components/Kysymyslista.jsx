import { useState, useEffect } from "react";

function Kysymyslista() {
    const [kysymykset, setKysymykset] = useState([]);
    const [viesti, setViesti] = useState('Haetaan');

    const fetchUrl = async () => {
        try {
            const response = await fetch('https://opentdb.com/api.php?amount=10&type=boolean&difficulty=easy');
            const json = await response.json();
            setKysymykset(json.results);
            setViesti('');

        } catch (error) {
            setViesti('Pokemonien haku ei onnistunut');
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

    const decodeHtmlEntities = (text) => {
        return text.replace(/&quot;/g, '"')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&#039;/g, "'");
    };

    return (
        <>
            <h5>Kysymykset</h5>
            {
                kysymykset.map((kysymys, index) => {
                    return (
                        <p key={index}>
                            Kysymys: {decodeHtmlEntities(kysymys.question)}<br />
                            Oikea vastaus: {kysymys.correct_answer}
                        </p>
                    );
                })
            }

        </>
    );
}

export default Kysymyslista;
