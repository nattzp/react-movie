import React, { useEffect, useState } from 'react'
import axios from 'axios';
//import moviesNowPlayinghowcase from '../components/moviesNowPlayinghowcase'
//import SearchBar from '../components/SearchBar'
import MovieCard from '../components/MovieCard.js'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineCloseCircle } from "react-icons/ai";


function Home() {
  const apiUrl = 'https://api.themoviedb.org/3'
  const my_api_key = 'e6c2230b40aa82b543cc9035099cf2ff'
  const [moviesNowPlaying, setmoviesNowPlaying] = useState([])
  const [moviesTopRated, setmoviesTopRated] = useState([])
  const [moviesTrending, setmoviesTrending] = useState([])
  const [currentPopupObject, setcurrentPopupObject] = useState([])
  const [popupContentId, setPopupContentId] = useState([])
  const [modalShow, setmodalShow] = useState(false);
  const[loadingPopupContent, setloadingPopupContent] = useState(true)


  const trending = async () => {
    const fetchedTrending = await axios.get(`${apiUrl}/trending/movie/${'week'}`, {
      params: {
        api_key: my_api_key //todo hitta sätt att få trailer och credits
      }
    })
    setmoviesTrending(fetchedTrending.data.results)
  }

  const nowPlaying = async () => {
    const fetchedNowPlaying = await axios.get(`${apiUrl}/movie/now_playing`, {
      params: {
        api_key: my_api_key,
        
      }
    })
    setmoviesNowPlaying(fetchedNowPlaying.data.results)
  }

  const topRated = async () => {
    const fetchedTopRated = await axios.get(`${apiUrl}/movie/top_rated`, {
      params: {
        api_key: my_api_key,
        //append_to_response: 'videos, credits'
      }
    })
    setmoviesTopRated(fetchedTopRated.data.results)
  }

  const currentPopupMovie = async () => {
    setloadingPopupContent(true)
    const fecthedData = await axios.get(`${apiUrl}/movie/${popupContentId}`, {
      params: {
        api_key: my_api_key,
        append_to_response: 'credits,videos'
      }
    })
    setcurrentPopupObject(fecthedData.data)
    setloadingPopupContent(false)
    //console.log(currentPopupObject.credits.cast)
    
  }

  useEffect(() => {
    nowPlaying()
    topRated()
    trending()
    
  }, [])

  useEffect(() => {
    currentPopupMovie()

    console.log(currentPopupObject)
    
  },[popupContentId])





  const handleClick= (movie)=>{
        setPopupContentId(movie.id) 
        setmodalShow(true)

    }


 
const popupStyle = {
  visibility: modalShow && 'visible'
}

  const rendermoviesTrending = () => (
    moviesTrending.map(movie => (
      <div className='movie-card-wrapper' key = {movie.id} onClick={() => handleClick(movie)}>
      <MovieCard isTrending={true}
        key={movie.id}
        movie={movie}
        onClick={() => handleClick(movie)}
      />
      </div>
    ))
  )

  const rendermoviesNowPlaying = () => (
    moviesNowPlaying.map(movie => (
      <div className='movie-card-wrapper' key = {movie.id}  onClick={() => handleClick(movie)}>
      <MovieCard 
        key={movie.id}
        movie={movie}
      />
      </div>
    ))
  )

  const rendermoviesTopRated = () => (
    moviesTopRated.map(movie => (
      <div className='movie-card-wrapper' key = {movie.id} onClick={() => handleClick(movie)}>
      <MovieCard 
        key={movie.id}
        movie={movie}
        onClick={() => handleClick(movie)}
      />
      </div>
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

  const img_path = 'https://image.tmdb.org/t/p/original'

  
  return (

    <div className='home'>

    <div className='movie-section'>
      <div className='movie-showcase'>
        <h1 className='headline'>Trending</h1>
        <Carousel 
        responsive={responsiveTrending} partialVisible={false} infinite={true} itemClass="carousel-item">
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
     
    <div style={popupStyle} className='popup'>
    {!loadingPopupContent &&
      <div className='popup-inner'>
        
        <div className='upper-section-popup'>
        <button onClick={() => setmodalShow(false)}  className='popup-btn'>x</button>
        <img className='popup-movie-image' src={`${img_path}${currentPopupObject.backdrop_path}`} alt=''/>
        </div>
        <div className='lower-section-popup'>
          
          <div className='popup-description'>
          <h2 className='popup-title'>{currentPopupObject.title}</h2>
            {currentPopupObject.overview}
          </div>
          <div className='popup-information-section'>  

          <p className='popup-actors'><span style={{color: 'rgb(125, 125, 125)', marginLeft: '0', marginRight: '10px'}}>Actors: </span>
            {currentPopupObject.credits.cast.slice(0,5).map(person =>(
                <span className='popup-actor'>{person.name}</span>
               ))}
          </p>
          <p className='popup-genres'><span style={{color: 'rgb(125, 125, 125)', marginLeft: '0', marginRight: '10px'}}>Genres: </span>
            {currentPopupObject.genres.map(genre =>(
                <span className='popup-genre'>{genre.name}</span>
               ))}
          </p>


          </div>
        </div>
        
        
        
      </div>}
    </div>
    


  
    </div>
  )
}

export default Home

