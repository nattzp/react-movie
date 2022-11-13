import { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from "react-router-dom";
import MovieCard from '../components/MovieCard';




function Search() {

    const typedData = useParams();

    const apiUrl = 'https://api.themoviedb.org/3'
    const my_api_key = 'e6c2230b40aa82b543cc9035099cf2ff'
    const [searchedMovies, setSearchedMovies] = useState([])
  
  
  
    const Searchedmovies = async () => {
      const fetchedMovies = await axios.get(`${apiUrl}/search/movie/`, {
        params: {
          query: typedData.query,
          api_key: my_api_key
        }
      })
      setSearchedMovies(fetchedMovies.data.results)
      console.log(searchedMovies)
      
    }
  
    const renderSearchedMovies = () => (
      searchedMovies.map(movie => (
        <MovieCard 
          key={movie.id}
          movie={movie}
        />
      ))
    )

    useEffect(() => {
        Searchedmovies()
      }, [typedData])
    

  return (

    <div className='search'> 
    <h1 className='heading'>Search</h1>
    <div className='movie-showcase'>
        <div className='movie-list'>
        {renderSearchedMovies()}
        </div>
      </div>

    </div>
  )
}

export default Search
