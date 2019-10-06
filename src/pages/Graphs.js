import React, {useEffect, useState} from 'react';
import Plot from 'react-plotly.js';

const GetWeatherForecast = async(locations, handler) => {
    
    const DarkSkyKey = process.env.REACT_APP_DARKSKY_KEY
    console.log(DarkSkyKey)
    const weatherForLocation = (location, handler) => {
        const {name, long, lat} = location
        const getRain = (json)  => {let rain = json['hourly']['data'];
                                    // minutely data is not always available
                                    // rain = rain.concat(json['minutely']['data'])

                                    // Add daily estimates but only if they don't overlap with hourly ones
                                    const maxTime = Math.max(...rain.map(val => val.time))
                                    rain = rain.concat(json['daily']['data'].filter(el => el['time'] > maxTime))
                                        
                                    return {x: rain.map(value => {let date = new Date(null);
                                                                        date.setSeconds(value.time)
                                                                        date.toLocaleString( 'en-GB', { timeZone: 'UTC' })
                                                                        date.toString().concat(date.getDay().toString())
                                                                        return(date)}),
                                                y: rain.map(value=>value.precipIntensity),
                                                }}
        
        let locationData = {}
        return locationData['rain'] = fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${DarkSkyKey}/${lat},${long}`,
                        {method: 'get'}).
                        then(response => response.json()).
                        then(json => {return({yaxis: 'Precipitation, mm/hr',
                                              name: name,
                                             'rain': getRain(json)})}).
                        then(handler)
    }
    
    // We wait for ALL of the locations to return data before sending updating the data field: 
    // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
    Promise.all(locations.map(weatherForLocation)).then(data => handler(data))
}
    
    
const Graph = (props) => {
    
    const {data, field, yaxis} = props;

    return (
        <Plot
        data={data.map(location => 
            {return({x: location[field]['x'],
                y: location[field]['y'],
                type: 'scatter',
                mode: 'lines',
                fill: 'tozeroy',
                name: location['name'],
            })},
        )}
        layout={{
                title:{text: 'Precipitation'},
                yaxis: {title: yaxis,
                font: {
                    family: 'Roboto',
                    size: 36
                    
                }},
                xaxis: {
                    tickformat: '%I%p \n %a %b-%e %Y' // For more time formatting types, see: https://github.com/d3/d3-time-format/blob/master/README.md
                },
                font: {
                    family: 'Roboto',
                    
                }}}
        />
        );
    }
    
const AllGraphs = (props) => {
    let locationList = props.locationList

    const [data, setData] = useState(null)
    console.log(locationList)
    const locations = locationList.map((location) => {return({name: location['name'],
                                                             long: location['long'],
                                                             lat: location['lat']})})

    console.log(locations)
    useEffect(() => {if(locationList.length > 0){GetWeatherForecast(locations, setData)}}, [locationList]) 
    return((data ? <div style={{width: '100vw'}}><Graph style={{width: '100vw'}} data={data} field='rain'
    yaxis='mm/hr'/> </div>: <div/>))
}

export default AllGraphs