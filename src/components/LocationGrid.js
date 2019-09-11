import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Location from '../components/Location'
import SimpleDialog from '../components/Alert'
import LocationDetail from '../components/LocationDetail'
import RandomEntry from '../data/locations'
import {NewLocation, LocationAdd} from '../components/NewLocation'
 

class Client {

     getEntries(replicas) {console.log(replicas);

        const entries = () =>  ({items: Array(Math.ceil(Math.random()*10)).fill().map(()=>RandomEntry())})

        return new Promise(resolve => setTimeout(() => {
            resolve(entries())}
                            , 1000))
    }
}

const client = new Client()

client.getEntries(5).then(entries => console.log(entries)).catch(err => console.log('Problem'))

class LocationGrid extends Component {
   
    constructor() {
        super()
        this.state = {
                    locations: [],
                    searchString: '',
                    open: false,
                    selectedValue: 0,
                    locationMap: {},
                }
    
        this.getLocations()

            }

    getLocations = () => {
        client.getEntries(Math.floor(Math.random()*10))
        .then((response) => {
            console.log(response.items)
            console.log(this.state.locations)
            this.setState({locations: response.items,
                           locationMap: response.items.reduce(this.locationMapper, {})})

            console.log('State.locations:')
            console.log(this.state.locations)
        })
        .catch((error) => {
          console.log("Error occurred while fetching Entries")
          console.error(error)
        })
    

    }

    locationMapper = (obj, item) => {console.log(item); 
        // TODO: pass all props here
                                    obj[item.fields.title] = {detailedWeather: item.fields.detailedWeather,
                                                              mapUrl: item.fields.mapUrl};
                                    return obj}

    onSearchInputChange = (event) => {
        console.log("Search changed ..." + event.target.value)
        if (event.target.value) {
            this.setState({searchString: event.target.value})
        } else {
            this.setState({searchString: ''})
        }
        this.getLocations()
    }


    handleClickOpen = (event) => {
        this.setState({open: true});
        this.setState({selectedCard: event.target.title})
    }

    newLocationClickOpen = (event) => {
        this.setState({locationAddOpen: true});
    }

    handleClose = (value) => {
        this.setState({open: false,
            locationAddOpen:false, 
            selectedValue: {value}})
    };

    render() {

        return (
            <div>
                { this.state.locations ? (
                    <div>
                        <TextField style={{padding: 24}}
                            id="searchInput"
                            placeholder="Search for Locations"   
                            margin="normal"
                            onChange={this.onSearchInputChange}
                            />
                        <Grid container spacing={6} style={{padding: 50}}>
                            { this.state.locations.map(currentLocation => (
                                <Grid item xs={12} sm={6} lg={4} xl={3}>
                                    <Location location={currentLocation} handleClickOpen={this.handleClickOpen}/>
                                </Grid>
                            ))}

                                <Grid item xs={12} sm={6} lg={4} xl={3}>
                                    <NewLocation handleClickOpen={this.newLocationClickOpen}/>
                                </Grid>
                        </Grid>
                    <LocationDetail selectedValue={this.state.selectedValue} open={this.state.open} onClose={this.handleClose} 
                    location={this.state.selectedCard} locationMap={this.state.locationMap}/>
                    <LocationAdd open={this.state.locationAddOpen} onClose={this.handleClose} 
                    location={this.state.selectedCard} locationMap={this.state.locationMap}/>
                    </div>
                ) : "No locations found" }
            
            </div>
        )
    }
}

export default LocationGrid;