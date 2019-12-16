import React, { useState } from "react"
import MapView from "../components/google-maps/MapView"
import Grid from "@material-ui/core/Grid"

import RecommendedLocations from "../components/RecommendedLocations"
import { calcDistance, intersection, extractLngLat } from "../helpers/distance"
import DistanceSlider from "../components/DistanceSlider"
import ActivitiesSelector from "../components/ActivitiesSelector"
import { Typography } from "@material-ui/core"
import TextField from "@material-ui/core/TextField"

const FilterPanel = props => {
    const { setDistanceThreshold, setActivities, setSearchString } = props
    const onSearchInputChange = event => {
        if (event.target.value) {
            setSearchString(event.target.value)
        } else {
            setSearchString("")
        }
    }

    return (
        <div>
            <Typography>Filter by distance</Typography>
            <DistanceSlider
                defaultDistanceThreshold={100}
                handleSliderChange={(e, newValue) => {
                    setDistanceThreshold(newValue)
                }}
            />
            <Typography>Filter by activity</Typography>
            <ActivitiesSelector onChange={value => setActivities(value)} />
            <Typography>Filter by name</Typography>
            <TextField
                style={{ padding: 24 }}
                id="searchInput"
                placeholder="Filter Locations"
                margin="normal"
                onChange={onSearchInputChange}
            />
        </div>
    )
}

function filterLocations(locationList, data, distanceThreshold, activities, searchString) {
    activities = activities ? activities : []

    let recommendations = data.filter(
        location =>
            intersection(
                activities.map(option => option.value),
                location.activities
            ).length > 0
    )

    recommendations = recommendations.filter(location => location.distance < distanceThreshold)
    recommendations = recommendations.filter(location =>
        location.name.toLowerCase().includes(searchString.toLowerCase())
    )

    return {
        filteredLocations: locationList.filter(location => recommendations.map(r => r.name).includes(location.name)),
        recommendations: recommendations,
    }
}
export default function DiscoverPanel(props) {
    const defaultDistanceThreshold = 300
    let { locationList, setChosen } = props
    // For debugging only, should be imported
    const userLocation = { lat: 45.95, lng: -73.33 }
    let data = locationList.map(loc => ({
        name: loc.name,
        distance: calcDistance({ lat: loc.lat, lng: loc.long }, userLocation),
        activities: loc.activities,
        latitude: loc.lat,
        longitude: loc.long,
    }))

    const [activities, setActivities] = useState([])
    const [searchString, setSearchString] = useState("")
    const [distanceThreshold, setDistanceThreshold] = useState(defaultDistanceThreshold)

    const { filteredLocations, recommendations } = filterLocations(
        locationList,
        data,
        distanceThreshold,
        activities,
        searchString
    )

    return (
        <div style={{ padding: 20 }}>
            <Grid container spacing={6}>
                <Grid xs={12}>
                    <Typography>
                        Here you can review locations other users have added, and choose to add them to your own Wildly
                        monitor. You can filter by acitivty, distance, and location name.
                    </Typography>
                </Grid>
                <Grid xs={9}>
                    <MapView locationList={filteredLocations} />
                </Grid>
                <Grid xs={3}>
                    <Grid container direction="column" style={{ padding: 50 }}>
                        <Grid item xs={12}>
                            <FilterPanel
                                setActivities={setActivities}
                                setDistanceThreshold={setDistanceThreshold}
                                setSearchString={setSearchString}
                            />
                        </Grid>
                        <Grid item xs={12} style={{ padding: 50 }} />
                        <Grid item xs={12}>
                            <RecommendedLocations data={recommendations} setChosen={() => {}} style={{ padding: 50 }} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}
