import React, {Component} from 'react';
import './App.css';
import NavBar from './components/NavBar'
import theme from './theme'
import { ThemeProvider } from '@material-ui/styles';
import CourseList from './components/CourseListCustom'


class App extends Component {
  render () 
{ return (
  <ThemeProvider theme={theme}><div> <NavBar/>  <CourseList/> </div></ThemeProvider>)}}

//  
export default App;
