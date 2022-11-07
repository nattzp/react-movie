import React, {useState} from 'react'
import './MovieCard.css'



//const MovieCard = ({ title, year, posterPath}) 

const MovieCard = ({ movie }) => {
    const [isHovering, setIsHovering] = useState(false);

    const hoverStyle = {
        opacity: isHovering ? '0.3' : '' ,
        transition: isHovering ? 'opacity 1s' : '' ,
       
        
    }

    const handleHover = () =>{
        setIsHovering(true)

    }
    const handleNotHover = () => {
        setIsHovering(false)
    }

    function getYear() {
        const year = `${movie.release_date}`
        return year.slice(0,4)

    }

    const img_path = 'https://image.tmdb.org/t/p/w500'
    return (
        <div  onMouseOver={handleHover} onMouseLeave={handleNotHover} className='movie-card'>
            {movie.poster_path ? <img style = {hoverStyle} className={'movie-image'} src={`${img_path}${movie.poster_path}`} alt=''/>
            : null}
            {isHovering && 
                <div className ='hej'>
                <h5 className='movie-title'>{movie.title}</h5> 
                <p className='movie-year'>{getYear()}</p>
                </div> 
                

            }

        </div>
    )
}


export default MovieCard