function AjoneuvoLista({ ajoneuvot }) {
  if (ajoneuvot.length === 0) {
    return <p>Ei ajoneuvoja</p>;
  }
  // muistissa vanhasta skriptistä, mutta ei enää käytössä:
  // const onkoAlkuMyohem = (alku, loppu) => new Date(alku) > new Date(loppu);

  const katsastusLoppuuLahiaikoina = (pvm) => {
    const raja = new Date(); // Nykyinen päivämäärä
    raja.setDate(raja.getDate() + 30);
    return new Date(pvm) <= raja;
  };

  return (
    <>
      <h2 style={{ fontFamily: "Arial", margin: 0, padding: 0 }}>Ajoneuvot</h2>

      {ajoneuvot.map((ajoneuvo) => (
        <p
          key={ajoneuvo.id}
          style={{
            backgroundColor: ajoneuvo.id % 2 === 0 ? "#ccf7da" : "#ffffff",
            fontFamily: "Arial",
            margin: 0,
            padding: "2px",
            borderBottom: "1px solid #401414",
          }}
        >
          <strong>{ajoneuvo.rekisterinumero}</strong> | {ajoneuvo.merkki}{" "}
          {ajoneuvo.malli} | Tyyppi: {ajoneuvo.tyyppi} | Käyttöönotto pvm:{" "}
          {ajoneuvo.kayttoonottoPvm} | {"Käytössä: "}
          {ajoneuvo.kaytossa ? "Kyllä" : "Ei"}
        </p>
      ))}
    </>
  );
}

export default AjoneuvoLista;
