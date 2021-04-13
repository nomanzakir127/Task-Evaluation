import React from 'react'
import Login from './Login';
import {useSelector} from 'react-redux'
import SignUp from './SignUp';

function Home() {
  let isloggedIn = useSelector(state=>state.isloggedIn)
  return (
    <div>
      {isloggedIn ? <Login/> :<SignUp/>}
    </div>
  );
}

export default Home;