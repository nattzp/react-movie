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
       height: isTrending ? '25vw' : '',
       

       
   }

   const trendingOverlay
    = {
       
       width: (isTrending) && '100%' ,
       
       left: isTrending && '0' ,
       
       background: isTrending && 'rgba(0,0,0,0.5)' ,
       
       textAlign: isTrending && 'left' ,
       padding: isTrending && '15px' ,
       borderRadius: isTrending && '0' ,
       borderBottomLeftRadius: isTrending && '5px',
       borderBottomRightRadius: isTrending && '5px',
       justifyContent: isTrending && 'center',

       borderRadius: isHovering && isTrending && '5px' ,
       borderRadius: !isHovering && isTrending && '0' ,

       border: isHovering && isTrending && '1px solid white',
       border: !isHovering && isTrending && 'none',

       marginTop: (isHovering && isTrending) && '0',
       marginTop: (!isHovering && isTrending) && '20vw',

       height:  isHovering && isTrending && '100%',
       height:  (!isHovering &&isTrending) && '5vw' ,
       
      
       transition: isHovering && isTrending && '.5s ' ,


 



       



    //    position: absolute;
   

    //    display: flex;
    //    flex-direction: column;
    //    justify-content: center;
    //    padding: 5px;

    //    border-radius: 5px;
       
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

    const img_path = 'https://image.tmdb.org/t/p/w500'
    return (
        <div style={movieCard} onMouseOver={handleHover} onMouseLeave={handleNotHover} className='movie-card'>
            {movie.poster_path ? <img style = {imgStyle} className={'movie-image'} src={`${img_path}${movie.poster_path}`} alt=''/>
            : null}
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