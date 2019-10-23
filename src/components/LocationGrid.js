import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import Location from '../components/Location'
import Fab from '@material-ui/core/Fab';

import LocationDetail from '../components/LocationDetail'
import Entry from '../data/locations'
import {LocationAdd} from '../components/NewLocation'
import AddIcon from '@material-ui/icons/Add';
import { Typography } from '@material-ui/core';


function LocationGrid(props){

    let locationList = props.locationList
    let getLocationList = props.getLocationList
    let setLocationList = props.setLocationList
    

    const [locations, setLocations] = useState([])

    const [searchString, setSearchString] = useState('')
    const [open, setOpen] = useState(false)
    const [locationMap, setLocationMap] = useState({})
    const [selectedCard, setSelectedCard] = useState('')
    const [locationAddOpen, setLocationAddOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState(0)


    const getFullLocations = () => {
        let locationAtoms = locationList.map(Entry)
        // console.log(locationAtoms)
        setLocations(locationAtoms)
        setLocationMap(locationAtoms.reduce(locationMapper, {}))
        // console.log('State.locations:')
        // console.log(locationAtoms)
        // console.log('State.locationMap')
        // console.log(locationMap)
    }

    useEffect(() => {getFullLocations()}, [locationList])

    let locationMapper = (obj, item) => {console.log(item); 
                                    obj[item.fields.title] = {detailedWeather: item.fields.detailedWeather,
                                                              mapUrl: item.fields.mapUrl};
                                    return obj}

    const onSearchInputChange = (event) => {
        console.log("Search changed ..." + event.target.value)
        if (event.target.value) {
            setSearchString( event.target.value)
        } else {
            setSearchString('')
        }
        getFullLocations()
    }


    const handleClickOpen = (title) => {
        setOpen(true)
        setSelectedCard(title)
    }

    const newLocationClickOpen = (event) => {
        setLocationAddOpen(true);
    }

    const newLocationHandleClose = (event) => {
        console.log('Close handler called')
        setLocationAddOpen(false);
        getLocationList(setLocationList);
        console.log(locationList)
    }

    const handleClose = (value) => {
        setOpen(false)
        setLocationAddOpen(false)
        console.log('Calling get location list')
        getLocationList(setLocationList)
        console.log({locationList})
        // getLocationList(setLocationList)
     };

    return (
            <div>
                { locations.length > 0 ? (
                    <div>
                        {/* <TextField style={{padding: 24}}
                            id="searchInput"
                            placeholder="Search for Locations"   
                            margin="normal"
                            onChange={onSearchInputChange}
                            /> */}
                        <Grid container spacing={6} style={{padding: 50}}>
                            { locations.map(currentLocation => (
                                <Grid item xs={12} sm={6} lg={4} xl={3}>
                                    <Location location={currentLocation} handleClickOpen={handleClickOpen}/>
                                </Grid>
                            ))}
                        </Grid>
                    <LocationDetail selectedValue={selectedValue} open={open} onClose={handleClose} 
                    location={selectedCard} locationMap={locationMap}/>
                    </div>
                
                ) : <div>
                    <Typography align='center' variant='h6' style={{marginTop: '20%', color:'gray'}}> You haven't added any locations yet! Use the button below to get started</Typography>
                    </div>

                }
                <LocationAdd open={locationAddOpen} onClose={newLocationHandleClose}/>
            <Fab onClick={newLocationClickOpen} aria-label='Add Location'  
                                color='secondary' variant="extended" 
                                size='large'
                                style={{right: 50, bottom:50, position: 'fixed'}}>
            <AddIcon /> New Location
          </Fab>
            </div>
        )
    }


export default LocationGrid;