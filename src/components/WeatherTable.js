import React from "react"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import Link from "@material-ui/core/Link"

import WeatherIconMapper from "../data/weatherIcons"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
    },
    paper: {
        marginTop: theme.spacing(3),
        width: "100%",
        overflowX: "auto",
        marginBottom: theme.spacing(2),
    },
    innerRow: {
        borderBottomWidth: 0,
        align: "right",
    },
    table: {
        minWidth: 650,
    },
}))

const SubstringInSet = (set, superstring) => {
    const filtered = set.filter(candidate => {
        return String(superstring).includes(candidate)
    })
    return filtered.length > 0 ? true : false
}

const filterDataByDate = data => {
    const keys = ["Fri", "Sat", "Sun", "Mon"]
    const filtered = data.map(location => {
        return {
            name: location.name,
            long: location.long,
            lat: location.lat,
            measurements: location.daily.filter(measurement => SubstringInSet(keys, measurement["timestamp"])),
        }
    })
    return filtered
}

const formatDate = date =>
    String(date)
        .split(" ")
        .slice(0, 3)
        .join(" ")

export const WeatherTable = props => {
    const { data } = props
    const classes = useStyles()
    const filteredData = filterDataByDate(data)
    const row = filteredData[0]
    const dates = row.measurements.map(measurement => formatDate(measurement["timestamp"]))
    return (
        <Paper className={classes.paper}>
            <Table aria-label="weather-table" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Location</TableCell>
                        {dates.map(date => (
                            <TableCell align="center">{date}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredData.map(row => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            {row.measurements.map(measurement => (
                                <TableCell align="right">
                                    <TableCell className={classes.innerRow} align="right">
                                        <Link
                                            target="_blank"
                                            rel="noopener"
                                            href={`https://darksky.net/forecast/${row.lat},${row.long}?units=si`}
                                        >
                                            {" "}
                                            {WeatherIconMapper(measurement.icon, 48, "#000")}
                                        </Link>
                                    </TableCell>
                                    <TableCell className={classes.innerRow} align="right">
                                        <TableRow align="right">
                                            {" "}
                                            <span style={{ fontWeight: "bold" }}>
                                                {" "}
                                                {Math.round(measurement.tempHigh)}{" "}
                                            </span>{" "}
                                        </TableRow>
                                        <TableRow align="right">
                                            {" "}
                                            <span> {Math.round(measurement.tempLow)} </span>
                                        </TableRow>
                                    </TableCell>
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    )
}
