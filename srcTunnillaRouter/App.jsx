//import Matka from "./components/Matka";
//import Kappale from "./components/Kappale";
//import Matkalista from "./components/Matkalista";
//import MatkalistaHaku from "./components/MatkalistaHaku";
//import Matkalomake from "./components/Matkalomake";
//import Saa from "./components/Saa";
//import Kysymyslista from "./components/Kysymyslista";
//import Pokemon from "./components/Pokemon";

//import MatkakorttiMUI from "./MUI/MatkakorttiMUI";
//import MatkalistaMUI from "./MUI/MatkalistaMUI";
//import MatkalomakeMUI from "./MUI/MatkalomakeMUI";

import MatkalomakeEditMUI from './MUI/MatkalomakeEditMUI';

import MatkalistaMUI from './MUI/MatkalistaMUI';
import MatkalomakeMUI from './MUI/MatkalomakeMUI';
import SaaMUI from './MUI/SaaMUI';
import MatkaChartMUI from './MUI/MatkaChartMUI';

import { BrowserRouter, Routes, Route } from 'react-router';
import EtusivuMUI from './MUI/EtusivuMUI';
import Virhe from './MUI/Virhe';



import DrawerMUI from "./MUI/DrawerMUI";
import MenuMUI from "./MUI/MenuMUI";
import TabMUI from "./MUI/TabMUI";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Menu } from '@mui/material';
import { grey } from '@mui/material/colors';

import '@fontsource/caveat';

const matka = {
  id: 1,
  otsikko: 'Lomalla',
  paiva: '2026-05-25',
  paikka: 'Lohja',
  saa: 'Aurinkoista, 20',
  kuvaus: 'Lomalla Lohjalla',
  kuva: 'kuvia/tammi.PNG'
};

const matkat = [
  {
    id: 1, otsikko: 'Lomalla',
    paiva: '2026-05-26', paikka: 'Lohja',
    saa: 'Aurinkoista, 10',
    kuvaus: 'Lomalla Lohjalla',
    kuva: 'kuvia/tammi.PNG',
    arvio: 4,
  },
  {
    id: 2, otsikko: 'Mökillä',
    paiva: '2026-06-08', paikka: 'Savonlinna',
    saa: 'Aurinkoinen, 21',
    kuvaus: 'Mökillä Itä-Suomessa',
    kuva: 'kuvia/lumpeet.PNG',
    arvio: 2,
  },
  {
    id: 3, otsikko: 'Sukuloimassa',
    paiva: '2026-05-20', paikka: 'Vantaa',
    saa: 'Pilvinen, 9',
    kuvaus: 'Kahvihetki',
    kuva: 'kuvia/kakku.jpg',
    arvio: 5,
  }
];

/* const theme = createTheme({

  palette: {
    primary: { main: grey[900], contrastText: '#FFFFFF' },
    secondary: { main: grey[400], contrastText: '#FFFFFF' },
    text: { primary: grey[900], secondary: grey[500] },
  },

  typography: {
    fontFamily: '"caveat", serif',
  },

  components: {

    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: 'red',
          height: '4px'
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          '&.Mui-selected': {
            color: 'red',
          },
        }, // root
      },
    }, // MuiTab

    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: grey[900],
          color: 'white'
        },
      },
    }, // MuiMenu

    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'white'
        },
      },
    }, // MuiListItemIcon

    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: grey[200],
            color: grey[900],
            '& .MuiListItemIcon-root': {
              color: grey[900],
            },
          },
        }, // root
      },
    }, //MuiMenuItem

  } // components
}); // theme */

const theme = createTheme({

  palette: {
    primary: { main: grey[900], contrastText: grey[100] },
    secondary: { main: grey[400], contrastText: grey[100] },
    text: { primary: grey[900], secondary: grey[500] },
  },

  typography: {
    fontFamily: '"caveat", serif'
  },

  components: {

    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: 'red',
          height: '4px',
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          '&.Mui-selected': {
            color: 'red'
          },
        }, // root
      },
    },

    MuiMenu: {
      styleOverrides: {
        paper: ({ theme }) => ({
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }),
        /*
         paper: {
          backgroundColor: grey[900],
          color: grey[100]
        },
        }),
        */
      },
    },

    MuiListItemIcon: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.contrastText,
        })
        /*
        root: {
          color: grey[100]
        },
        */
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          '&:hover': {
            backgroundColor: theme.palette.primary.contrastText,
            color: theme.palette.primary.main,
            '& .MuiListItemIcon-root': {
              color: theme.palette.primary.main,
            },
          },
        }),
        /*
        root: {
          '&:hover': {
            backgroundColor: grey[100],
            color: grey[900],
            '& .MuiListItemIcon-root': {
              color: grey[900],
            },
          },
        },
        */
      },
    },

  } // components
}); // theme


function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* 
      <Matka data={matka} paiva={'21.1.2026'} /> 
      <Matkalomake />
      <MatkalistaHaku matkat={matkat} />
      <Matkalista matkat={matkat} />
      <Kappale />
      
      <Pokemon />
      <Kysymyslista />
      <Saa />
      */}

        {/* 
        <MatkakorttiMUI matka={matka} /> 
        
      <MatkalistaMUI matkat={matkat} />
      <MatkalomakeMUI />
       <TabMUI matkat={matkat} />
        <DrawerMUI />
       
      */}
        {/* <TabMUI matkat={matkat} /> */}
      <menuMUI />

      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <MenuMUI /> } >
          <Route index element={ <EtusivuMUI /> } />
          <Route path='lisaa' element={<MatkalomakeMUI />} />
          <Route path='listaa' element={ <MatkalistaMUI matkat={matkat}/> } />
          <Route path='muokkaa/:id' element={ <MatkalomakeEditMUI matkat={matkat}/> } />
          <Route path='saa' element={ <SaaMUI /> } />
          <Route path='kaavio' element={ <MatkaChartMUI matkat={matkat}/> } />
          <Route path= '/virhe' element={ <Virhe /> } />
          <Route path='*' element={ <Virhe virhe='Kyseistä sivua ei ole' />} />
          </Route>
        </Routes>
      </BrowserRouter>
              

        
      </ThemeProvider>
    </>
  )
}

export default App
