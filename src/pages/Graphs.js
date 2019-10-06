import React, {useEffect, useState} from 'react';
import Plot from 'react-plotly.js';


const GetWeatherForecast = async(locations, handler) => {
    
    const weatherForLocation = (locationName, handler) => {
        const getHourly = (json)  => {const hourly = json['hourly']['data'];
                                        return {x: hourly.map(value => {let date = new Date(null);
                                                                        date.setSeconds(value.time)
                                                                        date.toLocaleString( 'en-GB', { timeZone: 'UTC' })
                                                                        date.toString().concat(date.getDay().toString())
                                                                        return(date)}),
                                                y: hourly.map(value=>value.precipIntensity),
                                                }}
        
        let locationData = {}
        return locationData['hourly-rain'] = fetch('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/6e545cedef4608643d505e282796c4f6/43.8054,-71.8126',
                        {method: 'get'}).
                        then(response => response.json()).
                        then(json => {return({yaxis: 'Precipitation, mm/hr',
                                             'hourly-rain': getHourly(json)})}).
                        then(handler)
    }
    
    // We wait for ALL of the locations to return data before sending updating the data field: 
    // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
    Promise.all(locations.map(weatherForLocation)).then(data => handler(data))
}
    
    
const Graph = (props) => {
    
    const {data, field} = props;
    console.log(data)
    console.log(field)
    return (
        <Plot
        data={data.map(location => 
            {console.log(location)
                return({x: location[field]['x'],
                y: location[field]['y'],
                type: 'scatter',
                mode: 'none',
                fill: 'tonexty',
                name: location['name'],
            })},
        )}
        layout={{width: '100vw', height: '100vh', 
                // title: {text: data['name'],
                //         font:{family: 'Roboto',
                //                 size: 18,
                //                 style: 'bold'}}, 
        yaxis: {title: data['yaxis']},
        xaxis: {
            tickformat: '%I%p \n %a %b-%e %Y' // For more time formatting types, see: https://github.com/d3/d3-time-format/blob/master/README.md
        },
        font: {
            family: 'Roboto',
            
        }}}
        />
        );
    }
    
const AllGraphs = () => {
    const [data, setData] = useState(null)
    const locations = ['Loc1', 'Loc2']
    useEffect(() => {{GetWeatherForecast(locations, setData)}}, []) 
    return((data ? <Graph data={data} field='hourly-rain'/> : <div/>))
}

export default AllGraphs