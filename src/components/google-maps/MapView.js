import React from 'react';
import GoogleMapReact from 'google-map-react';
import MONTREAL_CENTER from './SearchPanel'

const Marker = ({text}) => (
  <div style={{
    color: 'white', 
    background: 'grey',
    padding: '15px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }}>
    {text}
  </div>
);


class MapView extends React.Component {
    
    constructor(props) {
        super(props)
    }
        
    render(){
    console.log(this.props.locationList)  
    const center = {lat: 45.95, lng: -73.33}
    const zoom = 5
    return ( this.props.locationList ? 
       <div style={{ height: '100vh', width: '100%' }}>
    
    <GoogleMapReact
        defaultCenter={center}
        defaultZoom={zoom}
        bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
          }}
      >
    {this.props.locationList.map(location => <Marker 
        lat={location.lat} 
        lng={location.long} 
        text={location.name} 
    />)}
      </GoogleMapReact> </div>
    : "Loading")}
}

export default MapView