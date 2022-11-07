import React, { useEffect, useState } from 'react'
import axios from 'axios';
//import moviesNowPlayinghowcase from '../components/moviesNowPlayinghowcase'
//import SearchBar from '../components/SearchBar'
import MovieCard from '../components/MovieCard.js'





function Home() {
  const apiUrl = 'https://api.themoviedb.org/3'
  const my_api_key = 'e6c2230b40aa82b543cc9035099cf2ff'

  const [moviesNowPlaying, setmoviesNowPlaying] = useState([])
  const [moviesTopRated, setmoviesTopRated] = useState([])

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

  }, [])



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



  return (

    <div className='home'>

    <div className='movie-section'>
      <div className='movie-showcase'>
        <h1 className='headline'>Now playing</h1>
        <div className='movie-list'>
          {rendermoviesNowPlaying()}
        </div>
      </div>


      <div className='movie-showcase'>
        <h1 id='test' classNamme='headline'>Top Rated</h1>
        <div className='movie-list'>
          {rendermoviesTopRated()}
        </div>
      </div>

      </div>

    </div>
  )
}

export default Home