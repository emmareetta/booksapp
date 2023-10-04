import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CreateIcon from "@mui/icons-material/Create";
import ListIcon from "@mui/icons-material/List";
import HomeIcon from "@mui/icons-material/Home";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Link, Outlet } from "react-router-dom";


function TabMUI(props) {
  const [value, setValue] = useState(0);

  const handleChange = (e, val) => {
    setValue(val);
  };

  return (
    <Box sx={{ paddingBottom: "20px"}}>
      <AppBar position="static">
        <Toolbar>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
          
            sx={{ flexGrow: 1 }}
          >
            <Tab label="Etusivulle" 
            icon={<HomeIcon />} 
            component={Link} 
            to="/" 
            />
            <Tab
              label="Lisää uusi kirja"
              icon={<CreateIcon />}
              component={Link}
              to="add"
            />
            <Tab
              label="Kirjahylly"
              icon={<ListIcon />}
              component={Link}
              to="books"
            />

            
          </Tabs>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}

export default TabMUI;
