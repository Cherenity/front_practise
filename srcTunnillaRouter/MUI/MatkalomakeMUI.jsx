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

import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router';

function MatkalomakeMUI() {

  const navigate = useNavigate();

  const [matka, setValues] = useState({
    otsikko: '',
    paiva: new Date(),
    paikka: '',
    saa: '',
    kuvaus: '',
    kuva: []
  });

  const [viesti, setViesti] = useState('');

  const muuta = (e) => {
    setValues({
      ...matka,
      [e.target.name]: e.target.value
    });

    setViesti('');
  };

  const muutaSuurella = (e) => {
    setValues({
      ...matka,
      [e.target.name]: e.target.value.toUpperCase()
    });

    setViesti('');
  };

  const muutaKuva = (e) => {
    setValues({
      ...matka,
      kuva: e.target.files[0]
    });

    setViesti('');
  }

  const muutaPaiva = (e) => {
    setValues({
      ...matka,
      paiva: e
    });

    setViesti('');
  };

  const lisaaMatka = () => {

    setValues({
      otsikko: '',
      paiva: new Date(),
      paikka: '',
      saa: '',
      kuvaus: '',
      kuva: '',
      arvio: 0
    });

    setViesti('Lisättiin');
  }

  const tyhjenna = () => {

    setValues({
      otsikko: '',
      paiva: new Date(),
      paikka: '',
      saa: '',
      kuvaus: '',
      kuva: ''
    });

    setViesti('');
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
    <Paper sx={{ p: 1, m: 2 }}>

      <Box component='form' autoComplete='off'
        sx={{ '& .MuiTextField-root': { mb: 2 } }}>

        <TextField label='Otsikko' name='otsikko' value={matka.otsikko}
          onChange={(e) => muutaSuurella(e)} required fullWidth autoFocus />


        {/*  <TextField label='Päivä' name='paiva' value={matka.paiva}
          onChange={muuta} required fullWidth />
 */}
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
          <DesktopDatePicker
            maxDate={getPaivamaara(-1)}
            minDate={getPaivamaara(365)}
            onError={(virhe) => setError(virhe)}
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

        <TextField label='Paikka' name='paikka' value={matka.paikka}
          onChange={(e) => muuta(e)} required fullWidth />

        <TextField label='Sää' name='saa' value={matka.saa}
          onChange={(e) => muuta(e)} required fullWidth />

        <TextField label='Kuvaus' name='kuvaus' value={matka.kuvaus}
          onChange={(e) => muuta(e)} multiline rows='4' fullWidth />

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

        <Typography display='inline'>Kuva</Typography>

        <Button component='label' startIcon={<AttachmentIcon />}>
          <input accept='image/*' name='kuva' type='file'
            onChange={(e) => muutaKuva(e)} hidden />
        </Button>
        <Typography display='inline'>{kuvaNimi}</Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={() => lisaaMatka()} variant='contained' sx={{ marginRight: 3 }} startIcon={<CreateIcon />}>Lisää</Button>
          <Button onClick={() => tyhjenna()} variant='contained'sx={{ marginRight: 3 }} color='secondary' startIcon={<ClearIcon />}>Tyhjennä</Button>
          <Button onClick={() => navigate('/')} variant='contained' color='success' startIcon={<HomeIcon />}>Etusivulle</Button>
        </Box>

      </Box >

      <Typography sx={{ marginTop: 3 }}>{viesti}</Typography>
    </Paper >
  );
}

export default MatkalomakeMUI;
