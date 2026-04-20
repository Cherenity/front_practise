import { useState, useEffect } from "react";

function Pokemon() {
    const [pokemonit, setPokemonit] = useState({});
    const [viesti, setViesti] = useState('Haetaan');

    const fetchUrl = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
            const json = await response.json();
            setPokemonit(json);
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

    return (
        <>
            <h5>Pokemon</h5>
            {
                pokemonit.results.map((pokemon, index) => {
                    return (
                        <div key={index}>
                            {pokemon.name}
                        </div>
                    );
                })
            }
            Pokemoneja oli yhteensä {pokemonit.count}
        </>
    );
}
export default Pokemon;