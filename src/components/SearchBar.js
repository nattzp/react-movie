import React, { useState} from 'react'
import './SearchBar.css'
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from 'react-router-dom'

 


function SearchBar({placeholder}) {
    const [redirect, setRedirect] = useState(false);
    let iconStyle = {background: "white", color:"black"};
    const [typedData, setTypedData] = useState("");   

    const onChangeHandler = (event) => {
        const typedData = event.target.value;
        setTypedData(typedData);
      };
    
    const navigate = useNavigate()

    const enterHandler = (event) => {
        if (event.key === 'Enter'){
            setRedirect(true)
            navigate(`/search/${typedData}`)
            setTypedData('')
        }
    }

    return(
        <>
        <div className='topbar'>
            <div className ='searchbox'>
                <input 
                    type="text" 
                    placeholder={placeholder}
                    value={typedData}
                    onChange={onChangeHandler}
                    onKeyUp ={enterHandler}
                />
                <div className='searchIcon'>
                    <AiOutlineSearch style={iconStyle} size={'20px'}/>
                </div>
            </div>
        </div>
        </>
    )
}

export default SearchBar