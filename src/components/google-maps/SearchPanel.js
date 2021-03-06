import React, { Component, Fragment } from "react"

import Marker from "./Marker"

import GoogleMap from "./GoogleMap"
import SearchBox from "./SearchBox"

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
const MONTREAL_CENTER = [45.5017, -73.5673]

export default class Searchbox extends Component {
    constructor(props) {
        super(props)
        this.onSelect = this.props.onSelect
        this.state = {
            mapApiLoaded: false,
            mapInstance: null,
            mapApi: null,
            places: [],
        }

        this.el = document.createElement("div")
    }

    apiHasLoaded = (map, maps) => {
        console.log(map)
        this.setState({
            mapApiLoaded: true,
            mapInstance: map,
            mapApi: maps,
        })
    }

    addPlace = place => {
        this.setState({ places: place })
        console.log(this.state)
        this.onSelect(this.state.places)
    }

    render() {
        const { mapApiLoaded, mapInstance, mapApi } = this.state
        console.log(mapApi)
        console.count("searchPanel")
        return (
            <Fragment>
                <GoogleMap
                    defaultZoom={10}
                    defaultCenter={MONTREAL_CENTER}
                    bootstrapURLKeys={{
                        key: GOOGLE_API_KEY,
                        libraries: ["places", "geometry"],
                    }}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
                >
                    {this.state.places.map(place => (
                        <Marker
                            key={place.id}
                            text={place.name}
                            lat={place.geometry.location.lat()}
                            lng={place.geometry.location.lng()}
                        />
                    ))}
                </GoogleMap>

                {mapApiLoaded && (
                    <SearchBox
                        width="100%"
                        map={mapInstance}
                        mapApi={mapApi}
                        addplace={this.addPlace}
                        placeholder={this.props.placeholder}
                        label={this.props.label}
                    />
                )}
            </Fragment>
        )
    }
}
