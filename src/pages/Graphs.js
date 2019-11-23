import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import { RainGraph } from '../components/RainGraph';
import { GetWeatherForecast } from '../api/GetWeatherForecast';
import {AddLocationButton} from '../components/AddLocationButton'

const AllGraphs = (props) => {
    let {locationList, setLocationList, getLocationList} = props
    const [data, setData] = useState(null)
    const locations = locationList.map((location) => {return({name: location['name'],
                                                             long: location['long'],
                                                             lat: location['lat']})})
    console.log(locations)
    useEffect(() => {if(locationList.length > 0){GetWeatherForecast(locations, setData)}}, [locationList]) 
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
        {/* <AddLocationButton setLocationList={setLocationList} getLocationList={getLocationList}/> */}
         </div>: 
        //  <AddLocationButton setLocationList={setLocationList} getLocationList={getLocationList}/>
        <div/>))
}

export default AllGraphs