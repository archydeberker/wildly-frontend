import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Location from '../components/Location'

import LocationDetail from '../components/LocationDetail'
import RandomEntry from '../data/locations'
import {NewLocation, LocationAdd} from '../components/NewLocation'
import {getUserLocations} from '../api/Get.js' 
import { useAuth0 } from "../react-auth0-wrapper";

class Client {

     getEntries(replicas) {;

        const entries = () =>  ({items: Array(Math.ceil(Math.random()*10)).fill().map(()=>RandomEntry())})

        return new Promise(resolve => setTimeout(() => {
            resolve(entries())}
                            , 1000))
    }
}

// const getLocationsForUser = () => {
    
    
    
//     return locationArray

const client = new Client()



function LocationGrid(){

    const [setState, state] = useState(
                {locations: [],
                searchString: '',
                open: false,
                selectedValue: 0,
                locationMap: {}})

    const [locations, setLocations] = useState([])
    const [searchString, setSearchString] = useState('')
    const [open, setOpen] = useState(false)
    const [locationMap, setLocationMap] = useState({})
    const [selectedCard, setSelectedCard] = useState('')
    const [locationAddOpen, setLocationAddOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState(0)
    const {loading, getTokenSilently} = useAuth0()

    const getLocations = () => {
        client.getEntries(Math.floor(Math.random()*10))
        .then((response) => {
            console.log(response.items)
            console.log(locations)
            setLocations(response.items)
            setLocationMap(response.items.reduce(locationMapper, {}))
            console.log('State.locations:')
            console.log(locations)
        })
        .catch((error) => {
          console.log("Error occurred while fetching Entries")
          console.error(error)
        })
    }

    useEffect(() => getLocations(), [])
    useEffect(() => {if(!loading){getUserLocations(console.log, getTokenSilently)}}, [loading])

    const locationMapper = (obj, item) => {console.log(item); 
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
        getLocations()
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
     };

    return (
            <div>
                { locations ? (
                    <div>
                        <TextField style={{padding: 24}}
                            id="searchInput"
                            placeholder="Search for Locations"   
                            margin="normal"
                            onChange={onSearchInputChange}
                            />
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
                    <LocationAdd open={locationAddOpen} onClose={handleClose} 
                    location={selectedCard} locationMap={locationMap}
                    />
                    </div>
                ) : "No locations found" }
            
            </div>
        )
    }


export default LocationGrid;