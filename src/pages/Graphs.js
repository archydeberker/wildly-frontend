import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import { RainGraph } from '../components/RainGraph';
import { GetWeatherForecast } from '../api/GetWeatherForecast';

const AllGraphs = (props) => {
    let locationList = props.locationList
    console.log(locationList)
    const [data, setData] = useState(null)
    const locations = locationList.map((location) => {return({name: location['name'],
                                                             long: location['long'],
                                                             lat: location['lat']})})

    useEffect(() => {if(locationList.length > 0){GetWeatherForecast(locations, setData)}}, [locationList]) 
    console.log(data)
    return((data ? 
        <div>
        <Grid container>
        <div width='98%'> 
        <RainGraph 
            data={data} 
            field='rain'
            yaxis='precipitation mm/hr'/> 
        </div> 
        </Grid>
         </div>: <div/>))
}

export default AllGraphs