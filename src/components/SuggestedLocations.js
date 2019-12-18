import { Grid } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import React, { useState } from "react"
import { useStyles } from "../pages/SignUp"

import { calcDistance, intersection, extractLngLat } from "../helpers/distance"
import DistanceSlider from "./DistanceSlider"

import MapView from "./google-maps/MapView"
import RecommendedLocations from "./RecommendedLocations"

export const SuggestedLocations = props => {
    const styles = useStyles()
    const defaultDistanceThreshold = 300
    const [distanceThreshold, setDistanceThreshold] = useState(defaultDistanceThreshold)


    let { userLocation, locationList, activities, setChosen } = props

    let data = locationList.map(loc => ({
        name: loc.name,
        distance: calcDistance({ lat: loc.lat, lng: loc.long }, extractLngLat(userHomeLocation)),
        activities: loc.activities,
        latitude: loc.lat,
        longitude: loc.long,
    }))
    let recommendations = data.filter(
        location =>
            intersection(
                activities.map(option => option.value),
                location.activities
            ).length > 0
    )
    recommendations = recommendations.filter(location => location.distance < distanceThreshold)
    const filteredLocations = locationList.filter(location => recommendations.map(r => r.name).includes(location.name))

    const handleSliderChange = (event, newValue) => {
        setDistanceThreshold(newValue)
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={9}>
                <MapView locationList={filteredLocations} height="300px" center={extractLngLat(userHomeLocation)} />
            </Grid>
            {/* <Grid item xs={3}> */}
            <Grid container direction="column" xs={3}>
                <Grid item maxWidth="100%" xs={3}>
                    <Typography variant="subtitle2" className={styles.filter}>
                        Filter by max distance:
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <DistanceSlider
                        defaultDistanceThreshold={defaultDistanceThreshold}
                        handleSliderChange={handleSliderChange}
                        className={styles.filter}
                        orientation="horizontal"
                    />
                </Grid>
            </Grid>
            {/* </Grid> */}
            <Grid item xs={12}>
                <RecommendedLocations data={recommendations} setChosen={setChosen} />
            </Grid>
        </Grid>
    )
}
