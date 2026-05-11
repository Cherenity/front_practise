import axios from 'axios';

const palvelin = 'http://localhost:8080/';


// Haetaan kaikki ajoneuvot
export const getAjoneuvot = async () => {
  try {
    const response = await axios.get(palvelin + 'ajoneuvo/all');
    return response;
  } catch (error) {
    return {
      status: error.response?.status,
      message: 'Ajoneuvojen haku ei onnistunut: ' + error.message
    };
  }
};

// Haetaan yksi ajoneuvo
export const getAjoneuvo = async (id) => {
  try {
    const response = await axios.get(palvelin + 'ajoneuvo/one/' + id);
    return response;
  } catch (error) {
    return {
      status: error.response?.status,
      message: 'Ajoneuvon haku ei onnistunut: ' + error.message
    };
  }
};

// Lisätään uusi ajoneuvo
export const addAjoneuvo = async (ajoneuvo) => {
  try {
    const response = await axios.post(
      palvelin + 'ajoneuvo/add',
      ajoneuvo,
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );

    return response;
  } catch (error) {
    return {
      status: error.response?.status,
      message: 'Ajoneuvon lisäys ei onnistunut: ' + error.message
    };
  }
};

// Muokataan ajoneuvoa
export const updateAjoneuvo = async (id, ajoneuvo) => {
  try {
    const response = await axios.put(
      palvelin + 'ajoneuvo/update/' + id,
      ajoneuvo,
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );

    return response;
  } catch (error) {
    return {
      status: error.response?.status,
      message: 'Ajoneuvon muokkaus ei onnistunut: ' + error.message
    };
  }
};

// Poistetaan ajoneuvo
export const deleteAjoneuvo = async (id) => {
  try {
    const response = await axios.delete(
      palvelin + 'ajoneuvo/delete/' + id
    );

    return response;
  } catch (error) {
    return {
      status: error.response?.status,
      message: 'Ajoneuvon poisto ei onnistunut: ' + error.message
    };
  }
};

// Haetaan kaikki katsastukset
export const getKatsastukset = async () => {
  try {
    const response = await axios.get(palvelin + 'katsastus/all');
    return response;
  } catch (error) {
    return {
      status: error.response?.status,
      message: 'Katsastusten haku ei onnistunut: ' + error.message
    };
  }
};

// Lisätään uusi katsastus
export const addKatsastus = async (katsastus) => {
  try {
    const response = await axios.post(
      palvelin + 'katsastus/add',
      katsastus,
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );

    return response;
  } catch (error) {
    return {
      status: error.response?.status,
      message: 'Katsastuksen lisäys ei onnistunut: ' + error.message
    };
  }
};

// Muokataan katsastusta
export const updateKatsastus = async (id, katsastus) => {
  const url = `${palvelin}/katsastus/update/${id}`;

  console.log("PUT-kutsu osoitteeseen:", url);
  console.log("Lähetettävä id:", id);
  console.log("Lähetettävä katsastus:", katsastus);

  try {
    const response = await axios.put(
      url,
      katsastus,
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );

    console.log("PUT onnistui");
    console.log("Status:", response.status);
    console.log("Vastaus:", response.data);

    return response;
  } catch (error) {
    console.error("PUT epäonnistui");
    console.error("Virhe:", error);
    console.error("Status:", error.response?.status);
    console.error("Backendin vastaus:", error.response?.data);
    console.error("Virheviesti:", error.message);

    return {
      status: error.response?.status,
      data: error.response?.data,
      message:
        'Katsastuksen muokkaus ei onnistunut: ' +
        (error.response?.data?.message || error.message)
    };
  }
};

// Poistetaan katsastus
export const deleteKatsastus = async (id) => {
  try {
    const response = await axios.delete(
      palvelin + 'katsastus/delete/' + id
    );

    return response;
  } catch (error) {
    return {
      status: error.response?.status,
      message: 'Katsastuksen poisto ei onnistunut: ' + error.message
    };
  }
};