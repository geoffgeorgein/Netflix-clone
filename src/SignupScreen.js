import React from 'react'
import { useRef } from 'react';
import './SignupScreen.css'
import { auth } from './firebase';
//  import { createUserWithEmailAndPassword } from "firebase/auth";

 
 
function SignupScreen() {

  const emailRef=useRef(null);
  const passwordRef=useRef(null);

  const register=(e)=>{
    e.preventDefault();
    console.log("Register clicked")
    console.log(passwordRef);

    auth.createUserWithEmailAndPassword(
      
      emailRef.current.value,
      passwordRef.current.value
    ) 
    .then((authUser)=>{
      console.log(authUser);
    })
    .catch((error)=>{
      alert(error.message);
    })
 
  };

  const signIn =(e)=>{
    e.preventDefault();

    auth.signInWithEmailAndPassword(
      
      emailRef.current.value,
      passwordRef.current.value
    ) 
    .then((authUser)=>{
      console.log(authUser);
    })
    .catch((error)=>{
      alert(error.message);
    })
  }

  return (
    <div className='signupScreen'>
        <form>
            <h1 className='signup_title'>Sign Up</h1>
            <input  ref={emailRef} type='Email' placeholder='Email'></input>
            <input ref={passwordRef}  type='password' placeholder='password'></input>
            <button type='submit' onClick={signIn} >Sign In</button>

            <h4> <span className='signupScreen_gray'>New to Netflix. </span> 
            <span className='signupScreen_link' onClick={register} >SignUp</span>
             </h4>
        </form>
    </div>
  )
}

export default SignupScreen;