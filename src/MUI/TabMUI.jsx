import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// ikonit
import CarRepairIcon from "@mui/icons-material/CarRepair";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import PieChartIcon from "@mui/icons-material/PieChart";

import { Link, Outlet, useLocation } from "react-router";

function TabMUI() {
  // haetaan nykyinen osoite selaimen osoiteriviltä
  const location = useLocation();

  // päätellään aktiivinen välilehti nykyisen osoitteen perusteella
  const haeTabArvo = () => {
    if (location.pathname === "/") {
      return "/";
    }

    if (location.pathname.startsWith("/katsastukset")) {
      return "/katsastukset";
    }

    if (location.pathname.startsWith("/dashboard")) {
      return "/dashboard";
    }

    return false;
  };
  // tabs-komponentin value tulee osoitteen perusteella
  const value = haeTabArvo();

  return (
    <Box>
      {/* yläpalkki, jonka sisällä välilehdet näytetään */}
      <AppBar position="static">
        {/* value määrittää, mikä välilehti on aktiivinen */}
        <Tabs value={value} variant="standard" textColor="inherit">
          {/* ajoneuvot-välilehti vie etusivulle */}
          <Tab
            label="Ajoneuvot"
            icon={<DriveEtaIcon />}
            component={Link}
            to="/"
            value="/"
          />

          {/* katsastukset-välilehti vie katsastukset-sivulle */}
          <Tab
            label="Katsastukset"
            icon={<CarRepairIcon />}
            component={Link}
            to="/katsastukset"
            value="/katsastukset"
          />

          {/* dashboard-välilehti vie dashboard-sivulle */}
          <Tab
            label="Dashboard"
            icon={<PieChartIcon />}
            component={Link}
            to="/dashboard"
            value="/dashboard"
          />
        </Tabs>
      </AppBar>

      <br />

      {/* outlet näyttää aktiivisen reitin komponentin */}
      <Outlet />
    </Box>
  );
}

export default TabMUI;
