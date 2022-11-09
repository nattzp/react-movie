import React, { useEffect, useState } from 'react'
import axios from 'axios';
import GenreButton from '../components/GenreButton.js'





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

  // const renderGenreButtons = () => {

  // }

  return (

    <div className='discover'>
      <h1 className='heading'>Discover</h1>

      <div className='genre-button-section'>
        {renderGenres()}
      </div>

    <div className='movie-section'>

      {/* <div className='movie-showcase'>
        <h1 className='headline'>Now playing</h1>
        <div className='movie-list'>
          {rendermoviesNowPlaying()}
        </div>
      </div> */}



      </div>
    </div>
  )
}

export default Discover
