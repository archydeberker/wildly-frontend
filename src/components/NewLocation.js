import React, {useState, useEffect} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import AddCircle from '@material-ui/icons/AddCircle'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useTheme } from '@material-ui/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Toolbar from '@material-ui/core/Toolbar';

import CreatableSelect from 'react-select/creatable';
import {getActivities} from '../api/Get'

import SearchPanel from '../components/google-maps/SearchPanel'
import { registerNewLocation } from '../api/AddLocation'
import {AddUserLocation} from '../api/Post.js' 


import { useAuth0 } from "../react-auth0-wrapper";

const NewLocation = (props) => {
    return(
        <div>
            <Card>
            <CardActionArea onClick={props.handleClickOpen} id='NewLocation'>
                <CardMedia style={{marginTop: '56.25%', width: '100%', height: '100%', alignContents: 'center'}}
                title='Add New Location'
				>
				<Toolbar>
				<div className='jss10' style={{flex: 0.5}} ></div>	
                <AddCircle color='primary' style={{fontSize:'5em'}}/>
                </Toolbar>
                </CardMedia>
                
                <CardContent style={{width: '100%', height: '100%'}}>
                <Typography gutterBottom variant="headline" component="h2">
                    Add a new location
                </Typography>

                </CardContent>  
                <CardActions>
                </CardActions>
                </CardActionArea>
            </Card>

        </div>
    )
}

function LocationAdd(props) {
  
  const {handleClickOpen, onClose, open} = props;
  const [currLocation, setLocation] = useState([])
  const [selectedActivities, setActivities] = useState([])
  const [activities, setAllActivities] = useState([])
  const {getTokenSilently, user} = useAuth0()

  function onSelect(places) {
    const new_location = places.pop()
    console.log(new_location)
    const location = {'name': (new_location.name ? new_location.name : new_location.vicinity),
                      'longitude': new_location.geometry.location.lng(),
                      'latitude': new_location.geometry.location.lat(),
                              }

    setLocation(location)
    console.log(location)

  }

  useEffect(() =>
  // code to run on component mount
    getActivities(setAllActivities), []
  )

  function handleClose() {
    currLocation.activities = selectedActivities
    AddUserLocation(input => onClose, getTokenSilently, {'location': currLocation, 'user': user})
    onClose()
  }

   const customTheme = useTheme()

    return (
     <div>
      <Dialog style={{ overflowY: 'visible' }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add new location</DialogTitle>
        <DialogContent style={{paddingBottom:'5%', minWidth: 500,  overflowY: 'visible'}}>
        <div style={{height: '300px'}} ><SearchPanel onSelect={onSelect}/> </div>
          <div style={{paddingTop: '70px'}}>
          <InputLabel shrink color='primary' style={{paddingTop: 25}}>
          What do you like to do there?
          </InputLabel>
            <CreatableSelect
          isMulti
          label="activities"
          options={activities}
          className="basic-multi-select"
          classNamePrefix="select"
          style={{paddingTop: 200}}
          onChange={(value) => setActivities(value)}
          theme={theme => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: customTheme.palette.primary.main,
            }})}
          />
        </div>
        
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  }

export {NewLocation, LocationAdd}