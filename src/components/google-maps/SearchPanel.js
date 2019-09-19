import React, { Component, Fragment } from 'react';
import isEmpty from 'lodash';

// components:
import Marker from './Marker';

// examples:
import GoogleMapReact from 'google-map-react'
import GoogleMap from './GoogleMap';
import SearchBox from './SearchBox';

// consts
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY


const LOS_ANGELES_CENTER =[34.0522, -118.2437]

export default class Searchbox extends Component {
  constructor(props) {
    super(props);
    this.onSelect = this.props.onSelect
    this.state = {
      mapApiLoaded: false,
      mapInstance: null,
      mapApi: null,
      places: [],
    };

    this.el = document.createElement('div');
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
    this.onSelect(this.state.places)
  };

  render() {
    const {
      places, mapApiLoaded, mapInstance, mapApi,
    } = this.state;
    return (

      <Fragment>
        {mapApiLoaded && <SearchBox width='100%' map={mapInstance} mapApi={mapApi} addplace={this.addPlace} />}
        
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


    );
  }
}


