import React, {Component} from 'react'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'

import postscribe from 'postscribe'
import Grid from '@material-ui/core/Grid'

class Weather extends Component{

  constructor(props){
     super()
     this.state = {id: props.id + props.type +'-div' + (Math.ceil(Math.random()*100)).toString(),
                  url: props.url,
                  type: props.type}
  }

  render(){
    return <Grid xs={6} flexGrow={1} alignSelf='center' style={{alignSelf: 'center', alignContents: 'center'}} id={this.state.id}>
    
    </Grid>
  }

  componentDidMount() 
  { 
    postscribe('#'+this.state.id,
    // '<script type="text/javascript" src="https://darksky.net/widget/small/43.0481,-76.1474/us12/en.js?width=undefined&title=Full Forecast&textColor=333333&bgColor=FFFFFF&skyColor=333&fontFamily=Default&customFont=&units=us"></script>'); }
    // "<script type='text/javascript' src='https://darksky.net/widget/default/42.360082,-71.05888/us12/en.js?width=200%&height=350&title=Full Forecast&textColor=333333&bgColor=FFFFFF&transparency=false&skyColor=undefined&fontFamily=Default&customFont=&units=us&htColor=333333&ltColor=C7C7C7&displaySum=no&displayHeader=no'></script>"
    this.state.url 
    );}
}


const Location = (props) => {
    return(
        <div>
            { props.location ? (
                <Card>
                <CardActionArea onClick={props.handleClickOpen} id={props.location.fields.title}>
                    <CardMedia style={{paddingTop: '56.25%', width: '100%', height: '100%'}}
                    image={props.location.fields.locationImage.fields.file.url}
                    title={props.location.fields.title}
                    />
                    <CardContent style={{width: '100%', height: '100%'}}>

                    <Typography gutterBottom variant="headline" component="h2">
                        {props.location.fields.title}
                    </Typography>
                    { props.location.fields.tags.map(tag => (
                                <Chip label={tag} className='chippy'/>
                            ))}
                    <Weather id={props.location.fields.title} url={props.location.fields.smallWeather}/>
                    </CardContent>  
                    <CardActions>
                    <Button size="small" color="primary" onClick={props.handleClickOpen}>
                        Go To Location
                    </Button>
                    </CardActions>
                    </CardActionArea>
                </Card>
            ) : null}
        </div>
    )
}

export default Location
export {Weather}
