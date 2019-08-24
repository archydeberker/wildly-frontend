import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import { blue } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import {Weather} from '../components/Location'
import Grid from '@material-ui/core/Grid'

export default function LocationDetail(props) {
  
  const { onClose, selectedValue, open, location, locationMap } = props;

  function handleClose() {
    onClose(selectedValue);
  }

  function handleListItemClick(value) {
    onClose(value);
  }

  let locationName = location
  const mapUrl = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2841.418727285506!2d-72.7921830844305!3d44.588460479100206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cb58d52c5aa9bd3%3A0x67d3bc866eef2ca3!2sSmugglers&#39;+Notch+Resort!5e0!3m2!1sen!2sit!4v1566562735500!5m2!1sen!2sit" width="400" height="300" frameborder="0" style="display: flex; align-items: center; justify-content: center;" allowfullscreen></iframe>'
    return (
      <div>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} fullWidth='true' maxWidth='lg'>
      <DialogTitle id="simple-dialog-title">{locationName}</DialogTitle>
      <Card style={{width: '100%', height: '50%'}}>
      <CardMedia style={{width: '100%', height: '100%'}}>
      <Grid container spacing={3} flexDirection='row' wrap='nowrap'>
      {location ? (

          <Weather id={location} type='weather-detailed' url={locationMap[location]['detailedWeather']} />

  
          )
           : 'Nothing'},
      {location ? (

               <Weather id={location} type='map' url={mapUrl}/>

          )
           : 'Nothing'}
       </Grid>
      </CardMedia>
      </Card>
      </Dialog>
      </div>
      );
  }