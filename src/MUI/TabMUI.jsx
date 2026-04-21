import { useState } from "react";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

//Iconit
import CarRepairIcon from "@mui/icons-material/CarRepair";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import PieChartIcon from "@mui/icons-material/PieChart";

import { Link, Outlet } from "react-router";

function TabMUI({ ajoneuvot, katsastukset }) {
  const [value, setValue] = useState(0);

  const handleChange = (e, val) => {
    setValue(val);
  };

  return (
    <Box>
      <AppBar position="static">
        <Tabs
          value={value}
          variant="standard"
          textColor="inherit"
          onChange={(e, val) => handleChange(e, val)}
        >
          <Tab
            label="Dashboard"
            icon={<PieChartIcon />}
            component={Link}
            to="/"
          />
          <Tab 
          label="Ajoneuvot" 
          icon={<DriveEtaIcon />}
          component={Link}
          to="/ajoneuvot"
          />

          <Tab 
          label="Katsastukset" icon={<CarRepairIcon />} component={Link} to="/katsastukset" />
        </Tabs>
      </AppBar>
      <br />

      <Outlet />
    </Box>
  );
}

export default TabMUI;
