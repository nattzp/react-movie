import React, {useState} from 'react'
import './GenreButton.css'



const GenreButton = ({ genre }) => {


    return (
            <button className='genre-button'>{genre.name}</button>
    )
}


export default GenreButton