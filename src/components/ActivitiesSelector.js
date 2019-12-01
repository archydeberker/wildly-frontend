import React from 'react';
import Select from 'react-select'
import activities from '../data/activities';

export default function ActivitiesSelector(props){
    const {onChange, ...otherProps} = props
    return (<Select
            isMulti
            label="activities"
            options={activities}
            className="basic-select"
            classNamePrefix="select"
            onChange={onChange}
            style={{paddingTop: 200},
            {otherProps}}
/> 
    )
}