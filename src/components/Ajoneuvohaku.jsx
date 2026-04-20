import { useState } from "react";

function Ajoneuvohaku({ ajoneuvot }) {
  const [rekisterinumero, setRekisterinumero] = useState("");
  const [haetaan, setHaetaan] = useState(false);

  const muuta = (e) => {
    setRekisterinumero(e.target.value);
    setHaetaan(false);
  };

  const hae = () => {
    if (rekisterinumero.trim() === "") {
      return;
    }
    setHaetaan(true);
  };

  const haeAjoneuvot = () => {
    if (!haetaan) return null;

    // Tässä riittää, että matkan paikasta löytyy osamerkkijono eikä kirjainkoolla ole merkitystä (kurssimateriaalista)  + lisätty trim jos turhia välejä alussa tai lopussa
    let result = ajoneuvot.filter((a) =>
      a.rekisterinumero
        .toUpperCase()
        .includes(rekisterinumero.trim().toUpperCase()),
    );

    if (result.length === 0) {
      return <p>Ajoneuvoa ei löytynyt rekisterinumerolla: {rekisterinumero}</p>;
    }

    return result.map((a) => (
      <p key={a.id}>
        {a.rekisterinumero} - {a.merkki} {a.malli}
      </p>
    ));
  };

  return (
    <div>
      <h2 style={{ fontFamily: "Arial", margin: 0, padding: 0 }}>
        Ajoneuvon haku
      </h2>
      <input
        id="ajoneuvo-haku"
        type="text"
        value={rekisterinumero}
        onChange={muuta}
        placeholder="Syötä rekisterinumero"
      />
      <button onClick={hae}>Hae</button>

      {haeAjoneuvot()}
    </div>
  );
}

export default Ajoneuvohaku;
