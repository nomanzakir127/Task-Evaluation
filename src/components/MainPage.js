import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MainPage() {
  const classes = useStyles();
  let isloggedIn = useSelector(state => state.isloggedIn)
  let dispatch = useDispatch()
  let navigate = useNavigate()

  const axiosHandler = axios.create({
    baseURL: "https://spot.stable.trade/api/users/self",
    headers:{
      
    }
  })

  fetch(axiosHandler.post()).then(res=>{
      if(res.status === 200)
      {
          console.log(res)
        //dispatch({type:'signUp', payload:userValues})
      }
  })
  if(!isloggedIn){
    navigate('/login')
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Welcome
          </Typography>
          <PowerSettingsNewIcon onClick={()=>dispatch({type:'logout'})}/>
        </Toolbar>
      </AppBar>
    </div>
  );
}
