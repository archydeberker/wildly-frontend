import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

import SearchPanel from '../components/google-maps/SearchPanel'
import { Grid, Paper } from '@material-ui/core';
import CreatableSelect from 'react-select/creatable';
import InputLabel from '@material-ui/core/InputLabel'
import MapView from '../components/google-maps/MapView'

import {getLocations} from '../api/Get'
import {AddUser} from '../api/Post'

import RecommendedLocations from '../components/RecommendedLocations';
import distance from '../helpers/distance'

import { useAuth0 } from "../react-auth0-wrapper";

const styles = {
  paperContainer: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1468571452166-b089f160f1c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1510&q=80)',
    height: '100vh',
    width: '100vw',
  },
}
const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
    paddingLeft: '5%'
  },
  backButton: {
    marginRight: theme.spacing(1),
    marginLeft: '40%',
    align: 'bottom'
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const extractLngLat = (location) => {
  return location ? {lat: location[0].geometry.location.lat(),
          lng: location[0].geometry.location.lng()}:
          {lat: 45.95, lng: -73.33}
}

function UserInfo(setLocation, setActivities) {

    const activities = ['climb', 'run', 'hike', 'paddle', 'camp'].map(input => ({label:input, value: input}))
    return  <>
            <Grid item  xs={12}> 
                <div style={{height:'300px', paddingBottom: '80px'}}>
                     <SearchPanel label='Where do you live?' placeholder='Montreal, QC' onSelect={setLocation}/></div> </Grid> 
                <Grid item  xs={12}>
                <InputLabel shrink color='primary' style={{paddingTop: 25}}>
          What do you like to do outdoors?
          </InputLabel>
                <CreatableSelect
                    isMulti
                    label="activities"
                    options={activities}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(value)=>setActivities(value)}
                    style={{paddingTop: 200}}
          /> 
          </Grid>
          </>

}

const calcDistance = (a, b) => {
  return(distance(a.lat, a.lng, b.lat, b.lng).toFixed(0))}

function intersection(array1, array2) {
  return (array1.filter(value => -1 !== array2.indexOf(value)))
  }
  
const SuggestedLocations = (props) => {
  const distanceThreshold = 1000
  let {userLocation, locationList, activities, setChosen} = props

  locationList = locationList.map(entry => entry.value)
  let data =locationList.map(loc => ({name: loc.name, 
                                      distance: calcDistance({lat: loc.lat, lng:loc.long}, extractLngLat(userLocation)),
                                      activities: loc.activities,
                                      latitude: loc.lat,
                                      longitude: loc.long}))

  let recommendations = data.filter(location =>  intersection(activities.map(option => option.value), location.activities).length > 0)
  recommendations = recommendations.filter(location => location.distance < distanceThreshold)

  const filteredLocations = locationList.filter(location => recommendations.map(r => r.name).includes(location.name))

  return (<>
    <Grid item xs={12}>
    </Grid>
    <Grid item  xs={12}> 
      <MapView locationList={filteredLocations} height='300px' center={extractLngLat(userLocation)}/>
    </Grid>
    <Grid item  xs={12}> 
    <RecommendedLocations data={recommendations} setChosen={setChosen}/>
    </Grid>
  </>)
}

function getSteps() {
  return ['About you', 'Suggested locations'];
}

function GetStepTitle(stepIndex) {
  switch (stepIndex) {
    case 0: 
      return"You're almost ready to get after it"
    case 1:
      return "Some locations you might like to add to Wildly"
  }
}
function GetStepContent(stepIndex, setUserHomeLocation, setLocations, setActivities, userLocation, activities, locationList) {
  
  switch (stepIndex) {
    case 0:
      return UserInfo(setUserHomeLocation, setActivities);
    case 1:
      return <SuggestedLocations location={userLocation} locationList={locationList} activities={activities} setChosen={setLocations}/>; 
    default:
      return 'Unknown stepIndex';
  }
}

export default function HorizontalLabelPositionBelowStepper(props) {

  const {setOnboarded} = props
  const {getTokenSilently, user} = useAuth0()
  const classes = useStyles();
  const steps = getSteps();


  const [activeStep, setActiveStep] = React.useState(0);
  const [userHomeLocation, setUserHomeLocation] = React.useState()
  const [userLocations, setLocations] = React.useState(null)
  const [userActivities, setActivities] = useState([])
  const [locationList, setLocationList] = useState([])

  useEffect(() => {getLocations(setLocationList)}, [])

  function handleFinish(){
    
    const location = {'name': (userHomeLocation[0].name ? userHomeLocation[0].name : userHomeLocation[0].vicinity),
                        'longitude': userHomeLocation[0].geometry.location.lng(),
                        'latitude': userHomeLocation[0].geometry.location.lat(),
                        'google_ref': userHomeLocation[0].place_id}

    const  data = {user:user,
                  home_location:location,
                  activities:userActivities,
                  locations:userLocations}

    AddUser(console.log, getTokenSilently, data)
    setOnboarded(true)
  }

  function handleNext(){
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Paper style={styles.paperContainer}>
    <Grid
        container
        spacing={16}
        direction="row"
        alignItems="center"
        justify="center"
        style={{paddingTop: '2vh'}}
        >
    <Grid item xs={6}>
    <Card style={{height: '95vh'}}>
    <div className={classes.root}>
    <Typography variant='h6' style={{textAlign:"center", paddingTop: '20px', paddingBottom: '20px'}}>{GetStepTitle(activeStep)}</Typography>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{GetStepContent(activeStep, setUserHomeLocation, setLocations, setActivities, userHomeLocation, userActivities, locationList)}</Typography>
          </div>
        )}
      </div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={activeStep === steps.length - 1 ? handleFinish:handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
    </div>
    </Card>
    </Grid>
    </Grid>
    </Paper>

  );
}
