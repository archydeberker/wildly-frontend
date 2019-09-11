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
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ExternalAPI from '../components/ExternalAPI'

export default function AccountDetails(props) {
  
  const {open, setOpen, userID, onLogout} = props
  fetch('http://127.0.0.1:5000/ping').then(results => console.log(results.json()))
  console.log(setOpen)  
  return (
      <div>
      <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={() => {console.log('closing'); setOpen(false) }} fullWidth='false' maxWidth='sm'>
      <DialogTitle id="simple-dialog-title">Account Details</DialogTitle>
      <Card>
      <CardContent>
      <Grid> 
      Logged in user is {userID}
      </Grid>
      <Grid>
      <ExternalAPI/>
      </Grid>
      <Grid>
      <Button variant='contained' color='primary' onClick={() => onLogout()} style={{marginTop: 20}}> Logout </Button>
      </Grid>
      </CardContent>
      </Card>
      </Dialog>
      </div>
      );
  }