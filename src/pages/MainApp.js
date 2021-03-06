import React, { useState, useEffect } from "react"
import NavBar from "../components/NavBar"
import FooterBar from "../components/BaseBar"

import theme from "../theme"
import LocationGrid from "../components/LocationGrid"
import Graph from "./Graphs"
import WeatherComparison from "./Comparison"

import { ThemeProvider } from "@material-ui/styles"
import Tabs from "@material-ui/core/Tabs"
import PhoneIcon from "@material-ui/icons/Phone"
import Tab from "@material-ui/core/Tab"
import { useAuth0 } from "../react-auth0-wrapper"
import { RetrieveUserLocations, GetUserHome } from "../api/Post.js"
import { getActivities, getLocations, getUserLocations } from "../api/Get.js"
import { GetWeatherForecast } from "../api/GetWeatherForecast"

import { a11yProps, TabPanel } from "../App"
import SignUp from "./SignUp"
import Loading from "../components/Loading"
import Joyride from "react-joyride"
import { blurbs } from "../data/tour"
import { AddLocationButton } from "../components/AddLocationButton"
import { DiscoverLocationButton } from "../components/DiscoverLocationButton"

import DiscoverPanel from "./DiscoverMap"

const joyrideStyle = {
    backgroundColor: "#fff",
    beaconSize: 36,
    overlayColor: "rgba(0, 0, 0, 0.5)",
    primaryColor: "#004d40",
    spotlightShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
    width: undefined,
    zIndex: 100,
}

export const MainApp = props => {
    const { isOnboarded, setOnboarded, hasToured, handleTourFinish } = props

    const [tabValue, setTabValue] = useState(0)
    const [locationList, setLocationList] = useState([])
    const [allLocationList, setAllLocationList] = useState([])
    const [userHome, setUserHome] = useState()
    const { loading, getTokenSilently, user } = useAuth0()
    const [weatherData, setWeatherData] = useState(null)

    const handleChange = (e, newValue) => {
        setTabValue(newValue)
    }

    const getLocationList = setLocationList => {
        RetrieveUserLocations(setLocationList, getTokenSilently, user)
    }

    const getAllLocationList = setAllLocationList => {
        getLocations(setAllLocationList)
    }

    const getUserHome = setUserHome => {
        GetUserHome(setUserHome, getTokenSilently, user)
    }

    const walkThroughCallback = data => {
        if ((data.action === "next") & (data.index === 3)) handleTourFinish()
    }

    let locations = locationList.map(location => {
        return {
            name: location["name"],
            long: location["long"],
            lat: location["lat"],
        }
    })

    useEffect(() => {
        if (!loading) {
            getLocationList(setLocationList)
            getAllLocationList(setAllLocationList)
            getUserHome(setUserHome)
        }
    }, [loading])

    useEffect(() => {
        if (locationList.length > 0) {
            GetWeatherForecast(locations, setWeatherData)
        }
    }, [locationList])

    const steps = [
        {
            target: ".locations",
            content: blurbs["locations"],
            event: "hover",
        },
        {
            target: ".rain_graph",
            content: blurbs["rain"],
            event: "hover",
        },
        {
            target: ".compare",
            content: blurbs["weather"],
            event: "hover",
        },
        {
            target: ".discover",
            content: blurbs["discover"],
            event: "hover",
        },
        {
            target: ".add-location",
            content: blurbs["new_location"],
            event: "hover",
        },
    ]
    if (isOnboarded === false) {
        return <SignUp setOnboarded={setOnboarded} onFinish={() => getLocationList(setLocationList)} />
    }

    if (isOnboarded) {
        return (
            <ThemeProvider theme={theme}>
                <div className="app" style={{ minHeight: "calc(100vh - 50px)" }}>
                    <header>
                        <NavBar />
                    </header>
                    <Tabs
                        value={tabValue}
                        onChange={handleChange}
                        variant="fullWidth"
                        indicatorColor="secondary"
                        textColor="black"
                        aria-label="icon label tabs example"
                        TabIndicatorProps={{ style: { height: "4px" } }}
                    >
                        <Tab className="locations" label="Your Locations" {...a11yProps(0)} />
                        <Tab className="rain_graph" label="Precipitation Graph" {...a11yProps(1)} />
                        <Tab className="compare" label="Compare Weather" {...a11yProps(2)} />
                        <Tab className="discover" label="Discover New Locations" {...a11yProps(3)} />
                    </Tabs>
                    <TabPanel value={tabValue} index={0} icon={<PhoneIcon />}>
                        <LocationGrid
                            locationList={locationList}
                            getLocationList={getLocationList}
                            setLocationList={setLocationList}
                        />
                    </TabPanel>
                    <TabPanel value={tabValue} index={1} icon={<PhoneIcon />}>
                        <Graph
                            locationList={locationList}
                            getLocationList={getLocationList}
                            setLocationList={setLocationList}
                        />
                    </TabPanel>
                    <TabPanel value={tabValue} index={2} icon={<PhoneIcon />}>
                        <WeatherComparison
                            weatherData={weatherData}
                            getLocationList={getLocationList}
                            setLocationList={setLocationList}
                        />
                    </TabPanel>
                    <TabPanel value={tabValue} index={3}>
                        <DiscoverPanel
                            userHome={userHome}
                            locationList={locationList}
                            allLocationList={allLocationList}
                            user={user}
                            getTokenSilently={getTokenSilently}
                            refreshLocations={() => {
                                {
                                    console.count("refresh")
                                }
                                getLocationList(setLocationList)
                            }}
                        />
                    </TabPanel>
                    <div>
                        <AddLocationButton setLocationList={setLocationList} getLocationList={getLocationList} />
                    </div>
                    {!hasToured && (
                        <Joyride
                            steps={steps}
                            continuous={true}
                            locale={{ back: "Back", close: "Close", last: "Finish", next: "Next", skip: "Skip" }}
                            callback={walkThroughCallback}
                            styles={{ options: joyrideStyle }}
                        />
                    )}
                </div>
                <FooterBar />
            </ThemeProvider>
        )
    }

    return <Loading />
}
