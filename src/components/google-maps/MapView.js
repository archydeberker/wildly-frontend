import React, {useState} from 'react';
import GoogleMapReact from 'google-map-react';
import MONTREAL_CENTER from './SearchPanel'
import Chip from '@material-ui/core/Chip';
import Fab from '@material-ui/core/Fab';
import Avatar from '@material-ui/core/Avatar';
import {locationMapper} from '../LocationGrid'
import LocationDetail from '../LocationDetail'
import Entry from '../../data/locations'
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

const ChipMarker = ({text, tooltipText, handleClick}) => (
  <Tooltip title={tooltipText} >
  <Chip color="primary" label={text} onClick={() => handleClick(text)}/>
  </Tooltip>
)

function MyComponent(props) {
  //  Spread the properties to the underlying DOM element.
  return <div {...props}>Bin</div>
}

// ...


const MapView = (props) => {
    
    const [open, setOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState('')
    
    const center = {lat: 45.95, lng: -73.33}
    const zoom = 5
    const locationAtoms = props.locationList.map(Entry)
    const locationMap = (props.locationList) ? locationAtoms.reduce(locationMapper, {}): null

    return (<div> {(props.locationList ? 
       <div style={{ height: '80vh', width: '100%' }}>
    
    <GoogleMapReact
        defaultCenter={center}
        defaultZoom={zoom}
        bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
          }}
      >
    {props.locationList.map(location => 
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