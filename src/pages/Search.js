import { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from "react-router-dom";
import MovieCard from '../components/MovieCard';
import YoutubeEmbed from "../components/YoutubeEmbed";




function Search() {
    const img_path = 'https://image.tmdb.org/t/p/original'
    const typedData = useParams();
    const apiUrl = 'https://api.themoviedb.org/3'
    const my_api_key = 'e6c2230b40aa82b543cc9035099cf2ff'
    const [searchedMovies, setSearchedMovies] = useState([])
    const [currentPopupObject, setcurrentPopupObject] = useState([]) //denna
    const [popupContentId, setPopupContentId] = useState([]) //denna
    const [modalShow, setmodalShow] = useState(false); //denna
    const [loadingPopupContent, setloadingPopupContent] = useState(true) //denna



    const Searchedmovies = async () => {
        const fetchedMovies = await axios.get(`${apiUrl}/search/movie/`, {
            params: {
                query: typedData.query,
                api_key: my_api_key
            }
        })
        setSearchedMovies(fetchedMovies.data.results)
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


    const renderSearchedMovies = () => (
        searchedMovies.map(movie => (
            <div className='movie-card-wrapper' key={movie.id} onClick={() => handleClick(movie)}>
                <MovieCard
                    key={movie.id}
                    movie={movie}
                />
            </div>
        ))
    )

    const popupStyle = {
        visibility: modalShow && 'visible'
    }

    useEffect(() => {
        currentPopupMovie()
    }, [popupContentId])

    const handleClick = (movie) => {
        setPopupContentId(movie.id)
        setmodalShow(true)
    }

    useEffect(() => {
        Searchedmovies()
    }, [typedData])

    return (
        <div className='search'>

            <div className='movie.section'>
                <h1 className='heading'>Search</h1>
                <div className='movie-showcase'>
                    <div className='movie-list'>
                        {renderSearchedMovies()}
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
                                <p style={{ marginTop: '5px' }} >
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

export default Search
