import React from "react"
import Plot from "react-plotly.js"

export const PrecipGraph = props => {
    const { data, field, yaxis, width } = props
    // rainfall classification from https://en.wikipedia.org/wiki/Rain
    const light_rain = 0
    const mod_rain = -2.5
    const heavy_rain = -7.6
    const rain_lines = [light_rain, mod_rain, heavy_rain]
    const rain_annotations = [
        [mod_rain, "Moderate rain"],
        [heavy_rain, "Heavy rain"],
    ]

    //snowfall classification from https://www.weather.gov/buf/Snowfall_Rate_Threat_Loop
    const light_snow = 0
    const mod_snow = 10
    const heavy_snow = 20
    const snow_lines = [light_snow, mod_snow, heavy_snow]
    const snow_annotations = [
        [mod_snow, "Moderate snow"],
        [heavy_snow, "Heavy snow"],
    ]
    return (
        <Plot
            style={{ width: "98%", height: "100%" }}
            data={data.map(location => {
                return {
                    x: location[field]["x"],
                    y: location[field]["y"],
                    type: "scatter",
                    mode: "lines",
                    fill: "tozeroy",
                    name: location["name"],
                }
            })}
            layout={{
                autosize: true,
                yaxis: {
                    title: yaxis,
                    font: {
                        family: "Roboto",
                        size: 36,
                    },
                    showgrid: false,
                    range: [-10, 25],
                },
                xaxis: {
                    tickformat: "%I%p \n %a %b-%e %Y",
                    showgrid: false,
                },
                font: {
                    family: "Roboto",
                },
                margin: {
                    t: 50,
                    b: 50,
                    l: 50,
                    r: 50,
                },
                legend: {
                    x: 0,
                    y: 1,
                    bgcolor: null,
                    orientation: "h",
                },
                shapes: rain_lines
                    .map(mm => {
                        return {
                            type: "rect",
                            xref: "paper",
                            x0: 0,
                            y0: mm,
                            x1: 1,
                            y1: -10,
                            fillcolor: "rgb(50, 150, 255)",
                            text: ["Rain"],
                            opacity: 0.05,
                            line: {
                                width: 0,
                            },
                        }
                    })
                    .concat(
                        snow_lines.map(mm => {
                            return {
                                type: "rect",
                                xref: "paper",
                                x0: 0,
                                y0: Math.abs(mm),
                                x1: 1,
                                y1: 25,
                                fillcolor: "rgb(50, 150, 255)",
                                text: ["Snow"],
                                opacity: 0.05,
                                line: {
                                    width: 0,
                                },
                            }
                        })
                    ),
                annotations: rain_annotations
                    .map(arr => {
                        const mm = arr[0]
                        const text = arr[1]
                        return {
                            x: 1,
                            y: mm - 0.2,
                            xref: "paper",
                            yref: "y",
                            text: text,
                            size: 25,
                            showarrow: false,
                            font: {
                                size: 16,
                                color: "#000051",
                            },
                        }
                    })
                    .concat(
                        snow_annotations.map(arr => {
                            const mm = arr[0]
                            const text = arr[1]
                            return {
                                x: 1,
                                y: mm + 0.2,
                                xref: "paper",
                                yref: "y",
                                text: text,
                                size: 25,
                                showarrow: false,
                                font: {
                                    size: 16,
                                    color: "#000051",
                                },
                            }
                        })
                    ),
            }}
        />
    )
}
