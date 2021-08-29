import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchCountries, setSearchCountries] = useState('');
  const [showCountry, setShowCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const [selectedCountryName, setSelectedCountryName] = useState(null);

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    if (selectedCountryName) {
      axios
        .get('http://api.weatherstack.com/current?', {
          params: {
            access_key: process.env.REACT_APP_API_KEY,
            query: selectedCountryName,
          },
        })
        .then(response => {
          displayWeather(response.data);
        });
    }
  }, [selectedCountryName]);

  const handleSearch = event => {
    setWeather(null);
    setShowCountry(null);
    setSearchCountries(event.target.value);
  };

  const filterCountry = countries.filter(term => term.name.toLowerCase().includes(searchCountries));

  const displayWeather = weather => {
    const weaterToShow = (
      <div>
        <h2>Weather in {weather.location.name}</h2>
        <p>Temperature: {weather.current.temperature} Celcius</p>
        <img src={weather.current.weather_icons} alt='weater icon' />
        <p>Wind: {weather.current.wind_speed} mph</p>
        <p>Direction: {weather.current.wind_dir}</p>
      </div>
    );
    setWeather(weaterToShow);
  };

  const displayCountry = country => {
    setSelectedCountryName(country.name.toUpperCase());
    const countryToShow = (
      <div>
        <h2>{country.name}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population} </p>
        <h3>Languages</h3>
        <ul>
          {country.languages.map(lang => (
            <li key={lang.name}>{lang.name}</li>
          ))}
        </ul>
        <img width='100px' src={country.flag} alt='flag' />
      </div>
    );
    setShowCountry(countryToShow);
  };

  const renderCountries = () => {
    if (filterCountry.length <= 10 && filterCountry.length > 1) {
      return filterCountry.map(c => {
        return (
          <div key={c.name}>
            {c.name}
            <button onClick={() => displayCountry(c)}>Show</button>
          </div>
        );
      });
    } else if (filterCountry.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (filterCountry.length === 1) {
      return filterCountry.map(country => {
        setSelectedCountryName(country.name);
        return (
          <div key={country.name}>
            <div>{displayCountry(country)} </div>
          </div>
        );
      });
    }
  };

  return (
    <div>
      Find countries{' '}
      <input value={searchCountries} onChange={handleSearch} placeholder='Search a country...' />
      {!showCountry && filterCountry.length !== countries.length && renderCountries()}
      {showCountry}
      {weather}
    </div>
  );
};
export default App;
