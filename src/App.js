import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './App.css';
import NavBar from './components/NavBar'
import theme from './theme'
import { ThemeProvider } from '@material-ui/styles';

import Tabs from '@material-ui/core/Tabs';
import PhoneIcon from '@material-ui/icons/Phone';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import Script from 'react-load-script';


import LocationView from './pages/locationPage'
import SearchBox from './pages/testSearchbox'
import Splash from "./pages/Splash"

require('dotenv').config();

function createMarkup() {
  return {__html: 'https://darksky.net/widget/default-small/42.360082,-71.05888/us12/en.js?width=undefined&height=70&title=Full Forecast&textColor=333333&bgColor=FFFFFF&skyColor=333&fontFamily=Default&customFont=&units=us'};
}


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

class MainApp extends Component {
  constructor(){
    super()
    this.state = {tabValue: 0}
  }

  handleChange = (e, newValue) => {
    this.setState({tabValue: newValue})
  }



  render = () =>
{ return (

  <ThemeProvider theme={theme}>
  <div>
  <header>
   <NavBar/> 
   </header>

   <Tabs
        value={this.state.tabValue}
        onChange={this.handleChange}
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
  <TabPanel value={this.state.tabValue} index={0} icon={<PhoneIcon />}>
  <LocationView/> 
   </TabPanel>
   
   </div>
   </ThemeProvider>

   )}}

function About() {
  return <h2>About</h2>;
}


function AppRouter() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={MainApp} />
        <Route path="/about/" component={About} />
        <Route path="/splash/" component={Splash} />
        <Route path="/search/" component= {SearchBox}/ >
      </div>
    </Router>
  );
}

export default AppRouter;

