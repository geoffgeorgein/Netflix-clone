import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import './Nav.css';


function Nav() {

  const [show,handleshow]=useState(false);
  const history=useHistory();

  const transitionNavbar=()=>{

    if(window.scrollY>100){
      handleshow(true);
    }
    else{
      handleshow(false);
    }
  }

  useEffect(()=>{

    window.addEventListener("scroll",transitionNavbar)
  },[])

  


  return (
    <div className={`nav ${show && "nav_black"}`}>

        <div className='nav_contents'>
            <img className='nav_logo' src='https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png' alt='logo' />

            <img  onClick={()=>{history.push("/profile")}} className='nav_avatar' src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'  alt='avatar'/> 

        </div>
        



    
    </div>
  )
}

export default Nav