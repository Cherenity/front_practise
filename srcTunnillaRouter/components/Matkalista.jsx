import Matka from "./Matka";

function Matkalista({ matkat }) {
    
    if (matkat.length === 0) {
        return (<p>Matkoja ei ole</p>)
    }

    return (
        <>
            {
                matkat.map((matka, index) => {
                    return (
                        <Matka data={matka} key={index} />
                    );
                })
            }
        </>
    );

}
export default Matkalista;