import { useState, useMemo } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

import CreateIcon from '@mui/icons-material/Create';
import ClearIcon from '@mui/icons-material/Clear';
import AttachmentIcon from '@mui/icons-material/Attachment';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import fi from 'date-fns/locale/fi';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { useParams } from 'react-router';
//import { useLocation } from 'react-router';

import { useEffect } from 'react';
import { useNavigate } from 'react-router';

//import Virhe from './Virhe';

function MatkalomakeEditMUI({ matkat }) {

  // Kun käytetään uudelleenohjausta
  //const location = useLocation();
  //let { id } = location.state || {};

  // Otetaan reitityksessä tullut parametri
  let { id } = useParams();

  // Muutetaan se numeeriseksi ja etsitään propsina tulleesta taulukosta
  id = Number(id);
  let etsitty = matkat.find((matka) => matka.id === id);

  // Jos id:llä olevaa matkaa ei ollut taulukossa
  const navigate = useNavigate();

  useEffect(() => {
    if (!etsitty) {
      navigate('/virhe', {
        replace: true, 
        state: { virheviesti: 'Kyseistä matkaa ei ole' }
      })
    }
  }, [etsitty, navigate]);

  // Tarvitaan, koska ehdollisesti siirrytään kesken pois yllä (navigate)
  if (!etsitty) {
    return null;
  }

  const [matka, setValues] = useState({
    id: id,
    otsikko: etsitty.otsikko,
    paiva: new Date(etsitty.paiva),
    paikka: etsitty.paikka,
    saa: etsitty.saa,
    kuvaus: etsitty.kuvaus,
    arvio: etsitty.arvio,
    // KUVAA EI PÄIVITETÄ
    kuva: []
  });

  const [viesti, setViesti] = useState('');

  // Funktio, jolla muutetaan tilaa
  const muuta = (e) => {
    setValues({
      ...matka,
      [e.target.name]: e.target.value
    });
  };

  const muutaSuurella = (e) => {
    setValues({
      ...matka,
      [e.target.name]: e.target.value
    });
  };

  const muutaKuva = (e) => {
    setValues({
      ...matka,
      kuva: e.target.files[0]
    });
  }

  const muutaPaiva = date => {
    setValues({
      ...matka,
      paiva: date
    });
  };

  // Funktio painikkeen painallukselle
  const muutaMatka = () => {
    setViesti('Muutosta ei tulla tekemään backiin seuraavassa osassa');
  }

  const tyhjenna = () => {
    setValues({
      otsikko: '',
      paiva: new Date(),
      paikka: '',
      saa: '',
      kuvaus: '',
      kuva: []
    });
  }

  let kuvaNimi = '';
  if (matka.kuva !== null) {
    kuvaNimi = matka.kuva.name;
  }

  const [error, setError] = useState(null);

  const errorMessage = useMemo(() => {
    switch (error) {
      case 'maxDate': {
        return 'Päivämäärä on liian suuri';
      }

      case 'minDate': {
        return 'Päivämäärä on liian pieni';
      }

      case 'invalidDate': {
        return 'Päivämäärä on virheellinen';
      }

      case 'disablePast': {
        return 'Päivämäärä ei voi olla menneisyydessä';
      }

      case 'disableFuture': {
        return 'Päivämäärä ei voi olla tulevaisuudessa';
      }

      default: {
        return '';
      }
    }
  }, [error]);

  const getPaivamaara = (maara) => {
    let paivamaara = new Date();

    paivamaara.setDate(paivamaara.getDate() - maara);

    return paivamaara;
  }


  return (
    <Paper sx={{ padding: '10px', margin: '10px' }}>

      <Box component='form' autoComplete='off'
        sx={{ '& .MuiTextField-root': { marginBottom: 2 } }}>

        <TextField label='Otsikko' name='otsikko' id='otsikko' value={matka.otsikko}
          onChange={muutaSuurella} required fullWidth
          autoFocus />

        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
          <DesktopDatePicker
            /*   Koska objektitaulukosta tulee päivämäärät tulevaisuudesta
              maxDate={getPaivamaara(-1)}
              minDate={getPaivamaara(365)}
              onError={(virhe) => setError(virhe)} 
            */
            slotProps={{
              textField: {
                helperText: errorMessage,
                label: 'Päivä'
              },
            }}

            onChange={(e) => muutaPaiva(e)}
            name='paiva'
            value={matka.paiva}
            sx={{ width: '100%', mb: 2 }}
          />
        </LocalizationProvider>

        <TextField label='Paikka' name='paikka' id='paikka' value={matka.paikka}
          onChange={muuta} required fullWidth sx={{ marginTop: 2 }} />

        <TextField label='Sää' name='saa' id='saa' value={matka.saa}
          onChange={muuta} required fullWidth />

        <TextField label='Kuvaus' name='kuvaus' id='kuvaus' value={matka.kuvaus}
          onChange={muuta} multiline rows='4' fullWidth />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography display='inline' sx={{ position: 'relative', top: -2 }}>Arvio</Typography>
          <Rating
            name='arvio'
            value={matka.arvio ?? 0}
            onChange={(event, arvo) => {
              setValues({ ...matka, arvio: arvo });
            }}
          />
        </Box>

        <Typography sx={{ display: 'inline' }}>Kuva</Typography>
        <Button component='label' startIcon={<AttachmentIcon />}>
          <input accept='image/*' name='kuva' type='file'
            onChange={(e) => muutaKuva(e)} hidden />
        </Button>
        <Typography sx={{ display: 'inline' }}>{kuvaNimi} Kuvaa ei päivitetä</Typography>

        <Box sx={{ textAlign: 'center' }}>
          <Button onClick={() => muutaMatka()} variant='contained' color='primary' sx={{ marginRight: 3 }}><CreateIcon />Muokkaa</Button>
          <Button onClick={() => tyhjenna()} variant='contained' color='secondary'><ClearIcon />Tyhjennä</Button>
        </Box>
      </Box>

      <Typography sx={{ marginTop: 3 }}>{viesti}</Typography>
    </Paper>
  );
}

export default MatkalomakeEditMUI;
