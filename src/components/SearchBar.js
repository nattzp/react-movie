import React, {useState} from 'react'
import './SearchBar.css'
import { AiOutlineSearch } from "react-icons/ai";

 


function SearchBar({placeholder, data}) {
    let iconStyle = {background: "white", color:"black"};

    const [typedData, setTypedData] = useState("");   
    const searchFilter = (event) => {
        const typedData = event.target.value;
        setTypedData(typedData);
      };


    return(
        <>
        <div className='topbar'>
            <div class ='searchbox'>
                <input 
                    type="text" 
                    placeholder={placeholder}
                    value={typedData}
                    onChange={searchFilter}
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