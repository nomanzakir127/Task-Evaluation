import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { useFormik} from 'formik'
import axios from 'axios'

import {
    isBrowser,
    isMobile
  } from "react-device-detect";
import MainPage from './MainPage';

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

export default function Login() {
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
        main_password:""
    },
    onSubmit: (values) =>{
        console.log(values)
        userLogin(values)
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
        return error
    }
})

function userLogin(values){
    const userValues = { Email:values.main_email, Password:values.main_password, IP:ip, Location:location, Device:device };
    const axiosHandler = axios.create({
        baseURL: "https://spot.stable.trade/api/users/accessToken",
        headers:{
          
        },
        data: JSON.stringify(userValues)
      })
      fetch(axiosHandler.post()).then(res=>{
          if(res.status === 200)
          {
            dispatch({type:'signUp', payload:userValues})
          }
      })
}

//console.log(isloggedIn)
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
                                    Login
                                </Typography>
                            </Grid>
                            <Grid item xs={4}></Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={4}>
                                <Typography color="textSecondary" className={classes.title} gutterBottom>
                                    Name
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
                                <TextField id="standard-basic" label="Enter Password" type="password" id="main_password" onChange={formik.handleChange}/>
                                {formik.errors.main_password ? <div style={{color:'red'}}>{formik.errors.main_password}</div>: ''}
                            </Grid>
                        </Grid> 
                        <Grid container>
                            <Grid item xs={4}>
                                <Typography color="textSecondary" className={classes.title} gutterBottom>
                                    New User?
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography color="textSecondary" className={classes.sText} gutterBottom>
                                <Link to='/signup' className={classes.linkColor}>Sign Up</Link>
                                </Typography>
                            </Grid>
                        </Grid>   
                    </CardContent>
                    <CardActions>
                        <Grid container>
                            <Grid item xs={8}></Grid>
                            <Grid item xs={2}>
                                <Button variant="outlined" type="submit" color="primary" className={classes.btn}>Login</Button>
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
