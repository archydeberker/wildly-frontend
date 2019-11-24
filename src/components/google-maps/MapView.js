import React, {useState} from 'react';
import GoogleMapReact from 'google-map-react';

import Chip from '@material-ui/core/Chip';
import {locationMapper} from '../LocationGrid'
import LocationDetail from '../LocationDetail'
import Entry from '../../data/locations'
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField'


const ChipMarker = ({text, tooltipText, handleClick}) => (
  <Tooltip title={tooltipText} >
  <Chip color="primary" style={{opacity:0.8}} label={text} onClick={() => handleClick(text)}/>
  </Tooltip>
)


const MapView = (props) => {
    
    const onSearchInputChange = (event) => {
      console.log("Search changed ..." + event.target.value)
      if (event.target.value) {
          setSearchString( event.target.value)
      } else {
          setSearchString('')
      }        
    }

    const [open, setOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState('')
    const [searchString, setSearchString] = useState('')
    
    const center = props.center?props.center:{lat: 45.95, lng: -73.33}
    const zoom = props.zoom?props.zoom:5
    const locationAtoms = props.locationList.map(Entry)
    const locationMap = (props.locationList) ? locationAtoms.reduce(locationMapper, {}): null

    return (<div> {(props.locationList ? 
       <div style={{ height: props.height?props.height:'80vh', width: '100%' }}>
    
    {/* <TextField style={{padding: 24}}
                            id="searchInputMapView"
                            placeholder="Filter Locations"   
                            margin="normal"
                            onChange={onSearchInputChange}
                            /> */}

    <GoogleMapReact
        id='mapview'
        defaultCenter={center}
        defaultZoom={zoom}
        bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
          }}
      >
    {props.locationList.filter(location => location.name.toLowerCase().includes(searchString.toLowerCase())).map(location => 
    <ChipMarker 
        lat={location.lat} 
        lng={location.long} 
        text={location.name}
        tooltipText={location.activities.join(',')}
        handleClick={(title) => {setOpen(true); setSelectedCard(title)} } 
    /> )}
      </GoogleMapReact> 

    </div>
    : "Loading")}

    <LocationDetail  onClose={() => setOpen(false)} open={open} location={selectedCard} locationMap={locationMap}/>
    </div>)
  }


export default MapView