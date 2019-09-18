import React, { Component, Fragment } from 'react';
import isEmpty from 'lodash';

// components:
import Marker from '../components/google-maps/Marker';

// examples:
import GoogleMap from '../components/google-maps/GoogleMap';
import GoogleMapReact from 'google-map-react'
import SearchBox from '../components/google-maps/SearchBox';

// consts
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

console.log(GOOGLE_API_KEY)

const LOS_ANGELES_CENTER =[34.0522, -118.2437]

class Searchbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mapApiLoaded: false,
      mapInstance: null,
      mapApi: null,
      places: [],
    };
  }

  apiHasLoaded = (map, maps) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    });
  };

  addPlace = (place) => {
    this.setState({ places: place });
    console.log(this.state)
  };

  render() {
    const {
      places, mapApiLoaded, mapInstance, mapApi,
    } = this.state;
    return (
      
      <div style = {{'width':'100vw', 'height':'1000px'}}>
      <Fragment>
        {mapApiLoaded && <SearchBox width='50%' map={mapInstance} mapApi={mapApi} addplace={this.addPlace} />}
        <GoogleMap
          defaultZoom={10}
          defaultCenter={LOS_ANGELES_CENTER}
          bootstrapURLKeys={{
            key: GOOGLE_API_KEY,
            libraries: ['places', 'geometry'],
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
        >
          {
            this.state.places.map(place => (
              <Marker
                key={place.id}
                text={place.name}
                lat={place.geometry.location.lat()}
                lng={place.geometry.location.lng()}
              />
            ))}

          
        </GoogleMap>
      
      </Fragment>
      </div>

    );
  }
}

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys= {GOOGLE_API_KEY}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          
        </GoogleMapReact>
      </div>
    );
  }
}

export default Searchbox;