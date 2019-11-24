import React, { useState, useEffect } from 'react';
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

import { a11yProps, TabPanel } from '../App';
import SignUp from './SignUp'
import Loading from '../components/Loading';
import Joyride from 'react-joyride';
import {blurbs} from '../data/tour'
import { AddLocationButton } from '../components/AddLocationButton';


export const MainApp = (props) => {
  const {isOnboarded, setOnboarded, hasToured, setHasToured} = props
  
  const [tabValue, setTabValue] = useState(0);
  const [locationList, setLocationList] = useState([]);
  const { loading, getTokenSilently, user } = useAuth0();
  const [weatherData, setWeatherData] = useState(null);

  const handleChange = (e, newValue) => {
    setTabValue(newValue);
  };
  
  const getLocationList = (setLocationList) => {
    RetrieveUserLocations(setLocationList, getTokenSilently, user);
  };

  const walkThroughCallback = (data) => {
    if (data.action === 'next' & data.index === 3)
      {setHasToured(true)}
  }
  
  
  let locations = locationList.map((location) => {
    return ({
      name: location['name'],
      long: location['long'],
      lat: location['lat']
    });
  });

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
  
  const steps = [
    {
      target: '.locations',
      content: blurbs['locations'],
      event: 'hover'
    },
    {
      target: '.rain_graph',
      content: blurbs['rain'],
      event: 'hover'
    },
    {
      target: '.compare',
      content: blurbs['weather'],
      event: 'hover'
    },
    {
      target: '.add-location',
      content: blurbs['new_location'],
      event: 'hover'
    },
  ]
  if (isOnboarded===false) {return <SignUp setOnboarded={setOnboarded}/>}

  if (isOnboarded) {return (<ThemeProvider theme={theme}>
    <div className='app'>
      <header>
        <NavBar />
      </header>

      <Tabs value={tabValue} onChange={handleChange} variant="fullWidth" indicatorColor="secondary" textColor="black" aria-label="icon label tabs example" TabIndicatorProps={{ style: { height: '4px' } }}>
        <Tab className='locations' label="Your Locations" {...a11yProps(0)} />
        <Tab className='rain_graph' label="Rain Graph" {...a11yProps(1)} />
        <Tab className='compare' label="Compare Weather" {...a11yProps(2)} />

      </Tabs>

      <TabPanel value={tabValue} index={0} icon={<PhoneIcon />}>
        <LocationGrid locationList={locationList} getLocationList={getLocationList} setLocationList={setLocationList}/>
      </TabPanel>

      <TabPanel value={tabValue} index={1} icon={<PhoneIcon />}>
        <Graph locationList={locationList} getLocationList={getLocationList} setLocationList={setLocationList}/>
      </TabPanel>

      <TabPanel value={tabValue} index={2} icon={<PhoneIcon />}>
        <WeatherComparison weatherData={weatherData} getLocationList={getLocationList} setLocationList={setLocationList}/>
      </TabPanel>
      <AddLocationButton setLocationList={setLocationList} getLocationList={getLocationList}/>
      {!hasToured && <Joyride steps={steps} continuous={true} locale={{back: 'Back', close: 'Close', last: 'Finish', next: 'Next', skip: 'Skip'}} callback={walkThroughCallback}/>}
    </div>
 
  </ThemeProvider>)}

  return (<Loading/>)
  
};
