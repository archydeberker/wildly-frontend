import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Location from '../components/Location'

import LocationDetail from '../components/LocationDetail'
import Entry from '../data/locations'
import {NewLocation, LocationAdd} from '../components/NewLocation'
import {getUserLocations} from '../api/Get.js' 
import {RetrieveUserLocations, AddUserLocation} from '../api/Post.js' 
import {useAuth0} from "../react-auth0-wrapper";



function LocationGrid(props){

    let locationList = props.locationList

    const [locations, setLocations] = useState([])

    const [searchString, setSearchString] = useState('')
    const [open, setOpen] = useState(false)
    const [locationMap, setLocationMap] = useState({})
    const [selectedCard, setSelectedCard] = useState('')
    const [locationAddOpen, setLocationAddOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState(0)
    const {loading, getTokenSilently, user} = useAuth0()


    const getFullLocations = () => {
        let locationAtoms = locationList.map(Entry)
        console.log(locationAtoms)
        setLocations(locationAtoms)
        setLocationMap(locationAtoms.reduce(locationMapper, {}))
        console.log('State.locations:')
        console.log(locationAtoms)
        console.log('State.locationMap')
        console.log(locationMap)
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


    const handleClickOpen = (event) => {
        setOpen(true)
        setSelectedCard(event.target.title)
    }

    const newLocationClickOpen = (event) => {
        setLocationAddOpen(true);
    }

    const handleClose = (value) => {
        setOpen(false)
        setLocationAddOpen(false)
        setSelectedValue(value)
        // getLocationList(setLocationList)
     };

    return (
            <div>
                { locations.length > 1 ? (
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

                                <Grid item xs={12} sm={6} lg={4} xl={3}>
                                    <NewLocation handleClickOpen={newLocationClickOpen}/>
                                </Grid>
                        </Grid>
                    <LocationDetail selectedValue={selectedValue} open={open} onClose={handleClose} 
                    location={selectedCard} locationMap={locationMap}/>
                    </div>
                
                ) : <div>
                    <Grid container spacing={6} style={{padding: 50}}>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                                    <NewLocation handleClickOpen={newLocationClickOpen}/>
                    </Grid>     
                    </Grid>
                    </Grid>
                    
                    </div>

                }
                <LocationAdd open={locationAddOpen} onClose={handleClose}/>
            
            </div>
        )
    }


export default LocationGrid;