import React, {Component} from 'react'
import postscribe from 'postscribe'
import Grid from '@material-ui/core/Grid'

export default class DarkSkyMap extends Component{

    constructor(props){
       super()
       console.log(props)
       this.state = {id: props.id + props.type +'-div' + (Math.ceil(Math.random()*100)).toString(),
                    url: props.url}
    }
  
    render(){
      return <Grid xs={12} flexGrow={1} alignSelf='center' style={{alignSelf: 'center', alignContents: 'center'}} id={this.state.id}>
      
      </Grid>
    }
  
    componentDidMount() 
    { 
      postscribe('#'+this.state.id,
      this.state.url 
      );}
  }