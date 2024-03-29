import React, { useEffect, useState } from 'react'
import './Banner.css'
import requests from './requests';
import axios from './axios';

function Banner() {

    const [movie,setmovie]=useState([]);

    useEffect(()=>{

        async function fetchData(){

           
            const request =await axios.get(requests.fetchTopRated);
            
            console.log(request);
            setmovie(
                request.data.results[
                    Math.floor(Math.random()*request.data.results.length-1)
                ]
            );
            return; 
        }

        fetchData();
    },[]);

    console.log(movie);


    function truncate(string,n){
        if(!string){
            return string;
        }
        return string.length>n? string.substring(0,n-1)+'...':string;
    }

  return (
    <header
        className="banner"
        style={{
            backgroundSize:"cover",
            backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
            // backgroundImage:'url("https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Black_flag.svg/1200px-Black_flag.svg.png")',
            backgroundPosition:"center center"
        }}>

            <div className='banner_contents'>

                
                <h1 className="banner_title">{movie?.title || movie?.name || movie?.original_name}</h1>
                <div className='banner_buttons'>
                    <button className='banner_button'>Play</button>
                    <button  className='banner_button'>My List</button>
                </div>
                {console.log(movie)}
                <h1 className='banner_description'> {truncate(movie?.overview,130)}</h1>

            </div>
 
            <div className='banner--fadeBottom'></div>
    </header>
  )
}

export default Banner