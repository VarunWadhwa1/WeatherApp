import hotbg from './assets/hot.jpg'
import coldbg from './assets/cold.jpg'
import Description from './components/Description';
import { useEffect, useState } from 'react';
import { getFormattedWeatherData } from './weatherService';
function App() {

  const [city, setCity] = useState('Agra');
  const [weather, setWeather] =useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hotbg);

  useEffect(() =>{
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);

      const threshold = units === 'metric' ? 20 : 60;
      if(data.temp <= threshold) setBg(coldbg)
      else setBg(hotbg);
    };
    fetchWeatherData();
  },[units, city]);

  const handleUnitsClick = (e) =>{
    const button = e.currentTarget;
    const currentunit = button.innerText.slice(1);

    const isCelcius = currentunit === 'C';
    button.innerText = isCelcius ? '°F' :'°C';
    setUnits(isCelcius ? 'metric' : 'imperial')
    // console.log(button.innerText);
  };
  const enterKeyPressed = (e) => {
    if( e.keyCode === 13){
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
   <div className="app" style={{backgroundImage : `url(${bg})`}}>
      <div className='overlay'>
        {weather && (
            <div className='container'>
            <div className='section section__inputs'>
              <input onKeyDown={enterKeyPressed} type='text' name = 'city' placeholder='Enter city.. '/>
              <button onClick={(e) => handleUnitsClick(e)}>°C</button>
            </div>
            <div className='section section__temperature'>
              <div className='icon'>
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt = "weather"/>
                <h3>{weather.description}</h3>
              </div>
              <div className='temperature'>
                  <h1>{`${weather.temp.toFixed()} °${units === 'metric' ? 'C' : 'F'}`} </h1>
                </div>
            </div>
            <Description weather={weather} units = {units}/>  
          </div>
        )
      }
      </div>
   </div>
  );
}
// 53f4e12504355763e4f338d66850de3a
export default App;
