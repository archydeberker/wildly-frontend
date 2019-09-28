import React from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import {Weather} from '../components/Location'
import Grid from '@material-ui/core/Grid'


export default function LocationDetail(props) {
  
  const { onClose, selectedValue, open, location, locationMap } = props;

  function handleClose() {
    onClose(selectedValue);
  }

  let locationName = location
    return (
      <div>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} fullWidth='true' maxWidth='lg'>
      <DialogTitle id="simple-dialog-title">{locationName}</DialogTitle>
      <Card style={{width: '100%', height: '50%'}}>
      <CardMedia style={{width: '100%', height: '100%'}}>
      <Grid container spacing={3} flexDirection='row' wrap='nowrap'>
      {location ? (
          <Weather id={location} type='Weather' url={locationMap[location]['detailedWeather']} />
          )
           : 'Nothing'},
      {location ? (    
               <Weather id={location} type='Map' url={locationMap[location]['mapUrl']}/>
          )
           : 'Nothing'}
       </Grid>
      </CardMedia>
      </Card>
      </Dialog>
      </div>
      );
  }