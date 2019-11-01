import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';

import distance from '../helpers/distance'

const tableStyles = makeStyles(theme => ({

    table: {
      marginTop: '10px',
      width: '100%',
      overflowX: 'auto',
      marginBottom: '10px',
    },
    cell: {
        padding: '1px'
    }
  }));


const calcDistance = (a, b) => {
    console.log(a)
    console.log(b)
    return(distance(a.lat, a.lng, b.lat, b.lng).toFixed(0))}

export default function RecommendedLocations(props){
    const {locationList, userLocation, userActivities} = props
    let data = locationList ? (locationList.map(loc => ({name: loc.name, 
                                          distance: calcDistance({lat: loc.lat, lng:loc.long}, userLocation),
                                        activities: loc.activities}))):[{name: "Rumney, NH", distance: '112km', activities: 'climbing'},
                                        {name: "Rumney, NH", distance: '112km', activities: 'climbing'},
                                        {name: "Rumney, NH", distance: '112km', activities: 'climbing'}]
    const classes = tableStyles()

    // data = data.filter(location =>  userActivities.includes(location.activities[0]))
    console.log(data)
    return (locationList ? (
            <Table className={classes.table}>
            <TableHead>
                <TableRow>
                <TableCell className={classes.cell}>Location</TableCell> 
                <TableCell className={classes.cell}>Distance</TableCell> 
                <TableCell className={classes.cell}>Activity</TableCell> 
                <TableCell className={classes.cell}>Add?</TableCell> 
                </TableRow>
            </TableHead>
            <TableBody>
            {data.map(location => 
                <TableRow key={location.name}>
                    <TableCell className={classes.cell}> {location.name}</TableCell>
                    <TableCell className={classes.cell}> {location.distance.toString()} miles</TableCell>
                    <TableCell className={classes.cell}> {location.activities}</TableCell>
                    <TableCell className={classes.cell}>     <Switch
                                        // checked={true}
                                        // onChange={handleChange('checkedA')}
                                        value="checkedA"
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    /></TableCell>
                </TableRow>
            )}
            </TableBody>
        </Table>
        ) :
        <div></div>

    )
}