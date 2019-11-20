import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import NavBar from '../components/NavBar';
import theme from '../theme';
import LocationGrid from '../components/LocationGrid';
import Graph from "./Graphs";
import WeatherComparison from './Comparison';
import { ThemeProvider } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import PhoneIcon from '@material-ui/icons/Phone';
import Tab from '@material-ui/core/Tab';
import { useAuth0 } from "../react-auth0-wrapper";
import { RetrieveUserLocations } from '../api/Post.js';
import { GetWeatherForecast } from '../api/GetWeatherForecast';
import { checkOnboarding as getOnboarding } from '../api/Post';
import { a11yProps, TabPanel } from '../App';

export const MainApp = () => {
  const [tabValue, setTabValue] = useState(0);
  const [locationList, setLocationList] = useState([]);
  const { loading, getTokenSilently, user } = useAuth0();
  const [isOnboarded, setOnboarded] = useState(false);


  const [weatherData, setWeatherData] = useState(null);
  const handleChange = (e, newValue) => {
    setTabValue(newValue);
  };
  
  const getLocationList = (setLocationList) => {
    RetrieveUserLocations(setLocationList, getTokenSilently, user).then(console.log(locationList));
  };
  

  let locations = locationList.map((location) => {
    return ({
      name: location['name'],
      long: location['long'],
      lat: location['lat']
    });
  });
  
  const checkOnboarding = (setOnboarded) => { getOnboarding(setOnboarded, getTokenSilently, user); };
  
  useEffect(() => {  checkOnboarding(setOnboarded); }, []);
  useEffect(() => {
    if (!loading) {
      getLocationList(setLocationList);
    }
  }, [loading]);

  useEffect(() => {
    if (locationList.length > 0) {
      GetWeatherForecast(locations, setWeatherData);
    }
  }, [locationList]);
  
  if (!isOnboarded) {return <Redirect to='/signup'/>}
  return (<ThemeProvider theme={theme}>
    <div>
      <header>
        <NavBar />
      </header>

      <Tabs value={tabValue} onChange={handleChange} variant="fullWidth" indicatorColor="secondary" textColor="black" aria-label="icon label tabs example" TabIndicatorProps={{ style: { height: '4px' } }}>
        <Tab label="Your Locations" {...a11yProps(0)} />
        <Tab label="Rain Graph" {...a11yProps(1)} />
        <Tab label="Compare Weather" {...a11yProps(2)} />

      </Tabs>

      <TabPanel value={tabValue} index={0} icon={<PhoneIcon />}>
        <LocationGrid locationList={locationList} getLocationList={getLocationList} setLocationList={setLocationList} />
      </TabPanel>

      <TabPanel value={tabValue} index={1} icon={<PhoneIcon />}>
        <Graph locationList={locationList} />
      </TabPanel>

      <TabPanel value={tabValue} index={2} icon={<PhoneIcon />}>
        <WeatherComparison weatherData={weatherData} />
      </TabPanel>

    </div>
  </ThemeProvider>);
};
