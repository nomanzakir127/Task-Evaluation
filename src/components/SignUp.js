import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import { useFormik} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import MainPage from './MainPage';
import { Link } from 'react-router-dom';
import {
    isBrowser,
    isMobile
  } from "react-device-detect";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 50
  },
  btn:{
      float: 'right'
  },
  title:{
      marginTop:25
  },
  sText:{
    marginTop:25,
    color:'#3BA0DE'
  },
  linkColor:{
    color:'#3BA0DE' 
  }
});

export default function SignUp() {
  const classes = useStyles();
  const [location, setLocation] = useState('')
  const [device, setDevice] = useState('')
  const [ip, setIp] = useState('')
  const isloggedIn = useSelector(state => state.isloggedIn)
  const dispatch = useDispatch();

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(function(position) {
        let location = `Latitude: ${position.coords.latitude} longitude: ${position.coords.longitude}`
        setLocation(location)
        const internalIp = require('internal-ip');
       (async () => {
        setIp(await internalIp.v4());
       })();
       if(isMobile)
       {
           setDevice('Mobile')
       }
       else if(isBrowser){
        setDevice('Browser')
       }
      });
  },[])

  const formik = useFormik({
    initialValues:{
        main_email:"",
        main_password:"",
        con_password:""
    },
    onSubmit: (values) =>{
        console.log(values)
        newUserSignUp(values)
    },
    validate: values =>{
      let error = {}
        if(!values.main_email)
        {
          error.main_email = 'Email is required'
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.main_email)) {
          error.main_email = 'Invalid email address';
        }
        if(!values.main_password)
        {
          error.main_password ='Password is required'
        }
        if(!values.con_password)
        {
          error.con_password ='Confirm Password is required'
        }
        if(values.main_password !== values.con_password)
        {
          error.con_password ='Passwords did not match'
        }
        return error
    }
})

  const newUserSignUp = (values)=>{
    
    const userValues = { Email:values.main_email, Password:values.main_password, ConfirmPassword:values.con_password, IP:ip , Device:device, Location:location };
    console.log(JSON.stringify(userValues))

    var config = {
        headers: {
            'Content-Type': 'text/plain'
        }
    };

    axios.post(`https://spot.stable.trade/api/users`,  JSON.stringify(userValues), config )
      .then(res => {
        console.log(res);
        dispatch({type:'signUp', payload:userValues})
      }).catch(err=>console.log(err))
  }

  if(isloggedIn){
     return (<MainPage/>) 
  }

  return (
    <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
                <Card className={classes.root}>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}>
                                <Typography variant="h5" component="h2">
                                    Sign Up
                                </Typography>
                            </Grid>
                            <Grid item xs={4}></Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={4}>
                                <Typography color="textSecondary" className={classes.title} gutterBottom>
                                    Email
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField id="standard-basic" label="Email" id="main_email" onChange={formik.handleChange}/>
                                {formik.errors.main_email ? <div style={{color:'red'}}>{formik.errors.main_email}</div>: ''}
                            </Grid>
                        </Grid>  
                        <Grid container>
                            <Grid item xs={4}>
                                <Typography color="textSecondary" className={classes.title} gutterBottom>
                                    Password
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField id="standard-basic" label="Password" id="main_password" type="password" onChange={formik.handleChange}/>
                                {formik.errors.main_password? <div style={{color:'red'}}>{formik.errors.main_password}</div>: ''}
                            </Grid>
                        </Grid> 
                        <Grid container>
                            <Grid item xs={4}>
                                <Typography color="textSecondary" className={classes.title} gutterBottom>
                                    Confirm Password
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField id="standard-basic" label="Confirm Password" id="con_password" type="password" onChange={formik.handleChange}/>
                                {formik.errors.con_password? <div style={{color:'red'}}>{formik.errors.con_password}</div>: ''}
                            </Grid>
                        </Grid> 
                        <Grid container>
                            <Grid item xs={4}>
                                <Typography color="textSecondary" className={classes.title} gutterBottom>
                                    Already have account?
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography color="textSecondary" className={classes.sText} gutterBottom>
                                    <Link to='/login' className={classes.linkColor}>Login</Link>
                                </Typography>
                            </Grid>
                        </Grid>   
                    </CardContent>
                    <CardActions>
                        <Grid container>
                            <Grid item xs={6}></Grid>
                            <Grid item xs={4}>
                                <Button variant="outlined" color="primary" type="submit" className={classes.btn}>Sign Up</Button>
                            </Grid>
                            <Grid item xs={2}></Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={4}></Grid>
        </Grid>
    </form>
  );
}
