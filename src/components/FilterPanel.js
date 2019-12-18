import React from "react"
import Grid from "@material-ui/core/Grid"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import { makeStyles } from "@material-ui/core/styles"
import DistanceSlider from "./DistanceSlider"
import ActivitiesSelector from "./ActivitiesSelector"
import { Typography } from "@material-ui/core"
import TextField from "@material-ui/core/TextField"
const useStyles = makeStyles({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 16,
    },
    pos: {
        marginBottom: 12,
    },
})
export const FilterPanel = props => {
    const classes = useStyles()
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
            <Grid container direction="column" spacing={4}>
                <Grid item>
                    <Card>
                        <CardContent>
                            <Typography className={classes.title} gutterBottom color="textSecondary">
                                Filter by distance
                            </Typography>
                            <DistanceSlider
                                defaultDistanceThreshold={100}
                                handleSliderChange={(e, newValue) => {
                                    setDistanceThreshold(newValue)
                                }}
                            />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item>
                    <Card style={{ overflow: "visible" }}>
                        <CardContent>
                            <Typography className={classes.title} gutterBottom color="textSecondary">
                                Filter by activity
                            </Typography>
                            <ActivitiesSelector onChange={value => setActivities(value)} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item>
                    <Card>
                        <CardContent>
                            <Typography className={classes.title} gutterBottom color="textSecondary">
                                Filter by name
                            </Typography>
                            <TextField
                                id="searchInput"
                                placeholder="Filter Locations"
                                margin="normal"
                                onChange={onSearchInputChange}
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}
