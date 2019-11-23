import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";

import './App.css';
import {LocationAdd} from './components/NewLocation'
import SearchPanel from './components/google-maps/SearchPanel'

import SignUp from './pages/SignUp'
import { MainApp } from './pages/MainApp';
import Splash from "./pages/Splash"

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import {CheckOnboarding} from './api/Post'
import {useAuth0} from "./react-auth0-wrapper";

require('dotenv').config();

export function TabPanel(props) {
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


export function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
} 


function AppRouter() {

  const {loading, isAuthenticated, getTokenSilently, user} = useAuth0()
  const [isOnboarded, setOnboarded] = useState()
  
  useEffect(() => {
    if (!loading) {
      CheckOnboarding(setOnboarded, getTokenSilently, user);
      // return (<div height='100vh' style={{verticalAlign:'middle', display:'block',
      //                                                 position: 'absolute', top: '50%', left: '50%'}}>
      //                                                   <CircularProgress color='primary'/></div>)
    }
  }, [loading]);

  if (loading) {
    return (<div height='100vh' style={{verticalAlign:'middle', display:'block',
                                                      position: 'absolute', top: '50%', left: '50%'}}>
                                                        <CircularProgress color='primary'/></div>)}

  
    return (
    <Router>
      <div>
        <Route exact path="/"> {!isAuthenticated ? <Redirect to="/splash" />: <MainApp isOnboarded={isOnboarded} setOnboarded={setOnboarded}/>}</Route>
        <Route exact path="/splash"> {isAuthenticated ? <Redirect to="/" /> : <Splash />}</Route>
        <Route path="/location" component= {LocationAdd} /> 
        <Route path="/search" component= {SearchPanel} />
      </div>
    </Router>
  );
}

export default AppRouter;

