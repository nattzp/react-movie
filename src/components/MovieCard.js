import { getMouseEventOptions } from '@testing-library/user-event/dist/utils';
import React, {useEffect, useState} from 'react'
import './MovieCard.css'
import noImage from '../img/moviecardPlaceholder.png'
import noImageTrending from '../img/moviecardPlaceholderTrending.png'
// import TestModal from './TestModal.js'
// import Modal, { Button} from 'react-bootstrap/Modal'
// import "bootstrap/dist/css/bootstrap.min.css";

//const MovieCard = ({ title, year, posterPath}) 

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
                {isTrending && isHovering && <p id='movie-rating'className='movie-text'>IMDB rating: {movie.vote_average}</p>}
                <p className='movie-text'>{getYear()}</p>
                </div> 
            }    
        </div>

        {/* {<div className='popup'>
                    <div className='popup-inner'>
                        <button className='close-btn'></button>
                    <h1>hej</h1>
                    </div>
                    
                </div>} */}

       


        {/* {modalShow &&
        <div>
            <Modal show={modalShow}>
                <Modal.Header>header part</Modal.Header>
                <Modal.Body>
                    modal body
                </Modal.Body>
                <Modal.Footer>footer</Modal.Footer>
            </Modal>
        </div>
            
        } */}
     
     
     

        </>
    )
}


export default MovieCard