import React, { useState } from 'react'
import useForm from './useForm'
import {makeStyles} from '@material-ui/core/styles'
import IntlTelInput from 'react-intl-tel-input'
import'react-intl-tel-input/dist/main.css'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import SendSharpIcon from '@material-ui/icons/SendSharp'
import {
    Typography,
    Button,
    Grid,
    Checkbox,
    TextField,
    OutlinedInput,
    FormControl,
    InputLabel,
    InputAdornment,
    IconButton,
} from '@material-ui/core'

const useStyles = makeStyles({
    mainContainer:{
        display:'grid',
        justifyContent:'center',
        position:'relative',
        zIndex: 5
    },
    formContainer:{
        position:'relative',
        width:'28.125rem',
        height:"auto",
        padding:"2rem"
    },
    inputField:{
        width:"100%",
        margin:"1rem 0"
    },
    btn:{
        width:'100%',
        height:'3rem',
        background:'red',
        color:'#fff',
        "&:hover":{
            background:'red',
            opacity:".7",
            transition:"0.3s ease-in-out"
        }
    },
    disabledBtn:{
        background:"rgba(0,0,0,0.38)",
        width:"100%",
        height:"3rem"
    }
})



const StepOne = ({activeStep, handleNext, steps}) => {

    //Define the state schema
    const stateSchema = {
        firstname:{value:"" , error:""},
        lastname:{value:"" , error:""},
        email:{value:"" , error:""},
        password:{value:"" , error:""},
        confirmPassword:{value:"" , error:""}
    }

    const stateValidatorSchema ={
        firstname:{
            required:true,
            validator:{
                func: value=> /^([A-Za-z][A-Za-z'-])+([A-Za-z][A-Za-z'-]+)*/.test(value),
                error:"firstname must be more than one character"
            }
        },
        lastname:{
            required:true,
            validator:{
                func: value=> /^([A-Za-z][A-Za-z'-])+([A-Za-z][A-Za-z'-])+([A-Za-z][A-Za-z'-])*/.test(value),
                error:"lastname must be more than 3 characters"
            }
        },
        email:{
            required:true,
            validator:{
                func: value=> /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(value),
                error:"invalid email format"
            }
        },
        password:{
            required:true,
            validator:{
                func: value=> /^(?=.*[A-Za-z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(value),
                error:"password must be up to 6 characters and contain atleast one special character e.g '@,#,$,%,^,&,?,>,<'"
            }
        }
    }

    const {values, errors, dirty, handleOnChange} = useForm(stateSchema, stateValidatorSchema)

    const [showPasswordValue, setShowPasswordValue] = useState({
        showPassword:false
    })

    const [showConfirmPasswordValue, setShowConfirmPasswordValue] = useState({
        showConfirmPassword:false
    })

    const handleShowPassword = () => {
        setShowPasswordValue({
            showPassword: !showPasswordValue.showPassword
        })
    }
    const handleShowConfirmPassword = () => {
        setShowConfirmPasswordValue({
            showConfirmPassword: !showConfirmPasswordValue.showConfirmPassword
        })
    }

    const {firstname, lastname, email, password , confirmPassword} = values;

    const classes = useStyles();

    return (
        <div className={classes.mainContainer}>
            <Typography variant='h5' style={{color:"#999",textAlign:'center'}}>
                Sign Up with Email
            </Typography>
            <div className={classes.formContainer}>
                <form >  
                    <TextField 
                    className={classes.inputField} 
                    label="first name" 
                    variant="outlined"
                    name='firstname'
                    value={firstname}
                    onChange={handleOnChange}
                    />
                    {errors.firstname && dirty.firstname && (
                        <Typography style={{color:'red',fontWeight:"200"}}>{errors.firstname}</Typography>
                    )}
                    <TextField 
                    className={classes.inputField} 
                    label="last name" 
                    variant="outlined"
                    name="lastname"
                    value={lastname}
                    onChange={handleOnChange}
                    />
                    {errors.lastname && dirty.lastname && (
                        <Typography style={{color:'red',fontWeight:"200"}}>{errors.lastname}</Typography>
                    )}
                    <IntlTelInput preferredCountries={["ru"]} />
                    <TextField 
                    className={classes.inputField} 
                    label="Email" 
                    variant="outlined"
                    name="email"
                    value={email}
                    onChange={handleOnChange}
                    />
                    {errors.email && dirty.email && (
                        <Typography style={{color:'red',fontWeight:"200"}}>{errors.email}</Typography>
                    )}
                    <FormControl className={classes.inputField} variant='outlined'>
                        <InputLabel>Password</InputLabel>
                        <OutlinedInput 
                        labelWidth={70}
                        name="password"
                        value={password}
                        onChange={handleOnChange}
                        type={showPasswordValue.showPassword ? "text" : "password"}
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton edge='end' onClick={handleShowPassword}>
                                    {showPasswordValue.showPassword ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        }
                        />
                        {errors.password && dirty.password && (
                        <Typography style={{color:'red',fontWeight:"200"}}>{errors.password}</Typography>
                        )}
                    </FormControl>

                    <FormControl className={classes.inputField} variant='outlined'>
                        <InputLabel>Confirm Password</InputLabel>
                        <OutlinedInput 
                        labelWidth={140}
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleOnChange}
                        type={showConfirmPasswordValue.showConfirmPassword ? "text" : "password"}
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton edge='end' onClick={handleShowConfirmPassword}>
                                    {showConfirmPasswordValue.showConfirmPassword ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        }
                        />
                        {confirmPassword !== password ? (<Typography style={{color:'red',fontWeight:"200"}}>Passwords do not match</Typography>):null}
                    </FormControl>
                    {
                        !firstname ||
                        !lastname ||
                        !password ||
                        !confirmPassword || confirmPassword !== password ?
                        (
                            <Button className={classes.disabledBtn}
                            variant='contained' 
                            type='submit'
                            disabled 
                            className={classes.btn} 
                            onClick={handleNext}
                            endIcon={
                                <SendSharpIcon />
                            }>
                                {activeStep === steps.length ? "Finish" : "ontinue"}
                            </Button>
                        ) : (
                            <Button
                            variant='contained' 
                            type='submit'
                            className={classes.btn} 
                            onClick={handleNext}
                            endIcon={
                                <SendSharpIcon />
                            }>
                                {activeStep === steps.length ? "Finish" : "Continue"}
                            </Button>
                        )
                    }
                    
                </form>
            </div>
        </div>
    )
}

export default StepOne
