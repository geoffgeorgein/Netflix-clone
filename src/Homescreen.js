import React from 'react'
import './Homescreen.css';
import Nav from './Nav';
import Banner from './Banner';
import Row from './Row';
import requests from './requests';

function Homescreen() {
  return (
    <div>
        <Nav/>

        <Banner/>

        <Row title="Trending Now " fetchUrl={requests.fetchTrending} isLargeRow/>

        <Row title="Top Rated " fetchUrl={requests.fetchTopRated} isLargeRow/>
        <Row title="Action Movies " fetchUrl={requests.fetchActionMovies} isLargeRow />

        <Row title="Horror " fetchUrl={requests.fetchHorrorMovies} isLargeRow/>
        <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} isLargeRow />
        <Row title="Romance Movies " fetchUrl={requests.fetchRomanceMovies} isLargeRow />
        <Row title="Documentaries " fetchUrl={requests.fetchDocumentaries} isLargeRow />

    </div>
    
  )
}

export default Homescreen