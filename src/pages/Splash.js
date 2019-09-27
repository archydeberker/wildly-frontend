import React from 'react';

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ReactRotatingText from 'react-rotating-text'
import { useAuth0 } from "../react-auth0-wrapper";

import '../assets/ReactRotatingText.css';


import { styled } from '@material-ui/styles';


const styles = {
    paperContainer: {
        backgroundImage: 'url(https://source.unsplash.com/2000x1200/?mountains)',
        height: '100vh',
        width: '100vw',
        // opacity: '0.5',
        'tintColor': 'rgba(255,255,255,1)'
    }
};



export default function Splash(){
        
        const { loading, isAuthenticated, loginWithRedirect, signupWithPopup, logout, user } = useAuth0();        

        return(
            <div>
            <Paper style={styles.paperContainer}>
            <Paper style={{'backgroundColor': 'rgba(255,255,255,0.5)',
            'height': '100vh',
            'paddingTop': '30vh'}}>

            <Grid container alignItems="center" justify="center" direction="row" spacing={3}>
            <Grid item>
                <Typography variant='h1' xs={12} style={{marginBottom: '20px', fontWeight: 'bold'}}> Wildly </Typography> 
            </Grid>
            <Grid container alignItems="center" justify="center" direction="row" spacing={3}>
            <Grid item>
                <Typography variant='h4' xs={12}> Get out  and  <ReactRotatingText items={['climb', 'paddle', 'hike', 'ski', 'swim', 'snowshoe', 'raft', 'bike', 'run', 'camp']} /> </Typography> 
            </Grid>
            <Grid container alignItems="center" justify="center" direction="row" spacing={3} style={{marginTop:'20px'}}>
            <Grid item> <Button color='primary' variant='contained'> Sign Up </Button> </Grid>
            <Grid item> <Button onClick={() => signupWithPopup({})} variant='contained'> Sign In </Button> </Grid>
            </Grid>
            </Grid>
            <Grid item>

            </Grid>
            

            </Grid>

            </Paper>
            </Paper>
            </div>   
            )
    }