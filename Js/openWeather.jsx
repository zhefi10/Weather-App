
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
const apiKey = '0d039f92a9d718a193d62027df7c3f13';

const getWeather = async (cityname) => {
  try {
    const weather = await axios.get(baseUrl + `q=${cityname}&appid=${apiKey}`);
    return weather.data;
  }catch(error) {
    throw error;
  }
}

function App() {
  const { useState, useEffect } = React;
  const { Container } = ReactBootstrap;
  const [city, setCity] = useState('Lima');
  const [weather, setWeather] = useState(null);

  const getData = async () => {
    try { 
      const result = await getWeather(city);
      console.log(result);
      setWeather(result);
    } catch(error) {
      console.log(error.message);
    }
  }
  useEffect (() => {
    getData();
  }, []);

  return(
    <Container>      
      <h1 className="title">Weather-App</h1>
      <div className="search-bar">
        <input type="text"  onChange={(e) => setCity(e.target.value)} placeholder='Write a city'></input>
        <button type='button' onClick={() => getData()}>Search</button>
      </div>      
      {weather !== null ? (
        <div className="card-weather">
          <div className='icon'>            
            <h1> {weather.name},  {weather.sys.country}</h1>            
          </div>                          
          <div className='weather'>
            <h1>{Math.round(weather.main.temp - 273)}&deg;C </h1>            
            <h2>
            <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} />
            {weather.weather[0].main}</h2>
            
            <h6>
             Max: {Math.round(weather.main.temp_max - 273)}&deg;C ||
             Min: {Math.round(weather.main.temp_min - 273)}&deg;C ||              
             Humidity: {Math.round(weather.main.humidity)}% 
            </h6>            
          </div>
        </div>
      ) : null}       
    </Container>     
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);