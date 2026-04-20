import { useState } from "react";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

//Iconit

import CarRepairIcon from "@mui/icons-material/CarRepair";

import CreateIcon from "@mui/icons-material/Create";
import ListIcon from "@mui/icons-material/List";
import CarRentalIcon from "@mui/icons-material/CarRental";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import PieChartIcon from "@mui/icons-material/PieChart";

//Omat komponentit
import AjoneuvoLista from "../components/AjoneuvoLista";
import Ajoneuvohaku from "../components/Ajoneuvohaku";
import AjoneuvoLomake from "../components/AjoneuvoLomake";

import AjoneuvotMUI from "./AjoneuvotMUI";
import KatsastuksetMUI from "./KatsastuksetMUI";
import AjoneuvoLomakeMUI from "./AjoneuvoLomakeMUI";
import KatsastusLomakeMUI from "./KatsastusLomakeMUI";

import DashboardMUI from "./DashboardMUI";

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
          <Tab label="Dashboard" icon={<PieChartIcon />} />
          <Tab label="Ajoneuvot" icon={<DriveEtaIcon />} />
          <Tab label="Katsastukset" icon={<CarRepairIcon />} />
          <Tab label="Ajoneuvolomake" icon={<ListIcon />} />
          <Tab label="Katsastuslomake" icon={<ListIcon />} />
        </Tabs>
      </AppBar>
      <br />

      {value === 0 && <DashboardMUI katsastukset={katsastukset} ajoneuvot={ajoneuvot} />}
      {value === 1 && <AjoneuvotMUI ajoneuvot={ajoneuvot} katsastukset={katsastukset} />}
      {value === 2 && <KatsastuksetMUI katsastukset={katsastukset} ajoneuvot={ajoneuvot} />}
      {value === 3 && <AjoneuvoLomakeMUI />}
      {value === 4 && <KatsastusLomakeMUI ajoneuvot={ajoneuvot} />}

    </Box>
  );
}

export default TabMUI;
