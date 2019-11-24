import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Loading() {
    return (
    <div height='100vh' style={{verticalAlign:'middle', display:'block',
                                                      position: 'absolute', top: '50%', left: '50%'}}>
                                                        <CircularProgress color='primary'/></div>)
}