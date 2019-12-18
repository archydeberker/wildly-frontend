import Slider from "@material-ui/core/Slider"
import React, { useState } from "react"

const DistanceSlider = props => {
    const { defaultDistanceThreshold, handleSliderChange, orientation, ...others } = props

    return (
        <div style={{ marginLeft: 30, marginRight: 30 }}>
            <Slider
                defaultValue={defaultDistanceThreshold}
                orientation={orientation}
                step={10}
                min={0}
                max={1000}
                valueLabelDisplay="auto"
                color="secondary"
                marks={[
                    { value: 10, label: "10 Miles" },
                    { value: 1000, label: "1000 Miles" },
                ]}
                onChange={handleSliderChange}
                {...others}
            />
        </div>
    )
}

export default DistanceSlider
