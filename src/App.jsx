
import AjoneuvotMUI from "./MUI/AjoneuvotMUI";
import KatsastuksetMUI from "./MUI/KatsastuksetMUI";

// Lomakkeet
import AjoneuvoLomakeMUI from "./MUI/AjoneuvoLomakeMUI";
import KatsastusLomakeMUI from "./MUI/KatsastusLomakeMUI";

import Virhe from "./MUI/Virhe";

import DashboardMUI from "./MUI/DashboardMUI";
import TabMUI from "./MUI/TabMUI";

import { ThemeProvider, createTheme } from "@mui/material/styles";


import "@fontsource/roboto";
// npm install @fontsource/roboto

import { BrowserRouter, Routes, Route } from "react-router";
import { Box, Stack, Typography } from "@mui/material";

// teema
const theme = createTheme(
  {
    palette: {
      primary: {
        main: "#2a3927",
        contrastText: "#ffffff",
      },

      secondary: {
        main: "#5a6066",
        contrastText: "#f2f2f2",
      },

      text: {
        primary: "#1a1a1a",
        secondary: "#4f4f4f",
      },
    },

    typography: {
      fontFamily: "Roboto, sans-serif",
    },

    components: {
      MuiTabs: {
        styleOverrides: {
          root: {
            backgroundColor: "#1e1e1e", // koko tabbarin tausta
            minHeight: 48,
          },
          indicator: {
            backgroundColor: "#75ff8a",
            height: 6,
            borderRadius: 3,
          },
        },
      },

      MuiTab: {
        styleOverrides: {
          root: {
            color: "#ffffff", // tekstin ja ikonien väri
            minHeight: 48,
            padding: "8px 16px",
            "&.Mui-selected": {
              color: "#9abced", // valitun tabin väri
              backgroundColor: "#164238", // kevyt tausta
            },
            "&:hover": {
              backgroundColor: "#213f42", // hover‑tausta
            },
          },
          iconWrapper: {
            fontSize: "1.3rem", // isompi ikoni
          },
        },
      },
    },
  }, // components
); // theme

//vanhat objektit, jotka on korvattu tietokannalla:
// const ajoneuvot = [
//   {
//     id: 1,
//     rekisterinumero: "ABK-115",
//     merkki: "Toyota",
//     malli: "Yaris",
//     tyyppi: "Henkilöauto",
//     kayttoonottoPvm: "2021-03-15",
//     kaytossa: true,
//   },
//   {
//     id: 2,
//     rekisterinumero: "ABC-456",
//     merkki: "Ford",
//     malli: "Transit",
//     tyyppi: "Pakettiauto",
//     kayttoonottoPvm: "2019-06-20",
//     kaytossa: false,
//   },
//   {
//     id: 3,
//     rekisterinumero: "GHI-789",
//     merkki: "Tesla",
//     malli: "Model joku",
//     tyyppi: "Henkilöauto",
//     kayttoonottoPvm: "2023-05-12",
//     kaytossa: true,
//   },
// ];

// const katsastukset = [
//   {
//     id: 1,
//     ajoneuvoId: 1,
//     katsastus_pvm: "2023-04-10",
//     voimassa_asti: "2026-04-10",
//     tulos: "Hyväksytty",
//     kilometrit: 15000,
//     huomiot: "Ei huomautettavaa",
//   },
//   {
//     id: 2,
//     ajoneuvoId: 2,
//     katsastus_pvm: "2016-11-05",
//     voimassa_asti: "2020-11-05",
//     tulos: "Hylätty",
//     kilometrit: 50000,
//     huomiot: "Jarrut kuluneet, vaihdettava",
//   },
//   {
//     id: 3,
//     ajoneuvoId: 2,
//     katsastus_pvm: "2020-01-05",
//     voimassa_asti: "2024-01-05",
//     tulos: "Hyväksytty",
//     kilometrit: 8000,
//     huomiot: "Ei huomautettavaa",
//   },
// ];

function App() {
  // ajoneuvokirjasto

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #9fcdfa 0%, #ffffff 50%, #d8f7db 100%)",
        }}
      >
        <Stack direction="column" spacing={2}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<TabMUI />}>
                <Route index element={<AjoneuvotMUI />} />

                <Route path="/dashboard" element={<DashboardMUI />} />

                <Route path="/katsastukset" element={<KatsastuksetMUI />} />

                <Route
                  path="/ajoneuvontiedot/:id"
                  element={<AjoneuvoLomakeMUI />}
                />
                <Route path="/ajoneuvolomake" element={<AjoneuvoLomakeMUI />} />
                <Route
                  path="/katsastuslomake"
                  element={<KatsastusLomakeMUI/>}
                />
              </Route>
              <Route path="/virhe" element={<Virhe />} />
              <Route path="*" element={<Virhe virhe="Kyseistä sivua ei ole" />} />

            </Routes>
          </BrowserRouter>
        </Stack>

        {/* shift + alt + f on format dokument*/}
      </Box>
    </ThemeProvider>
  );
}

export default App;
