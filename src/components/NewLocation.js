import React, {Component} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase';
import Chip from '@material-ui/core/Chip';
import Iframe from '@material-ui/core/Chip';
import postscribe from 'postscribe';
import Grid from '@material-ui/core/Grid'
import AddCircle from '@material-ui/icons/AddCircle'

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

import Input from '@material-ui/core/Input';
import Terrain from '@material-ui/icons/Terrain';
import Toolbar from '@material-ui/core/Toolbar';
import Select from 'react-select';
import activities from '../data/activities'


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

  function handleClose() {
    onClose();
  }

    return (
     <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add new location</DialogTitle>
        <DialogContent style={{paddingBottom:'20%', minWidth: 500}}>
 
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Location"
            type="email"
            icon='search'
            fullWidth
            InputProps={{
            	startAdornment: (
            		<InputAdornment position="start">
            		<Terrain />
            		</InputAdornment>
            		),
            }}
          />
          <InputLabel shrink color='primary' style={{paddingTop: 25}}>
          Activities
          </InputLabel>
          <Select
          isMulti
          name="colors"
          label="activities"
          options={activities}
          className="basic-multi-select"
          classNamePrefix="select"
          style={{paddingTop: 200}}
          />


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
