import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import './App.css';
import NavBar from './components/NavBar'
import theme from './theme'
import LocationGrid from './components/LocationGrid'
import {LocationAdd} from './components/NewLocation'
import SearchPanel from './components/google-maps/SearchPanel'
import Splash from "./pages/Splash"
import Graph from "./pages/Graphs"
import DarkSkyMap from "./components/DarkSkyMap"

import { ThemeProvider } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import PhoneIcon from '@material-ui/icons/Phone';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';

import {useAuth0} from "./react-auth0-wrapper";
import {RetrieveUserLocations} from './api/Post.js' 

require('dotenv').config();

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
} 

const MainApp = () => {

  const [tabValue, setTabValue] = useState(0)
  const [locationList, setLocationList] = useState([])
  const {loading, getTokenSilently, user} = useAuth0()
  
  const handleChange = (e, newValue) => {
    setTabValue(newValue)
  }

  const getLocationList = (setLocationList) => {
    RetrieveUserLocations(setLocationList, getTokenSilently, user).then(console.log(locationList))
  }

useEffect(() => {if(!loading){getLocationList(setLocationList)}}, [loading])
  
  return (

  <ThemeProvider theme={theme}>
  <div>
  <header>
   <NavBar/> 
   </header>

   <Tabs
        value={tabValue}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="black"
        aria-label="icon label tabs example"
        TabIndicatorProps={{style: {height: '4px'}}}
      >
      <Tab label="Locations" {...a11yProps(0)} />
        <Tab label="Graph View" {...a11yProps(1)} />
        <Tab label="Map View" {...a11yProps(2)} />
  </Tabs>
   
   <TabPanel value={tabValue} index={0} icon={<PhoneIcon />}>
   <LocationGrid locationList={locationList}/> 
   </TabPanel>

   <TabPanel value={tabValue} index={1} icon={<PhoneIcon />}>
   <Graph locationList={locationList}/>
   </TabPanel>
   
   <TabPanel value={tabValue} index={2} icon={<PhoneIcon />}>
   <DarkSkyMap url='<iframe src=https://maps.darksky.net/@temperature,39.000,-95.000,4 width="100%" height="800px"></iframe>'/>
   </TabPanel>

   </div>
   </ThemeProvider>

   )}

function About() {
  return <h2>About</h2>;
}


function AppRouter() {

  const {loading, isAuthenticated} = useAuth0()
  if (loading) {
  
    return (<div>Loading...</div>)}
  
    return (
    <Router>
      <div>
        {console.log(isAuthenticated)}
        <Route exact path="/"> {!isAuthenticated ? <Redirect to="/splash" /> : <MainApp />}</Route>
        <Route path="/about/" component={About} />
        <Route exact path="/splash/"> {isAuthenticated ? <Redirect to="/" /> : <Splash />}</Route>
        <Route path="/location/" component= {LocationAdd} /> 
        <Route path="/search/" component= {SearchPanel} />
      </div>
    </Router>
  );
}

export default AppRouter;

