import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { Link } from 'react-router';

function MatkakorttiMUI({ matka }) {
    let pvm = new Date(matka.paiva);
    pvm = pvm.toLocaleDateString('fi-FI');

    return (
        <Card sx={{ width: 230 }}>
            <CardHeader title={matka.otsikko} subheader={pvm} />

            <CardContent>
                {
                    matka.kuva ?
                        <CardMedia sx={{ height: 100 }} component='img' image={matka.kuva} alt={matka.otsikko} />
                        :
                        <CardMedia sx={{ height: 100 }} component='img' image={'kuvia/eiKuvaa.png'} alt={'Ei kuvaa'} />
                }

                <Typography sx={{ mt: 1 }}>{matka.paikka}</Typography>
                <Typography>{matka.saa}</Typography>
                <Typography>{matka.kuvaus}</Typography>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <IconButton color='primary' component={Link} to={'/muokkaa/' + matka.id}><EditIcon />
                </IconButton>

                <IconButton color='secondary'><DeleteIcon /></IconButton>
            </CardActions>
        
        </Card>
    );
}

export default MatkakorttiMUI;