import { useEffect, useState } from 'react'
import axios from 'axios';
import "react-multi-carousel/lib/styles.css";
import MovieCard from '../components/MovieCard.js'
import YoutubeEmbed from "../components/YoutubeEmbed";



const Discover = () => {
  const img_path = 'https://image.tmdb.org/t/p/original'

  const apiUrl = 'https://api.themoviedb.org/3'
  const my_api_key = 'e6c2230b40aa82b543cc9035099cf2ff'
  const wantedGenres = ['Action', 'Science fiction', 'Adventure', 'Fantasy', 'War', 'Animation', 'Drama', 'Horror']
  const [genres, setGenres] = useState([])
  const [allMovies, setmoviesByGenre] = useState([])
  const [activeButton, setActiveButton] = useState([]);

  const [currentPopupObject, setcurrentPopupObject] = useState([]) 
  const [popupContentId, setPopupContentId] = useState([]) 
  const [modalShow, setmodalShow] = useState(false); 
  const [loadingPopupContent, setloadingPopupContent] = useState(true) 




  const movies = async () => {
    const fetchedMovies = await axios.get(`${apiUrl}/discover/movie/`, {
      params: {
        with_genres: activeButton.id,
        api_key: my_api_key
      }
    })
    setmoviesByGenre(fetchedMovies.data.results)
  }

  const renderMovies = () => (
    allMovies.map(movie => (
      <div className='movie-card-wrapper' key={movie.id} onClick={() => handleClick(movie)}>
        <MovieCard
          key={movie.id}
          movie={movie}
        />
      </div>
    ))
  )

  function handleClickGenreButton(genre) {
    setActiveButton(genre)
  }


  const fetchGenresFromApi = async () => {
    const fetchedGenres = await axios.get(`${apiUrl}/genre/movie/list`, {
      params: {
        api_key: my_api_key
      }
    })
    genresToKeep(fetchedGenres.data.genres)
  }

  useEffect(() => {
    fetchGenresFromApi()
    movies()
  }, [activeButton])



  const renderGenres = () => (
    genres.map(genre => (
      <div className='button-wrapper'>
        <button
          id={activeButton.name === genre.name ? 'activeBtn' : 'undefined'}
          type='button'
          key={genre.id}
          className={'genre-button'}
          onClick={() => handleClickGenreButton(genre)}
        >{genre.name}</button>
      </div>
    ))
  )

  function genresToKeep(allGenres) {
    var genresCopy = []
    allGenres.forEach(genre => {
      if (wantedGenres.includes(genre.name)) {
        genresCopy.push(genre)
      }
    })
    setGenres(genresCopy)
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
  }

  useEffect(() => {
    currentPopupMovie()
  }, [popupContentId])

  const handleClick = (movie) => {
    setPopupContentId(movie.id)
    setmodalShow(true)
  }

  const responsive = {
    superLargeDesktop: {
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

  const popupStyle = {
    visibility: modalShow && 'visible'
  }

  return (

    <div className='discover'>
      <div className='movie-section'>
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
      <div style={popupStyle} className='popup'>
        {!loadingPopupContent &&
          <div className='popup-inner'>
            <div className='upper-section-popup'>
              <button onClick={() => setmodalShow(false)} className='popup-btn'>x</button>
              <img className='popup-movie-image' src={`${img_path}${currentPopupObject.backdrop_path}`} alt='' />
            </div>
            <div className='lower-section-popup'>
              <div className='popup-description'>
                <h2 className='popup-title'>{currentPopupObject.title}</h2>
                {currentPopupObject.overview}
              </div>
              <div className='popup-information-section'>
                <p className='popup-actors'><span style={{ color: 'rgb(125, 125, 125)', marginLeft: '0', marginRight: '10px' }}>Actors: </span>
                  {currentPopupObject.credits.cast.slice(0, 5).map(person => (
                    <span className='popup-actor'>{person.name}</span>
                  ))}
                </p>
                <p className='popup-genres'><span style={{ color: 'rgb(125, 125, 125)', marginLeft: '0', marginRight: '10px' }}>Genres: </span>
                  {currentPopupObject.genres.map(genre => (
                    <span className='popup-genre'>{genre.name}</span>
                  ))}
                </p>
                <p style={{marginTop:'5px'}} >
                <span style={{ color: 'rgb(125, 125, 125)', marginLeft: '0' }}>Rating: </span>
                {currentPopupObject.vote_average}
                </p>
              </div>
            </div>
            <div className='popup-trailer-section-wrapper'>
              <h2 className='popup-title'>Trailers</h2>
              <div className='popup-trailer-section'>
                {currentPopupObject.videos.results.slice(-2).map(movie => (
                  <div className='popup-youtube'>
                    <YoutubeEmbed embedId={movie.key} />
                  </div>
                ))}
              </div>
            </div>

          </div>}
      </div>
    </div>
  )
}

export default Discover
