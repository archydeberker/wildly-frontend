import React, { useState } from "react"
import MapView from "../components/google-maps/MapView"
import Grid from "@material-ui/core/Grid"
import GridList from "@material-ui/core/GridList"
import GridListTile from "@material-ui/core/GridListTile"
import GridListTileBar from "@material-ui/core/GridListTileBar"
import Chip from "@material-ui/core/Chip"
import AddIcon from "@material-ui/icons/AddCircle"
import CheckIcon from "@material-ui/icons/CheckCircle"
import IconButton from "@material-ui/core/IconButton"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"

import RecommendedLocations from "../components/RecommendedLocations"
import { calcDistance, intersection, extractLngLat } from "../helpers/distance"
import { Typography } from "@material-ui/core"
import { FilterPanel } from "../components/FilterPanel"

function filterLocations(allLocationList, data, distanceThreshold, activities, searchString) {
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
        filteredLocations: allLocationList.filter(location => recommendations.map(r => r.name).includes(location.name)),
        recommendations: recommendations,
    }
}

export default function DiscoverPanel(props) {
    const defaultDistanceThreshold = 300
    let { allLocationList, locationList } = props

    console.log(allLocationList)
    console.log(locationList)
    // For debugging only, should be imported from backend!
    const userLocation = { lat: 45.95, lng: -73.33 }

    const checkWhetherUserHasLocation = location => {
        const locationNames = locationList.map(loc => loc.name)
        return locationNames.includes(location.name)
    }

    let data = allLocationList.map(loc => ({
        name: loc.name,
        distance: calcDistance({ lat: loc.lat, lng: loc.long }, userLocation),
        activities: loc.activities,
        latitude: loc.lat,
        longitude: loc.long,
        img: loc.img,
    }))

    const [activities, setActivities] = useState([])
    const [searchString, setSearchString] = useState("")
    const [distanceThreshold, setDistanceThreshold] = useState(defaultDistanceThreshold)

    const { filteredLocations, recommendations } = filterLocations(
        allLocationList,
        data,
        distanceThreshold,
        activities,
        searchString
    )

    return (
        <div style={{ padding: 20 }}>
            <Grid container spacing={6}>
                {/* <Grid xs={9}>
                    <Typography variant="h6">
                        Here you can review locations other users have added, and choose to add them to your own Wildly
                        monitor. You can filter by activity, distance, and location name.
                    </Typography>
                </Grid> */}
                <Grid xs={9}>
                    <MapView height="60vh" locationList={filteredLocations} />
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
                        {/* <Grid item xs={12}>
                            <RecommendedLocations data={recommendations} setChosen={() => {}} style={{ padding: 50 }} />
                        </Grid> */}
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={6}>
                <Grid xs={9}>
                    {recommendations.length > 0 ? (
                        <div style={{ overflow: "hidden" }}>
                            <GridList style={{ flexWrap: "nowrap" }} cols={4.5}>
                                {recommendations.map(location => (
                                    <GridListTile>
                                        <img src={location.img} alt={location.title} />
                                        <GridListTileBar
                                            title={`${location.name} (${location.distance} miles away)`}
                                            subtitle={location.activities.map(activity => (
                                                <Chip label={activity} />
                                            ))}
                                            actionIcon={
                                                <IconButton aria-label={`Add location`}>
                                                    {checkWhetherUserHasLocation(location) ? (
                                                        <CheckIcon color="primary" />
                                                    ) : (
                                                        <AddIcon color="secondary" />
                                                    )}
                                                </IconButton>
                                            }
                                        ></GridListTileBar>
                                    </GridListTile>
                                ))}
                            </GridList>
                        </div>
                    ) : (
                        <Typography color="textSecondary" align="center">
                            Use the filters to the right to find locations to add to Wildly
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </div>
    )
}
