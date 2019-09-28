import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Location from '../components/Location'

import LocationDetail from '../components/LocationDetail'
import RandomEntry from '../data/locations'
import {NewLocation, LocationAdd} from '../components/NewLocation'
import {getUserLocations} from '../api/Get.js' 
import {useAuth0} from "../react-auth0-wrapper";

class Client {

     getEntries(replicas) {;

        const entries = () =>  ({items: Array(replicas).fill().map(()=>RandomEntry())})

        return new Promise(resolve => setTimeout(() => {
            resolve(entries())}
                            , 1000))
    }
}

const client = new Client()

function LocationGrid(){
    const [locations, setLocations] = useState([])
    const [locationList, setLocationList] = useState([''])
    const [searchString, setSearchString] = useState('')
    const [open, setOpen] = useState(false)
    const [locationMap, setLocationMap] = useState({})
    const [selectedCard, setSelectedCard] = useState('')
    const [locationAddOpen, setLocationAddOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState(0)
    const {loading, getTokenSilently} = useAuth0()

    const getLocationList = (setLocationList) => {
        console.log('gll called')
        getUserLocations(setLocationList, getTokenSilently).then(console.log(locationList))
    }

    const getFullLocations = () => {
        client.getEntries(locationList.length)
        .then((response) => {
            console.log(response.items)
            locationList.map((name, i) => response.items[i].fields.title=name)
            console.log(response.items)
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

    useEffect(() => {if(!loading){getLocationList(setLocationList)}}, [loading])
    useEffect(() => {getFullLocations()}, [locationList])

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
        getLocationList(setLocationList)
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