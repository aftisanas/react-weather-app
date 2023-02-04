import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Forecast from './components/Forecast';
import Search from './components/Search';
import { formatToLocalTime, getFormattedWeatherData, getFormattedWeatherForecastData } from './services/WeatherService';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import TimeAndLocation from './components/TimeAndLocation';
import TopButtons from './components/TopButtons';

function App() {

  const [query, setQuery] = useState({q: 'Rabat'});
  const [units, setUnits] = useState('metric'); 
  const [weather, setWeather] = useState(null);

  const [weatherForecast, setWeatherForecast] = useState(null);
  const [queryForecast, setQueryForecast] = useState({q: `${query.q},MA`});
  
  useEffect(() => {
    const fetchWeather = async () => {
      const msg = query.q ? query.q : 'current location...';
      toast.info(`Fetching weather for ${msg}`);

      // get weather data
      await getFormattedWeatherData({...query, units})
      .then(data => {
        toast.success(`
          Successfully fetched weather for ${data.name}, ${data.country}!!!
        `)
        
        setWeather(data);
        // console.log("🚀 ~ file: App.js:34 ~ fetchWeather ~ data", data)
      });
    }
    fetchWeather();
    
    // get weather forecast data
    const fetchWeatherForecast = async () => {
      await getFormattedWeatherForecastData(queryForecast, units).then(data => {
          toast.success(`
              Successfully fetched weather for ${queryForecast.q}!!!
          `)
          
          setWeatherForecast(data);
          console.log("🚀 ~ file: App.js:46 ~ await getFormattedWeatherForecastData ~ data", data)
      });
  };
  fetchWeatherForecast();

  setQueryForecast({q:`${query.q},ma`})
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) {
      return 'from-cyan-700 to-blue-700';
    }
    const threshold = units === 'metric' ? 20 : 60;
    if (weather.temp <= threshold) {
      return 'from-cyan-700 to-blue-700';
    }
    return 'from-yellow-700 to-orange-700';
  }

  const hourlyWeatherForecast = () => {
    let filter = [];
    const date = new Date();
    const options = { weekday: 'short' };
    const day = date.toLocaleDateString('en-US', options);
    weatherForecast?.list.map(item => {
      return (formatToLocalTime(item.dt, weatherForecast.city.timezone, "ccc") === day ? 
        filter.push(item)
        : 
        null
      )
    })

    return filter;
  };
  hourlyWeatherForecast();


  const dailyWeatherForecast = () => {
    let filtered = [];
    const date = new Date();
    const options = { weekday: 'short' };
    const day = date.toLocaleDateString('en-US', options);
    weatherForecast?.list.map(item => {
      return (formatToLocalTime(item.dt, weatherForecast.city.timezone, "ccc") !== day ? 
        filtered.push(item)
        :
        null
      )
    });
    
    const removeDuplicatedDay = filtered.filter((item1, index, self) => {
      return self.findIndex(item2 => formatToLocalTime(item2.dt, weatherForecast.city.timezone, "ccc") === formatToLocalTime(item1.dt, weatherForecast.city.timezone, "ccc")) === index
    });

    return removeDuplicatedDay;
  }
  dailyWeatherForecast();


  return (
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <TopButtons setQuery={setQuery} />
      <Search setQuery= {setQuery} units={units} setUnits={setUnits}/>

      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />
          
          <Forecast title='Hourly Forecast' items={hourlyWeatherForecast} weatherForecast={weatherForecast}/>
          <Forecast title='Daily Forecast' items={dailyWeatherForecast} weatherForecast={weatherForecast}/>
        </>
      )}

      <ToastContainer autoClose={3000} theme='colored' newestOnTop={true} />
    </div>
  );
}

export default App;