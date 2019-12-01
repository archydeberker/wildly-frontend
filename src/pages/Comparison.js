import React from "react"

import Grid from "@material-ui/core/Grid"
import { WeatherTable } from "../components/WeatherTable"
import { LocationAdd } from "../components/NewLocation"

const WeatherComparison = props => {
    let weatherData = props.weatherData

    return weatherData ? (
        <div>
            <Grid container>
                <WeatherTable data={weatherData} />
            </Grid>
        </div>
    ) : (
        <div />
    )
}

export default WeatherComparison
