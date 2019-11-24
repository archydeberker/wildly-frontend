import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';



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


export default function RecommendedLocations(props){
    const {data, setChosen} = props
    const classes = tableStyles()
    const selectedLocations = []
    const handleChange = location => event => {
        event.target.checked ? selectedLocations.append(location): selectedLocations.filter(l => l.name != location.name)
        setChosen(selectedLocations)
    }
    
    return (data ? (
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
                                        onChange={handleChange(location.name)}
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