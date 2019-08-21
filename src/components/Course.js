import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase';

const Course = (props) => {
    return(
        <div>
            { props.course ? (
                <Card >
                <CardActionArea onClick={props.handleClickOpen}>
                    <CardMedia style={{paddingTop: '56.25%', width: '100%', height: '100%'}}
                    image={props.course.fields.courseImage.fields.file.url}
                    title={props.course.fields.title}
                    />
                    <CardContent style={{width: '100%', height: '100%'}}>
                    <Typography gutterBottom variant="headline" component="h2">
                        {props.course.fields.title}
                    </Typography>
                    <Typography component="p">
                        {props.course.fields.description}
                    </Typography>
                    </CardContent>
                    
                    <CardActions>
                    <Button size="small" color="primary" href={props.course.fields.url} target="_blank">
                        Go To Course
                    </Button>
                    </CardActions>
                    </CardActionArea>
                </Card>
            ) : null}
        </div>
    )
}

export default Course
