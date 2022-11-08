import React, {useState} from 'react'
import './MovieCard.css'



//const MovieCard = ({ title, year, posterPath}) 

const MovieCard = ({ movie, isTrending }) => {
    const [isHovering, setIsHovering] = useState(false);

    const imgStyle
     = {
        opacity: !isTrending && isHovering ? '0.3' : '' ,
        transition: isHovering ? 'opacity 1s' : '' ,
        height: isTrending ? '100%' : '',
        objectFit: isTrending ? 'cover' : '',
        objectPosition : isTrending ? 'center' : '',
    }

    const movieCard
    = {
      
   }

   const trendingOverlay
    = {
       width: (isTrending) && '100%' ,
       left: isTrending && '0' ,
       background: isTrending && 'rgba(0,0,0,0.5)' ,
       textAlign: isTrending && 'left' ,
       padding: isTrending && '15px' ,
       borderTopLeftRadius: !isHovering && isTrending && '0',
       borderTopRightRadius: !isHovering && isTrending && '0',
       justifyContent: isTrending && 'center',
 
       
       border: !isHovering && isTrending && 'none',
       height:  isHovering && isTrending && '100%',
       height:  (!isHovering &&isTrending) && '5vw' ,  
       transition: isHovering && isTrending && '.5s ' ,
       
   }

    function path_ending(){
        if (isTrending){
            return `${movie.backdrop_path}`
        }
        else return `${movie.poster_path}`
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

    const img_path = 'https://image.tmdb.org/t/p/original'
    return (
        <div style={movieCard} onMouseOver={handleHover} onMouseLeave={handleNotHover} className='movie-card'>
        <img style = {imgStyle} className={'movie-image'} src={`${img_path}${path_ending()}`} alt=''/>
            {(isHovering || isTrending) && 
                <div style ={trendingOverlay} className ='overlay'>
                <h5 className='movie-title'>{movie.title}</h5> 
                <p className='movie-year'>{getYear()}</p>
                </div> 
                

            }
        </div>
    )
}


export default MovieCard