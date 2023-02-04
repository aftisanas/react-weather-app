import React, { useState } from 'react'
import {UilSearch, UilLocationPoint} from '@iconscout/react-unicons';
import { toast } from 'react-toastify';
const Search = ({units, setUnits, setQuery}) => {
    
    const [city, setCity] = useState('');

    const handleSearch = () => {
        if (city !== '') setQuery({q: city});
    };

    const handleLocation = () => {
        if(navigator.geolocation) {
            toast.info('Fetching users location...')
            navigator.geolocation.getCurrentPosition(pos => {
                toast.success('Location fetched!!!')
                let lat = pos.coords.latitude;
                let lon = pos.coords.longitude;

                setQuery({
                    lat,
                    lon
                })
            })
        }
    }

    const handleUnits = (e) => {
        const unitsSelected = e.target.value;
        if (units !== unitsSelected) {
            console.log("🚀 ~ file: Search.jsx:28 ~ handleUnits ~ units", units)
            setUnits(unitsSelected)
        } 
    }
    return (
        <div className='flex flex-row justify-center my-6'>
            <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
                <input 
                    type="search" 
                    className='text-xl font-light p-2 w-full ml-5 shadow-xl focus:outline-none rounded-sm capitalize placeholder:lowercase' 
                    placeholder='Search for a city...'
                    onChange={(e) => setCity(e.currentTarget.value)}
                />
                <UilSearch size={25} onClick={() => handleSearch()} className='text-white cursor-pointer transition ease-out hover:scale-125' />
                <UilLocationPoint size={25} onClick={() => handleLocation()} className='text-white cursor-pointer transition ease-out hover:scale-125' />
            </div>

            <div className="flex flex-row w-1/4 items-center justify-center">
                <button onClick={(e) => handleUnits(e)} name='metric' className='text-xl text-white font-light  transition ease-out hover:scale-125'>
                    ºC
                </button>
                <p className='text-xl text-white mx-3'>|</p>
                <button onClick={(e) => handleUnits(e)} name='imperial' className='text-xl text-white font-light  transition ease-out hover:scale-125'>
                    ºF
                </button>
            </div>
        </div>
    )
}

export default Search;
