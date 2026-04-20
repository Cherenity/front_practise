import { useState } from 'react';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import MenuIcon from '@mui/icons-material/Menu';
import CreateIcon from '@mui/icons-material/Create';
import ListIcon from '@mui/icons-material/List';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import PieChartIcon from '@mui/icons-material/PieChart';

import HomeIcon from '@mui/icons-material/Home';
import { Link, Outlet } from 'react-router';

function MenuMUI() {

  const [anchorNavi, setOpenNavi] = useState(null);

  const menuOpen = (e) => {
    setOpenNavi(e.currentTarget);
  }

  const menuClose = () => {
    setOpenNavi(null);
  }

  const menu =
    <Menu
      anchorEl={anchorNavi}
      open={Boolean(anchorNavi)}
      onClose={() => menuClose()}
      anchorOrigin={{ vertical: 'center', horizontal: 'left' }}>

      <MenuItem onClick={menuClose} component={ Link } to='/'>
        <ListItemIcon><HomeIcon /></ListItemIcon>
        <ListItemText primary='Etusivu' />
      </MenuItem>

      <MenuItem onClick={() => menuClose()} component={ Link } to='/lisaa'>
        <ListItemIcon><CreateIcon /></ListItemIcon>
        <ListItemText primary='Lisää' />
      </MenuItem>

      <MenuItem onClick={() => menuClose()} component={ Link } to='/listaa'>
        <ListItemIcon><ListIcon /></ListItemIcon>
        <ListItemText primary='Listaa' />
      </MenuItem>

      <MenuItem onClick={() => menuClose()} component={ Link } to='/saa'>
        <ListItemIcon><CloudQueueIcon /></ListItemIcon>
        <ListItemText primary='Sää' />
      </MenuItem>

      <MenuItem onClick={() => menuClose()} component={ Link } to='/kaavio'>
        <ListItemIcon><PieChartIcon /></ListItemIcon>
        <ListItemText primary='Tilasto' />
      </MenuItem>

    </Menu>;

  return (
    <Box>
      <AppBar position='static'>
        <Toolbar>
          <IconButton onClick={(e) => menuOpen(e)} color='inherit'>
            <MenuIcon />
          </IconButton>

          {menu}

          <Typography variant='h5' component='h5' sx={{ flexGrow: 1, textAlign: 'center' }}>Matkat</Typography>

        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}

export default MenuMUI;
