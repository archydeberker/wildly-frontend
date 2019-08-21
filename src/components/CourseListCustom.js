import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import * as contentful from 'contentful'
import Course from '../components/Course'
import SimpleDialog from '../components/Alert'

function RandomEntry(){
            return ({fields:{title: Math.random().toString(),
                description: 'who knows', 
                courseImage: {fields: {file: {url: "https://source.unsplash.com/random"}}},
                url: 'www.google.com',
            }})}
        


class Client {

     getEntries(replicas) {console.log(replicas);

        const entries = () =>  ({items: Array(Math.ceil(Math.random()*10)).fill().map(()=>RandomEntry())})

        return new Promise(resolve => setTimeout(() => {
            resolve(entries())}
                            , 1000))
    }
}

const client = new Client()

client.getEntries(5).then(entries => console.log(entries)).catch(err => console.log('Problem'))

const emails = ['username@gmail.com', 'user02@gmail.com'];
class CourseList extends Component {
   
    constructor() {
        super()
        this.state = {
                    courses: [],
                    searchString: '',
                    open: false,
                    selectedValue: emails[1],
                }
        
        console.log(this.state)

        this.getCourses()

        console.log(this.state)

            }

    getCourses = () => {
        client.getEntries(Math.floor(Math.random()*10))
        .then((response) => {
            console.log(response.items)
            console.log(this.state.courses)
            this.setState({courses: response.items})
            console.log('State.courses:')
            console.log(this.state.courses)
        })
        .catch((error) => {
          console.log("Error occurred while fetching Entries")
          console.error(error)
        })
    }

    onSearchInputChange = (event) => {
        console.log("Search changed ..." + event.target.value)
        if (event.target.value) {
            this.setState({searchString: event.target.value})
        } else {
            this.setState({searchString: ''})
        }
        this.getCourses()
    }


    handleClickOpen = () => {
        console.log('OPening')
        this.setState({open: true});
    }

    handleClose = (value) => {
        this.setState({open: false,
            selectedValue: {value}})
    };

    render() {
        return (
            <div>
                { this.state.courses ? (
                    <div>
                        <TextField style={{padding: 24}}
                            id="searchInput"
                            placeholder="Search for Courses"   
                            margin="normal"
                            onChange={this.onSearchInputChange}
                            />
                        <Grid container spacing={6} style={{padding: 50}}>
                            { this.state.courses.map(currentCourse => (
                                <Grid item xs={12} sm={6} lg={4} xl={3}>
                                    <Course course={currentCourse} handleClickOpen={this.handleClickOpen}/>
                                </Grid>
                            ))}
                        </Grid>
                    <SimpleDialog selectedValue={this.state.selectedValue} open={this.state.open} onClose={this.handleClose} />
                    </div>
                ) : "No courses found" }
            
            </div>
        )
    }
}

export default CourseList;