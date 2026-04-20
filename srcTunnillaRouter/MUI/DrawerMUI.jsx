import { useState } from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import MenuIcon from '@mui/icons-material/Menu';
import CreateIcon from '@mui/icons-material/Create';
import ListIcon from '@mui/icons-material/List';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import PieChartIcon from '@mui/icons-material/PieChart';

function DrawerMUI() {

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Box>
      <AppBar position='static'>
        <Toolbar><IconButton onClick={() => handleOpen()} color='inherit'><MenuIcon /></IconButton>  </Toolbar>
      </AppBar>

      <Drawer anchor='left' open={open} onClick={() => handleClose()}>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon><CreateIcon /></ListItemIcon>
              <ListItemText primary='Lisää' />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon><ListIcon /></ListItemIcon>
              <ListItemText primary='Listaa' />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon><CloudQueueIcon /></ListItemIcon>
              <ListItemText primary='Sää' />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon><PieChartIcon /></ListItemIcon>
              <ListItemText primary='Tilasto' />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}

export default DrawerMUI;