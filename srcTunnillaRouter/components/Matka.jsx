function Matka({ data, paiva }) {
    let pvm = new Date(data.paiva);
    pvm = pvm.toLocaleDateString('fi-FI');

    // 3. Ehto komponentin sisässä
    let kuva;
    if (data.kuva) {
        kuva = <img src={data.kuva} alt={data.otsikko} style={{ display: 'block' }} width={200} />;
    } else {
        kuva = <><br />Matkasta ei ole kuvaa</>;
    }

    // 4. Ehto nuolinotaatiofunktioilla
    const naytaKuva = (kuva, selite) => {
        if (kuva) {
            return <img src={kuva} alt={selite} style={{ display: 'block' }} width={200} />
        } else {
            return <><br />Matkasta ei ole kuvaa</>
        }
    }

    return (
        <>
            <p style={{
                color: 'darkblue',
                backgroundColor: "lightblue",
                padding: '13px',
                fontFamily: 'courier',
                fontWeight: 800,
            }}>
                Otsikko: {data.otsikko}<br />
                Päivä: {pvm}<br />
                Paikka: {data.paikka}<br />
                Sää: {data.saa}<br />
                Kuvaus: {data.kuvaus}
                {/* 1. ehdollisella operaattorilla  */}
                {/*  {
                    data.kuva ?
                        <img src={data.kuva} alt={data.otsikko} style={{ display: 'block' }} width={200} />
                        :
                        <><br />Matkasta ei ole kuvaa</>
                } */}

                {/*2. Looginen operaattori */}
                {/* {
                    data.kuva && <img src={data.kuva} alt={data.otsikko} style={{ display: 'block' }} width={200} />
                }

                {
                    ! data.kuva && <><br />Matkasta ei ole kuvaa</>
                } */}

                {/* 3. Ehto komponentin sisään */}
                {/*  {kuva} */}

                {/* 4. Ehto nuolinotaatiofunktioissa */}
                {naytaKuva(data.kuva, data.otsikko)}

            </p>
            {/*  <p>{paiva}</p> */}

        </>
    )
}

export default Matka;