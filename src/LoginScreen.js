import React from 'react'
import { useState } from 'react';
import './LoginScreen.css'
import SignupScreen from './SignupScreen';

function LoginScreen() {

  const [signIn,setsignIn]=useState(false);
 
  return (
    <div className='loginScreen'>

      <div className='loginSvcreen_background'>

        <img 
        className='loginScreen_logo'
        src='https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png'
        alt='login_screen_logo'
        />
        <button className='loginScreen_button' onClick={()=>setsignIn(true)} >Sign In</button>

        <div className='loginScreen_gradient' ></div>
       
      </div>
      <div className='loginScreen_body'>

      {signIn? <SignupScreen/> : ( 
        <>
        <h1> Unlimited films ,TV Programmes and more.</h1>
        <h2> Watch Anywhere , Cancel Anytime </h2>
        
        <h3>Ready to watch? Enter your email to create or restart your membership</h3>

        <div className='loginScreen_input'>
          <form>
            <input type="email" placeholder='Email Address'  />
            <button className='loginScreen_getStarted' onClick={()=>setsignIn(true)} > GET STARTED</button>
          </form>
        </div>
        </>)}
       

      </div>
    </div>
  )
}

export default LoginScreen