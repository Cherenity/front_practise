import { useState } from 'react';

function Matkalomake() {

  const [matka, setValues] = useState({
    otsikko: '',
    paiva: '',
    paikka: '',
    saa: '',
    kuvaus: '',
  });

  const [viesti, setViesti] = useState('Täytä kentät');

  const suurella = (e) => {
    setValues({
      ...matka,
      [e.target.name]: e.target.value.toUpperCase()
    });

    setViesti('');
  };

  const muuta = (e) => {
    setValues({
      ...matka,
      [e.target.name]: e.target.value
    });

    setViesti('');
  };

  const lisaaMatka = () => {
    setValues({
      otsikko: '',
      paiva: '',
      paikka: '',
      saa: '',
      kuvaus: '',
    });

    setViesti('Lisättiin');
  }

  return (
    <>
      <form>
        <label>Otsikko
          <input type='text' name='otsikko' value={matka.otsikko} onChange={(e) => suurella(e)} /><br />
        </label>
        <label>Paikka
          <input type='text' name='paikka' value={matka.paikka} onChange={(e) => muuta(e)} /><br />
        </label>
        <label>Päivä
          <input type='text' name='paiva' value={matka.paiva} onChange={(e) => muuta(e)} /><br />
        </label>
        <label>Sää
          <input type='text' name='saa' value={matka.saa} onChange={(e) => muuta(e)} /><br />
        </label>
        <label>Kuvaus
          <input type='text' name='kuvaus' value={matka.kuvaus} onChange={(e) => muuta(e)} /><br />
        </label>
        <input type='button' value='Lisää' onClick={() => lisaaMatka()} />
      </form>

      {viesti}

    </>
  );
}

export default Matkalomake;
