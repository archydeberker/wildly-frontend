import React, {useEffect, useState} from 'react';
import Plot from 'react-plotly.js';

import Table from '@material-ui/core/Table';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import WeatherIconMapper from '../data/weatherIcons'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
    },
    paper: {
      marginTop: theme.spacing(3),
      width: '100%',
      overflowX: 'auto',
      marginBottom: theme.spacing(2),
    },
    innerRow: {
        borderBottomWidth: 0,
        align: 'right',
    },
    table: {
      minWidth: 650,
    },
  }));

const GetWeatherForecast = async(locations, handler) => {
    
    const DarkSkyKey = process.env.REACT_APP_DARKSKY_KEY

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
        const getIcons = (json)  => {let icons = json['daily']['data'];
                                        
                                    return {x: icons.map(value => {let date = new Date(null);
                                                                        date.setSeconds(value.time)
                                                                        date.toLocaleString( 'en-GB', { timeZone: 'UTC' })
                                                                        date.toString().concat(date.getDay().toString())
                                                                        return(date)}),
                                                y: icons.map(value=>value.icon),
                                                }}
        
        const getTemp = (json)  => {let temp = json['daily']['data'];            
                            return {x: temp.map(value => {let date = new Date(null);
                                            date.setSeconds(value.time)
                                            date.toLocaleString( 'en-GB', { timeZone: 'UTC' })
                                            date.toString().concat(date.getDay().toString())
                                            return(date)}),
                                    tempHigh: temp.map(value=>value.temperatureHigh),
                                    tempLow: temp.map(value=>value.temperatureLow),
                    }}


        const getDaily = (json)  => {
            let daily = json['daily']['data'];  
            return daily.map(day => {let date = new Date(null);
                                    date.setSeconds(day.time)
                                    date.toLocaleString( 'en-GB', { timeZone: 'UTC' })
                                    date.toString().concat(date.getDay().toString())
                                    return({'timestamp': date, 'icon': day.icon, 'tempHigh': day.temperatureHigh, 'tempLow': day.temperatureLow} )})}
           
        let locationData = {}
        return locationData['rain'] = fetch(`https://mysterious-lowlands-26585.herokuapp.com/https://api.darksky.net/forecast/${DarkSkyKey}/${lat},${long}?units=si`,
                        {method: 'get'}).
                        then(response => response.json()).
                        then(json => {return({yaxis: 'Precipitation, mm/hr',
                                              name: name,
                                             'rain': getRain(json),
                                             'daily': getDaily(json)})}).
                        then(handler)
    }
    
    // We wait for ALL of the locations to return data before sending updating the data field: 
    // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
    Promise.all(locations.map(weatherForLocation)).then(data => handler(data))
}

const SubstringInSet = (set, superstring) => {
    const filtered = set.filter(candidate => {return (String(superstring).includes(candidate))})
    return (filtered.length > 0 ? true: false)
    }

const filterDataByDate = data => {   
    const keys = ['Fri', 'Sat', 'Sun', 'Mon']    
    const filtered = data.map(location => {return({'name': location.name, 
                                                   'measurements':
                                            location.daily.filter(measurement => 
                                            SubstringInSet(keys, measurement['timestamp']))})})

    return filtered
    }

const formatDate = date => String(date).split(' ').slice(0, 3).join(' ')

const WeatherTable = props => {
    const {data} = props;
    const classes = useStyles();
    const filteredData = filterDataByDate(data)

    const row = filteredData[0]
    const dates = row.measurements.map(measurement => formatDate(measurement['timestamp']))

    return (
        <Paper className={classes.paper}>
      <Table aria-label="weather-table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>Location</TableCell>
            {dates.map(date => <TableCell align="center">{date}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              {row.measurements.map(measurement => <TableCell align="right">
                                                    <TableCell className={classes.innerRow} align="right">{WeatherIconMapper(measurement.icon, 48, '#000')}
                                                    </TableCell>
                                                    <TableCell  className={classes.innerRow} align="right">
                                                    <TableRow align='right'> <span style={{fontWeight: 'bold'}}> {Math.round(measurement.tempHigh)} </span> </TableRow> 
                                                    <TableRow align='right'> <span> {Math.round(measurement.tempLow)} </span></TableRow>
                                                    </TableCell>
                                                    
                                                    </TableCell>)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    )
}
const RainGraph = (props) => {
    
    const {data, field, yaxis} = props;
    
    // rainfall classification from https://en.wikipedia.org/wiki/Rain
    const light_rain = 0
    const mod_rain =  2.5
    const heavy_rain = 7.6

    const rain_lines = [light_rain, mod_rain, heavy_rain]
    const rain_annotations = [[mod_rain, 'Moderate rain'], [heavy_rain, 'Heavy rain']]

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
                width: '50%',
                // height: '50%',
                legend: {orientation: "h"},
                // title:{text: 'Precipitation'},
                yaxis: {title: yaxis,
                        font: {
                            family: 'Roboto',
                            size: 36
                        },
                        showgrid: false,
                        range: [0, 10]},
                xaxis: {
                    tickformat: '%I%p \n %a %b-%e %Y', // For more time formatting types, see: https://github.com/d3/d3-time-format/blob/master/README.md
                    showgrid: false
                },
                font: {
                    family: 'Roboto',
                    
                },
                shapes: rain_lines.map(mm =>
                    {return ({type: 'rect',
                        xref: 'paper',
                        x0: 0,
                        y0: mm,
                        x1: 1,
                        y1: 10,
                        fillcolor:'rgb(50, 150, 255)',
                        text: ['Rain'],
                        opacity: 0.05,
                        line: {
                            width: 0
                        }
                    })}),
                annotations: rain_annotations.map(arr =>{
                    const mm = arr[0]
                    const text = arr[1]
                    return(
                        {
                          x: 1,
                          y: mm + 0.2,
                          xref: 'paper',
                          yref: 'y',

                          text: text,
                          size: 25,
                          showarrow: false,
                          font: {
                                size: 16,
                                color: '#000051',
                            },
                        })}),
                }}
        />
        );
    }
    
const AllGraphs = (props) => {
    let locationList = props.locationList

    const [data, setData] = useState(null)
    const locations = locationList.map((location) => {return({name: location['name'],
                                                             long: location['long'],
                                                             lat: location['lat']})})

    useEffect(() => {if(locationList.length > 0){GetWeatherForecast(locations, setData)}}, [locationList]) 
    console.log(data)
    return((data ? 
        <div>
        <Grid container>
        <Grid item xs={12} sm={6}>
        <RainGraph 
            data={data} 
            field='rain'
            yaxis='precipitation mm/hr'/> 
        </Grid>
        <Grid item xs={12} sm={6}>
        <WeatherTable data={data}/>
        </Grid>
        </Grid>
         </div>: <div/>))
}

export default AllGraphs