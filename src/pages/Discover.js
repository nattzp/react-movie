import { useEffect, useState } from 'react'
import axios from 'axios';
//import GenreButton from '../components/GenreButton.js'
// import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from '../components/MovieCard.js'


const Discover =()=> {
  const apiUrl = 'https://api.themoviedb.org/3'
  const my_api_key = 'e6c2230b40aa82b543cc9035099cf2ff'
  const wantedGenres = ['Action', 'Science fiction', 'Adventure', 'Fantasy', 'War', 'Animation', 'Drama', 'Horror']
   
  const [allGenres, setAllGenres] = useState([])
  const [genres, setGenres] = useState([])
  const [allMovies, setmoviesByGenre] = useState([])
  const [activeButton, setActiveButton] = useState([]);




console.log(genres)
  const movies = async () => {
    const fetchedMovies = await axios.get(`${apiUrl}/discover/movie/`, {
      params: {
        with_genres: activeButton.id,
        api_key: my_api_key
      }
    })
    setmoviesByGenre(fetchedMovies.data.results)
    console.log(genres)
    
  }

  const renderMovies = () => (
    allMovies.map(movie => (
      <MovieCard 
        key={movie.id}
        movie={movie}
      />
    ))
  )

  function handleClick(genre){
    setActiveButton(genre)
    //filterMovies()
  }

  // function filterMovies(){
    
  // }

  const fetchGenresFromApi = async () => {
    const fetchedGenres = await axios.get(`${apiUrl}/genre/movie/list`, {
      params: {
        api_key: my_api_key
        
      }
    })
    setAllGenres(fetchedGenres.data.genres)
    genresToKeep(fetchedGenres.data.genres)
  }



  useEffect(() => {
    fetchGenresFromApi()
    movies()
  }, [activeButton])



  const renderGenres = () => (
    genres.map(genre => (
      <div className ='button-wrapper'>
      <button 
        id={activeButton.name === genre.name ? 'activeBtn' : 'undefined'}
        type = 'button'
        key ={genre.id}
        //genre = {genre}
        className={'genre-button'}
        onClick = {() => handleClick(genre)}
       //onClick = {handleClick(genre.name)}
        // name = {genre.name}
      >{genre.name}</button>
      </div>
    ))
    
  )

  function genresToKeep(allGenres){
    var genresCopy = []
    allGenres.forEach(genre => {
      if (wantedGenres.includes(genre.name)){
        genresCopy.push(genre)
      }
    })
    setGenres(genresCopy)
    }

    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2
      }
    };

    

  return (

    <div className='discover'>
      <h1 className='heading'>Discover</h1>

      <div className='genre-button-section'>
      {renderGenres()}
      </div>
      <div className='movie-showcase'>
        <div className='movie-list'>
        {renderMovies()}
        </div>
      </div>

    </div>
  )
}

export default Discover
