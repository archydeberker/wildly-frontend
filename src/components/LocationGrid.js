import React, { useState, useEffect } from "react"
import Grid from "@material-ui/core/Grid"
import Location from "../components/Location"
import { Typography } from "@material-ui/core"
import TextField from "@material-ui/core/TextField"

import LocationDetail from "../components/LocationDetail"
import Entry from "../data/locations"
import Loading from "./Loading"

export const locationMapper = (obj, item) => {
    obj[item.fields.title] = { detailedWeather: item.fields.detailedWeather, mapUrl: item.fields.mapUrl }
    return obj
}

function LocationGrid(props) {
    let locationList = props.locationList
    let getLocationList = props.getLocationList
    let setLocationList = props.setLocationList

    const [locations, setLocations] = useState(null)

    const [searchString, setSearchString] = useState("")
    const [open, setOpen] = useState(false)
    const [locationMap, setLocationMap] = useState({})
    const [selectedCard, setSelectedCard] = useState("")
    const [locationAddOpen, setLocationAddOpen] = useState(false)

    const getFullLocations = () => {
        let locationAtoms = locationList.map(Entry)
        setLocations(locationAtoms)
        setLocationMap(locationAtoms.reduce(locationMapper, {}))
    }

    useEffect(() => {
        getFullLocations()
    }, [locationList])

    const onSearchInputChange = event => {
        if (event.target.value) {
            setSearchString(event.target.value)
        } else {
            setSearchString("")
        }
    }

    const handleClickOpen = title => {
        setOpen(true)
        setSelectedCard(title)
    }

    const handleClose = () => {
        setOpen(false)
        setLocationAddOpen(false)
        getLocationList(setLocationList)
    }

    return (
        <div>
            {locations ? (
                locations.length > 0 ? (
                    <div>
                        <TextField
                            style={{ padding: 24 }}
                            id="searchInput"
                            placeholder="Filter Locations"
                            margin="normal"
                            onChange={onSearchInputChange}
                        />
                        <Grid container spacing={6} style={{ padding: 10 }}>
                            {locations
                                .filter(currentLocation =>
                                    currentLocation.fields.title.toLowerCase().includes(searchString.toLowerCase())
                                )
                                .map(currentLocation => (
                                    <Grid item xs={9} sm={4} lg={3} xl={3}>
                                        <Location location={currentLocation} handleClickOpen={handleClickOpen} />
                                    </Grid>
                                ))}
                        </Grid>
                        <LocationDetail
                            open={open}
                            onClose={handleClose}
                            location={selectedCard}
                            locationMap={locationMap}
                        />
                    </div>
                ) : (
                    <div>
                        <Typography align="center" variant="h6" style={{ marginTop: "20%", color: "gray" }}>
                            {" "}
                            You haven't added any locations yet! Use the button below to get started
                        </Typography>{" "}
                    </div>
                )
            ) : (
                <Loading />
            )}
        </div>
    )
}

export default LocationGrid
