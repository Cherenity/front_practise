// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import AjoneuvoLista from "./components/AjoneuvoLista";
import Ajoneuvohaku from "./components/Ajoneuvohaku";
import AjoneuvoLomake from "./components/AjoneuvoLomake";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import TabMUI from "./MUI/TabMUI";

import Box from "@mui/material/Box";

import "@fontsource/roboto";
import Typography from "@mui/material/Typography";
// npm install @fontsource/roboto

const theme = createTheme({
  palette: {
    primary: { main: "#50b2a2", contrastText: "#ffffff" },
    secondary: { main: "#730a3b", contrastText: "#fa9da6" },
    text: { primary: "#070707", secondary: "#1e2c21" },
  },

  typography: {
    fontFamily: "Roboto, sans-serif",
  },

  components: {
    MuiTabs: {
      styleOverrides: {
        indicator: { backgroundColor: "#75ff8a", height: 8, borderRadius: 2 },
      },
    },

    // MuiTab: {
    //   styleOverrides: {
    //     root: {
    //       "&.Mui-selected": { color: "#087168", fontWeight: "bold" },
    //     }, // root
    //   },
    // }, // MuiTab

    // MuiMenu: {
    //   styleOverrides: {
    //     paper: {},
    //   },
    // }, // MuiMenu

    // MuiListItemIcon: {
    //   styleOverrides: {
    //     root: {},
    //   },
    // }, // MuiListItemIcon

    // MuiMenuItem: {
    //   styleOverrides: {
    //     root: {
    //       "&:hover": {
    //         "& .MuiListItemIcon-root": {},
    //       },
    //     }, // root
    //   },
    // }, //MuiMenuItem
  }, // components
}); // theme

const ajoneuvot = [
  {
    id: 1,
    rekisterinumero: "ABK-115",
    merkki: "Toyota",
    malli: "Yaris",
    tyyppi: "Henkilöauto",
    kayttoonottoPvm: "2021-03-15",
    kaytossa: true,
  },
  {
    id: 2,
    rekisterinumero: "ABC-456",
    merkki: "Ford",
    malli: "Transit",
    tyyppi: "Pakettiauto",
    kayttoonottoPvm: "2019-06-20",
    kaytossa: false,
  },
  {
    id: 3,
    rekisterinumero: "GHI-789",
    merkki: "Tesla",
    malli: "Model joku",
    tyyppi: "Henkilöauto",
    kayttoonottoPvm: "2023-05-12",
    kaytossa: true,
  },
];

const katsastukset = [
  {
    id: 1,
    ajoneuvoId: 1,
    katsastus_pvm: "2024-04-10",
    voimassa_asti: "2025-04-10",
    tulos: "Hyväksytty",
    kilometrit: 15000,
    huomiot: "Ei huomautettavaa",
  },
  {
    id: 2,
    ajoneuvoId: 2,
    katsastus_pvm: "2016-11-05",
    voimassa_asti: "2020-11-05",
    tulos: "Hylätty",
    kilometrit: 50000,
    huomiot: "Jarrut kuluneet, vaihdettava",
  },
  {
    id: 3,
    ajoneuvoId: 2,
    katsastus_pvm: "2020-01-05",
    voimassa_asti: "2024-01-05",
    tulos: "Hyväksytty",
    kilometrit: 8000,
    huomiot: "Ei huomautettavaa",
  },
];

function App() {
  // ajoneuvokirjasto

  return (
    <ThemeProvider theme={theme}>
      {/* <Typography variant="h1">Tekstiä</Typography> */}

      <TabMUI ajoneuvot={ajoneuvot} katsastukset = {katsastukset}/>

      {/* shift + alt + f on format dokumentti muistiin */}
    </ThemeProvider>
  );
}

export default App;


// Mahdollisia parannuksia, mitä voisi toteuttaa
// Katsastukset: TÄRKEÄ LISÄ: tulisi näyttää lähiaikoina umpenevat katsastukset ylimpänä (Ottaa huomioon, että ei ole sen jälkeen katsastettu). Katsastuksien tuloksen ja huomioiden esitystapaa pitää vielä miettiä. 

// Ajoneuvot:

// Dashboard enemmän hyödyllisiä visuaaleja 

// Backend / Routing paremmaksi

// Lopuksi hieman parempaa ulkoasua koko sivustolle ja teeman muokkaamista.


{
  /* 🚗🚙 Wroom Wroom 🚘🚚🚛 */
}
