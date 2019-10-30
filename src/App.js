import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import './App.css';
import NavBar from './components/NavBar'
import theme from './theme'
import LocationGrid from './components/LocationGrid'
import {LocationAdd} from './components/NewLocation'
import SearchPanel from './components/google-maps/SearchPanel'
import SignUp from './pages/SignUp'


import Splash from "./pages/Splash"
import Graph from "./pages/Graphs"
import WeatherComparison from './pages/Comparison'

import { ThemeProvider } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import PhoneIcon from '@material-ui/icons/Phone';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import CircularProgress from '@material-ui/core/CircularProgress';

import {useAuth0} from "./react-auth0-wrapper";
import {RetrieveUserLocations} from './api/Post.js' 
import { GetWeatherForecast } from './api/GetWeatherForecast';


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

  const [weatherData, setWeatherData] = useState(null)
  let  locations = locationList.map((location) => {return({name: location['name'],
                                                          long: location['long'],
                                                          lat: location['lat']})})

  useEffect(() => {if(!loading){getLocationList(setLocationList)}}, [loading])
  useEffect(() => {if(locationList.length > 0){GetWeatherForecast(locations, setWeatherData)}}, [locationList])
  
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
      <Tab label="Your Locations" {...a11yProps(0)} />
      <Tab label="Rain Graph" {...a11yProps(1)} />
      <Tab label="Compare Weather" {...a11yProps(2)} />

  </Tabs>
   
   <TabPanel value={tabValue} index={0} icon={<PhoneIcon />}>
   <LocationGrid locationList={locationList} getLocationList={getLocationList} setLocationList={setLocationList}/> 
   </TabPanel>

   <TabPanel value={tabValue} index={1} icon={<PhoneIcon />}>
   <Graph locationList={locationList}/>
   </TabPanel>

   <TabPanel value={tabValue} index={2} icon={<PhoneIcon />}>
   <WeatherComparison weatherData={weatherData}/>
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
  
    return (<div height='100vh' style={{verticalAlign:'middle', display:'block',
                                                      position: 'absolute', top: '50%', left: '50%'}}>
                                                        <CircularProgress color='primary'/></div>)}
  
    return (
    <Router>
      <div>
        {console.log(isAuthenticated)}
        <Route exact path="/"> {!isAuthenticated ? <Redirect to="/splash" /> : <MainApp />}</Route>
        <Route path="/about/" component={About} />
        <Route exact path="/splash/"> {isAuthenticated ? <Redirect to="/" /> : <Splash />}</Route>
        <Route path="/location/" component= {LocationAdd} /> 
        <Route path="/search/" component= {SearchPanel} />
        <Route path="/signup/" component= {SignUp} />
      </div>
    </Router>
  );
}

export default AppRouter;

