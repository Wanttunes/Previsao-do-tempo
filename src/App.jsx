import { useState, useRef } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const cityRef = useRef();
  const [weatherData, setWeatherData] = useState(null);
  const key = "0788ffd1cb1e755ca01afabdd2f6715a";
  const input = document.querySelector('.city-input');

  async function citySearch() {
    try {
      const city = cityRef.current.value;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
      const api = await axios.get(url);
      setWeatherData(api.data);
    }
    catch (error) {
      console.log(error);
      alert("Cidade não encontrada");
      input.value = ''; // Limpa o input
      setWeatherData(null); // Limpa os dados
    }

  }

  return (
    <div className="App">
      <h1>Previsão do Tempo</h1>
      <input
        type="text"
        placeholder="Digite o nome da cidade"
        ref={cityRef}
        className='city-input'
      />
      <button onClick={citySearch}>Ver Previsão</button>
      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}</h2>
          <p>Temperatura: {weatherData.main.temp}°C</p>
          <p>Velocidade do Vento: {weatherData.wind.speed} m/s</p>
          <p>Nuvens: {weatherData.clouds.all}%</p>
          <p>Humidade: {weatherData.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
