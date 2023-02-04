import React from 'react'
import { formatToLocalTime, iconUrlFromCode } from '../services/WeatherService'

const Forecast = ({title, items, weatherForecast}) => {

    return (
        <div>
            <div className='flex items-center justify-start mt-6'>
                <p className='text-white font-medium uppercase'>{title}</p>
            </div>
            <hr className='my-2' />

            <div className='flex flex-row items-center justify-between text-white mt-2'>
                { items()?.map((item, index) => (
                    <div key={index} className={`flex flex-col items-center justify-center`}>
                    <p className='font-light text-sm'>
                        {formatToLocalTime(item.dt, weatherForecast.city?.timezone, "ccc")}
                    </p>

                    <img 
                        src={iconUrlFromCode(item.weather[0].icon)} 
                        alt="img..." 
                        className='w-12 my-1'
                    />
                    <p className='font-medium'>{(item.main.feels_like.toFixed())}º</p>
                    {title === 'Hourly Forecast' ? <p className='font-extralight text-center my-1'>{formatToLocalTime(item.dt, weatherForecast.city?.timezone, "hh:mm a")}</p> : null}
                </div>
                ))}
            </div>
        </div>
    )
}

export default Forecast
