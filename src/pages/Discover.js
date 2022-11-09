import React, { useEffect, useState } from 'react'
import axios from 'axios';
import GenreButton from '../components/GenreButton.js'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";






function Discover() {
  const apiUrl = 'https://api.themoviedb.org/3'
  const my_api_key = 'e6c2230b40aa82b543cc9035099cf2ff'

  const [moviesNowPlaying, setmoviesNowPlaying] = useState([])
  const [genres, setGenres] = useState([])
  

  const moviesByGenre = async () => {
    const fetchedGenres = await axios.get(`${apiUrl}/genre/movie/list`, {
      params: {
        api_key: my_api_key
        
      }
    })
    setGenres(fetchedGenres.data.genres)
  }

  console.log(genres)


  useEffect(() => {
    moviesByGenre()

  }, [])

  const renderGenres = () => (
    genres.map(genre => (
      <GenreButton 
        id={genre.id}
        genre = {genre}
      />
    ))
  )



  const responsive = {

    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 8
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 7
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3
    }
  };

  return (

    <div className='discover'>
      <h1 className='heading'>Discover</h1>

      <div className='genre-button-section'>
      <Carousel responsive={responsive}  partialVisible={false} itemClass="carousel-item">
      {renderGenres()}
        </Carousel>
      </div>
      
    </div>
  )
}

export default Discover
