import React, { useEffect, useState } from "react"
import Grid from "@material-ui/core/Grid"
import { PrecipGraph } from "../components/PrecipGraph"
import { GetWeatherForecast } from "../api/GetWeatherForecast"
import { AddLocationButton } from "../components/AddLocationButton"

const AllGraphs = props => {
    let { locationList, setLocationList, getLocationList } = props
    const [data, setData] = useState(null)
    const locations = locationList.map(location => {
        return { name: location["name"], long: location["long"], lat: location["lat"] }
    })
    useEffect(() => {
        if (locationList.length > 0) {
            GetWeatherForecast(locations, setData)
        }
    }, [locationList])
    return data ? (
        <div>
            <Grid container>
                <div width="98%">
                    <PrecipGraph
                        data={data}
                        field="rain"
                        yaxis="Rain negative (mm/hr) <--------> Snow positive (cm/hr)"
                    />
                </div>
            </Grid>
        </div>
    ) : (
        <div />
    )
}

export default AllGraphs
