import React, { useEffect, useState } from 'react'
import axios from 'axios';
//import moviesNowPlayinghowcase from '../components/moviesNowPlayinghowcase'
//import SearchBar from '../components/SearchBar'
import MovieCard from '../components/MovieCard.js'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



function Home() {
  const apiUrl = 'https://api.themoviedb.org/3'
  const my_api_key = 'e6c2230b40aa82b543cc9035099cf2ff'
  const [moviesNowPlaying, setmoviesNowPlaying] = useState([])
  const [moviesTopRated, setmoviesTopRated] = useState([])
  const [moviesTrending, setmoviesTrending] = useState([])

  const trending = async () => {
    const fetchedTrending = await axios.get(`${apiUrl}/trending/movie/${'week'}`, {
      params: {
        api_key: my_api_key
      }
    })
    setmoviesTrending(fetchedTrending.data.results)
  }

  const nowPlaying = async () => {
    const fetchedNowPlaying = await axios.get(`${apiUrl}/movie/now_playing`, {
      params: {
        api_key: my_api_key
      }
    })
    setmoviesNowPlaying(fetchedNowPlaying.data.results)
  }

  const topRated = async () => {
    const fetchedTopRated = await axios.get(`${apiUrl}/movie/top_rated`, {
      params: {
        api_key: my_api_key
      }
    })
    setmoviesTopRated(fetchedTopRated.data.results)
  }

  useEffect(() => {
    nowPlaying()
    topRated()
    trending()
  }, [])

  const rendermoviesTrending = () => (
    moviesTrending.map(movie => (
      <MovieCard isTrending={true}
        key={movie.id}
        movie={movie}
      />
    ))
  )

  const rendermoviesNowPlaying = () => (
    moviesNowPlaying.map(movie => (
      <MovieCard 
        key={movie.id}
        movie={movie}
      />
    ))
  )

  const rendermoviesTopRated = () => (
    moviesTopRated.map(movie => (
      <MovieCard 
        key={movie.id}
        movie={movie}
      />
    ))
  )

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 7
    },
    desktop: {
      breakpoint: { max: 3000, min: 2000 },
      items: 6
    },
    smalldesktop: {
      breakpoint: { max: 2000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1
    }
  };

  const responsiveTrending = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 2
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const itemStyle = {
    padding: '10px' ,
    width: '5px',
  }











  return (

    <div className='home'>

    <div className='movie-section'>

      <div className='movie-showcase'>
        <h1 className='headline'>Trending</h1>
        <Carousel responsive={responsiveTrending} partialVisible={false} infinite={true} itemClass="carousel-item">
        {rendermoviesTrending()}
        </Carousel>
      </div>

      <div className='movie-showcase'>
        <h1 className='headline'>Now playing</h1>
        <Carousel responsive={responsive} partialVisible={false} infinite={true} itemClass="carousel-item">
        {rendermoviesNowPlaying()}
        </Carousel>
      </div>

      <div className='movie-showcase'>
        <h1 className='headline'>Top Rated</h1>
        <Carousel responsive={responsive}  partialVisible={false} infinite={true} itemClass="carousel-item">
          {rendermoviesTopRated()}
        </Carousel>
      </div>

      </div>


  
    </div>
  )
}

export default Home

