import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"

import "./App.css"
import { LocationAdd } from "./components/NewLocation"
import SearchPanel from "./components/google-maps/SearchPanel"

import { MainApp } from "./pages/MainApp"
import Splash from "./pages/Splash"

import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"

import { CheckOnboarding, CheckTouring, SetTouring } from "./api/Post"
import { useAuth0 } from "./react-auth0-wrapper"

import Loading from "./components/Loading"

require("dotenv").config()

export function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    )
}

export function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    }
}

function AppRouter() {
    const { loading, isAuthenticated, getTokenSilently, user } = useAuth0()
    const [isOnboarded, setOnboarded] = useState()
    const [hasToured, setHasToured] = useState()

    const handleTourFinish = () => SetTouring(console.log, getTokenSilently, { user: user })

    useEffect(() => {
        if (!loading) {
            CheckOnboarding(setOnboarded, getTokenSilently, user)
            CheckTouring(setHasToured, getTokenSilently, { user: user })
        }
    }, [loading, hasToured])

    if (loading) {
        return <Loading />
    }

    return (
        <Router>
            <div>
                <Route exact path="/">
                    {" "}
                    {!isAuthenticated ? (
                        <Redirect to="/splash" />
                    ) : (
                        <MainApp
                            isOnboarded={isOnboarded}
                            setOnboarded={setOnboarded}
                            hasToured={hasToured}
                            setHasToured={setHasToured}
                            handleTourFinish={handleTourFinish}
                        />
                    )}
                </Route>
                <Route exact path="/splash">
                    {" "}
                    {isAuthenticated ? <Redirect to="/" /> : <Splash />}
                </Route>
                <Route path="/location" component={LocationAdd} />
                <Route path="/search" component={SearchPanel} />
            </div>
        </Router>
    )
}

export default AppRouter
