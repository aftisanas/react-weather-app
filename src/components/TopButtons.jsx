import React from 'react';

const TopButtons = ({setQuery}) => {
    const cities = [
        {
            id: 1,
            title: 'Meknes'
        },
        {
            id: 2,
            title: 'Temara'
        },
        {
            id: 3,
            title: 'Casablanca'
        },
        {
            id: 4,
            title: 'Sale'
        },
        {
            id: 5,
            title: 'Tanger'
        },
    ];
    return (
        <div className='flex items-center justify-around my-6'>
            {cities.map(city => (
                <button className="text-white text-lg font-medium" key={city.id} onClick={() => setQuery({q: city.title})}>{city.title}</button>
            ))}
        </div>
    )
}

export default TopButtons;