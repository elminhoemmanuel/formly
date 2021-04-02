import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Stepper, Step, StepLabel, Typography, Button} from '@material-ui/core'
import StepOne from './StepOne'

const useStyles = makeStyles({
    root: {
        width: "50%",
        margin: "6rem auto",
        border:"1px solid #999",
        "& .MuiStepIcon-root.MuiStepIcon-active" :{
            color:"red"
        },
        "& .MuiStepIcon-root.MuiStepIcon-completed" :{
            color:"red"
        }
    }
})

const MultistepForm = () => {

    //React hooks used 
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () =>{
        setActiveStep (prevActiveStep => prevActiveStep +1);
    }

    const getSteps = () =>{
        return ["SIGN UP", "CHOOSE PLAN", "CHECKOUT"];
    }

    const steps = getSteps();

    const getStepsContent = (stepIndex) =>{
        switch (stepIndex) {
            case 0:
                return <StepOne handleNext={handleNext} activeStep={activeStep} steps={steps}/>
            case 1:
                return "Step two- CHOOSE PLAN"
            case 2:
                return "Step three- CHECKOUT"
            default:
                return "UNKNOWN STEP"
        }
    }

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Stepper  activeStep={activeStep} alternativeLabel>
                {steps.map(item =>{
                    return <Step key={item}>
                    <StepLabel>
                        {item}
                    </StepLabel>
                </Step>
                })}
                <br/>
            </Stepper>

            <>
                    
                    {activeStep === steps.length ? "The steps are done" : (
                    <>
                        {getStepsContent(activeStep)}

                    </>
                    )}
            </>
            
            
        </div>
    )
}

export default MultistepForm
