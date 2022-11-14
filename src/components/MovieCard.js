import React, { useState} from 'react'
import './MovieCard.css'
import noImage from '../img/moviecardPlaceholder.png'
import noImageTrending from '../img/moviecardPlaceholderTrending.png'

const MovieCard = ({ movie, isTrending }) => {
    const [isHovering, setIsHovering] = useState(false);
    const img_path = 'https://image.tmdb.org/t/p/original'
    const imgStyle
     = {
        opacity: !isTrending && isHovering ? '0.3' : '' ,
        transition: isHovering ? 'opacity 1s' : '' ,
        height: isTrending ? '100%' : '',
        objectFit: isTrending ? 'cover' : '',
        objectPosition : isTrending ? 'center' : '',
    }

   const trendingOverlay
    = {
       width: (isTrending) && '100%' ,
       left: isTrending && '0' ,
       background: isTrending && 'rgba(0,0,0,0.5)' ,
       padding: isTrending && '15px' ,
       borderTopLeftRadius: !isHovering && isTrending && '0',
       borderTopRightRadius: !isHovering && isTrending && '0',
       border: !isHovering && isTrending && 'none',
       height:  (!isHovering &&isTrending) && '20%' ,  
       transition: isHovering && isTrending && '.5s ' ,
       alignItems: isTrending && 'start',
   }

    const imgPath=()=>{
        if (isTrending){
            if(movie.backdrop_path){
                return `${img_path}${movie.backdrop_path}`
            }
            else return noImageTrending
        }
        else{
            if(movie.poster_path){
                return `${img_path}${movie.poster_path}`
            }
            else return noImage
        } 
    }


    const handleHover = () =>{
        setIsHovering(true)

    }
    const handleNotHover = () => {
        setIsHovering(false)
    }

    function getYear() {
        const date = `${movie.release_date}`
        return date.slice(0,4)
    }


   
    return (
        <>
        <div onMouseOver={handleHover} onMouseLeave={handleNotHover} className='movie-card'>
        <img style = {imgStyle} className='movie-image' src={`${imgPath()}`} alt=''/>
            {(isHovering || isTrending) && 
                <div  style ={trendingOverlay} className ='overlay'>
                <h5 className='movie-title'>{movie.title}</h5> 
                {isTrending && isHovering && <p id='movie-rating'className='movie-text'>Rating: {movie.vote_average}</p>}
                <p className='movie-text'>{getYear()}</p>
                </div> 
            }    
        </div>
        </>
    )
}


export default MovieCard