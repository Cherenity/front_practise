import { useState } from 'react';
import Matka from './Matka';

function MatkalistaHaku({ matkat }) {
    const [paikka, setPaikka] = useState('');
    const [listaus, setListaus] = useState('');

    const muuta = (e) => {
        setPaikka(e.target.value);
    }

    const hae = () => {
        // Filtteröidään matkat paikan perusteella
        // Tässä riittää, että matkan paikasta löytyy osamerkkijono eikä kirjainkoolla ole merkitystä
        let result = matkat.filter(matka => matka.paikka.toUpperCase().includes(paikka.toUpperCase()));

        let vastaus;

        // Jos haku ei tuottanut yhtään objektia, taulukko on tyhjä
        if (result.length === 0) {
            vastaus = <p>Kyseisellä paikkakunnalla ei ole matkoja</p>;
        } else {
            // Jos haku tuotti tulosta,mapataan se
            vastaus = result.map((matka, index) => {
                return (
                    <Matka data={matka} key={index} />
                );
            })
        }

        // Asetetaan haun tulos tilamuuttujaan
        setListaus(vastaus);
    }

    return (
        <>
            <form>
                <label>Paikka
                    <input type='text' name='paikka' value={paikka}
                        onChange={(e) => muuta(e)} />&nbsp;
                </label>
                <input type='button' value='Hae' onClick={() => hae()} />
            </form>

            {/* Näytetään tilamuutuja */}
            {listaus}
        </>
    )
}
export default MatkalistaHaku;
