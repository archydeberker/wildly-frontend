import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"

import SearchPanel from "../components/google-maps/SearchPanel"
import { Grid, Paper } from "@material-ui/core"

import InputLabel from "@material-ui/core/InputLabel"
import ActivitiesSelector from "../components/ActivitiesSelector"
import { ThemeProvider } from "@material-ui/styles"

import { getLocations } from "../api/Get"
import { AddUser } from "../api/Post"

import { useAuth0 } from "../react-auth0-wrapper"

import allImages from "../helpers/backgrounds"
import { SuggestedLocations } from "../components/SuggestedLocations"
import theme from "../theme"

const styles = {
    paperContainer: {
        backgroundImage: `url(${allImages[Math.floor(Math.random() * allImages.length)]})`,
        height: "100vh",
        width: "100vw",
    },
}
export const useStyles = makeStyles(theme => ({
    root: {
        width: "90%",
        paddingLeft: "5%",
    },
    backButton: {
        marginRight: theme.spacing(1),
        marginLeft: "40%",
        align: "bottom",
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    filter: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        width: "300%",
    },
}))

function UserInfo(setLocation, setActivities) {
    return (
        <>
            <Grid item xs={12}>
                <div style={{ height: "300px", paddingBottom: "80px" }}>
                    <SearchPanel label="Where do you live?" placeholder="Montreal, QC" onSelect={setLocation} />
                </div>{" "}
            </Grid>
            <Grid item xs={12}>
                <InputLabel shrink color="primary" style={{ paddingTop: 25 }}>
                    What do you like to do outdoors?
                </InputLabel>
                <ActivitiesSelector onChange={value => setActivities(value)} />
            </Grid>
        </>
    )
}

function getSteps() {
    return ["About you", "Suggested locations"]
}

function GetStepTitle(stepIndex) {
    switch (stepIndex) {
        case 0:
            return "You're almost ready to get after it"
        case 1:
            return "Some locations you might like to add to Wildly"
    }
}
function GetStepContent(
    stepIndex,
    setUserHomeLocation,
    setLocations,
    setActivities,
    userHomeLocation,
    activities,
    locationList
) {
    switch (stepIndex) {
        case 0:
            return UserInfo(setUserHomeLocation, setActivities)
        case 1:
            return (
                <SuggestedLocations
                    userHomeLocation={userHomeLocation}
                    locationList={locationList}
                    activities={activities}
                    setChosen={setLocations}
                />
            )
        default:
            return "Unknown stepIndex"
    }
}

export default function HorizontalLabelPositionBelowStepper(props) {
    const { setOnboarded, onFinish } = props
    const { getTokenSilently, user } = useAuth0()
    const classes = useStyles()
    const steps = getSteps()

    const [activeStep, setActiveStep] = React.useState(0)
    const [userHomeLocation, setUserHomeLocation] = React.useState()
    const [userLocations, setLocations] = React.useState(null)
    const [userActivities, setActivities] = useState([])
    const [locationList, setLocationList] = useState([])

    useEffect(() => {
        getLocations(setLocationList)
    }, [userLocations])

    function handleFinish() {
        const location = {
            name: userHomeLocation[0].name ? userHomeLocation[0].name : userHomeLocation[0].vicinity,
            longitude: userHomeLocation[0].geometry.location.lng(),
            latitude: userHomeLocation[0].geometry.location.lat(),
            google_ref: userHomeLocation[0].place_id,
        }

        const data = { user: user, home_location: location, activities: userActivities, locations: userLocations }

        AddUser(onFinish, getTokenSilently, data)
        setOnboarded(true)
    }

    function handleNext() {
        setActiveStep(prevActiveStep => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1)
    }

    const handleReset = () => {
        setActiveStep(0)
    }

    return (
        <ThemeProvider theme={theme}>
            <Paper style={styles.paperContainer}>
                <Grid
                    container
                    spacing={16}
                    direction="row"
                    alignItems="center"
                    justify="center"
                    style={{ paddingTop: "2vh" }}
                >
                    <Grid item xs={6}>
                        <Card style={{ height: "95vh" }}>
                            <div className={classes.root}>
                                <Typography
                                    variant="h6"
                                    style={{ textAlign: "center", paddingTop: "20px", paddingBottom: "20px" }}
                                >
                                    {GetStepTitle(activeStep)}
                                </Typography>
                                <div>
                                    {activeStep === steps.length ? (
                                        <div>
                                            <Typography className={classes.instructions}>
                                                All steps completed
                                            </Typography>
                                            <Button onClick={handleReset}>Reset</Button>
                                        </div>
                                    ) : (
                                        <div>
                                            <Typography className={classes.instructions}>
                                                {GetStepContent(
                                                    activeStep,
                                                    setUserHomeLocation,
                                                    setLocations,
                                                    setActivities,
                                                    userHomeLocation,
                                                    userActivities,
                                                    locationList
                                                )}
                                            </Typography>
                                        </div>
                                    )}
                                </div>
                                <Stepper activeStep={activeStep} alternativeLabel>
                                    {steps.map(label => (
                                        <Step key={label}>
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.backButton}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={activeStep === steps.length - 1 ? handleFinish : handleNext}
                                    >
                                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>
        </ThemeProvider>
    )
}
