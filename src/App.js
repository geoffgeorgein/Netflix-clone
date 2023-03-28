import React, { useEffect } from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
import Homescreen from './Homescreen';
import { auth } from './firebase';

import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  
  
} from "react-router-dom";
import LoginScreen from './LoginScreen';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './features/userSlice';
import { login,selectUser } from './features/userSlice';
import ProfileScreen from './ProfileScreen';

function App() {

  const user=useSelector(selectUser);
  console.log("User");
  console.log(user);
  const dispatch=useDispatch();
  

  useEffect(()=>{

    const unsubscribe=auth.onAuthStateChanged((userAuth)=>{

      if(userAuth){
        // console.log(userAuth);

        dispatch(login({
            uid:userAuth.uid,
            email:userAuth.email,
          })
        )
      }
      else{
        // 
        dispatch(logout());
      }
    });

    return unsubscribe;
  },[dispatch]);
  return (
    <div className="app">
    
    
    <Router>

    {
      !user ?<LoginScreen/>: (<Switch>
          <Route path="/profile" element={<ProfileScreen />}>
            {/* <ProfileScreen/> */}

          </Route>
          <Route exact path="/" element={<Homescreen/>}>
            
            

          </Route>
        </Switch>)
    }


        

      </Router>
      
    </div>
  );
}

export default App;
