import { useState } from 'react';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import CreateIcon from '@mui/icons-material/Create';
import ListIcon from '@mui/icons-material/List';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import PieChartIcon from '@mui/icons-material/PieChart';

import MatkalomakeMUI from './MatkalomakeMUI';
import MatkalistaMUI from './MatkalistaMUI';
import SaaMUI from './SaaMUI';
import MatkaChartMUI from './MatkaChartMUI';

function TabMUI({ matkat }) {

  const [value, setValue] = useState(0);

  const handleChange = (e, val) => {
    setValue(val);
  }

  return (
    <Box>
      <AppBar position='static'>
        <Tabs value={value} variant='fullWidth' textColor='inherit'
          onChange={(e, val) => handleChange(e, val)}>
          <Tab label='Lisää' icon={<CreateIcon />} />
          <Tab label='Listaa' icon={<ListIcon />} />
          <Tab label='Sää' icon={<CloudQueueIcon />} />
          <Tab label='Tilasto' icon={<PieChartIcon />} />
        </Tabs>
      </AppBar>
      {value === 0 && <MatkalomakeMUI />}
      {value === 1 && <MatkalistaMUI matkat={matkat} />}
      {value === 2 && <SaaMUI />}
      {value === 3 && <MatkaChartMUI matkat={matkat} />}
    </Box>
  );
}

export default TabMUI;
