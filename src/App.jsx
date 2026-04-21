// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import AjoneuvoLista from "./components/AjoneuvoLista";
import Ajoneuvohaku from "./components/Ajoneuvohaku";
import AjoneuvoLomake from "./components/AjoneuvoLomake";

import AjoneuvotMUI from "./MUI/AjoneuvotMUI";
import KatsastuksetMUI from "./MUI/KatsastuksetMUI";
import AjoneuvoLomakeMUI from "./MUI/AjoneuvoLomakeMUI";
import KatsastusLomakeMUI from "./MUI/KatsastusLomakeMUI";


import { ThemeProvider, createTheme } from "@mui/material/styles";
import TabMUI from "./MUI/TabMUI";

import Box from "@mui/material/Box";

import "@fontsource/roboto";
import Typography from "@mui/material/Typography";
// npm install @fontsource/roboto

import { BrowserRouter, Routes, Route } from 'react-router';

import DashboardMUI from "./MUI/DashboardMUI";

import { Stack } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: { main: "#2f695f", contrastText: "#ffffff" },
    secondary: { main: "#7c3102", contrastText: "#ff9696" },
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
    katsastus_pvm: "2023-04-10",
    voimassa_asti: "2026-04-10",
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
      
      <Stack direction="column" spacing={2}>
        {/* Tuli himan kiire tehtävän kanssa, 
        niin hyödynnetty aiempaa 6.2 tehtävää pohjana. */}

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TabMUI ajoneuvot={ajoneuvot} katsastukset = {katsastukset} />}>
              <Route index element={<DashboardMUI ajoneuvot={ajoneuvot} katsastukset={katsastukset}/>} />

              <Route path="/ajoneuvot" element={<AjoneuvotMUI ajoneuvot={ajoneuvot} katsastukset={katsastukset} />} />

              <Route path="/katsastukset" element={<KatsastuksetMUI katsastukset={katsastukset} ajoneuvot={ajoneuvot} />} />

              <Route path="/ajoneuvontiedot/:id" element={<AjoneuvoLomakeMUI ajoneuvot={ajoneuvot} />} />
              <Route path="/ajoneuvolomake" element={<AjoneuvoLomakeMUI/>} />

            </Route>
          </Routes>
        </BrowserRouter>
    
      </Stack>



      {/* <Typography variant="h1">Tekstiä</Typography> */}

      {/* <TabMUI ajoneuvot={ajoneuvot} katsastukset = {katsastukset}/> */}

      {/* shift + alt + f on format dokumentti muistiin */}
    </ThemeProvider>
  );
}

export default App;


// Mahdollisia parannuksia, mitä voisi toteuttaa
// Katsastukset: TÄRKEÄ LISÄ: tulisi näyttää lähiaikoina umpenevat katsastukset ylimpänä (Ottaa huomioon, että ei ole sen jälkeen katsastettu). Katsastuksien tuloksen ja huomioiden esitystapaa pitää vielä miettiä. 

// Ajoneuvot: 
// Dashboard enemmän hyödyllisiä visuaaleja. Voisi toimia etusivuna, mistä saa hyvän yleiskuvan ajoneuvokannasta ja katsastuksista. 

// Backend / Routing paremmaksi

// Lopuksi hieman parempaa ulkoasua koko sivustolle ja teeman muokkaamista.


{
  /* 🚗🚙 Wroom Wroom 🚘🚚🚛 */
}
