import React, {useState} from 'react'
import './GenreButton.css'



const GenreButton = ({ genre }) => {


    return (
        <div className='genre-button-wrapper'>
            <button className='genre-button'>{genre.name}</button>
        </div>
    )
}


export default GenreButton