import Search from './components/search/Search';
import './App.css';
import CurrentWeather from './current-weather/current-weather';
import { useState} from 'react';
import ForecastWeather from './forecast-weather/forecastCard';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  let [firstDifferentDateWithoutTime, setFirstDifferentDateWithoutTime] = useState(null);
  let [thirdDay, setThirdDay] = useState(null);
  let [fourthDay, setFourthDay] = useState(null);
  let [fifthDay, setFifthDay] = useState(null);
  const [dayIndex, setDayIndex] = useState([])
  
  console.log(dayIndex);

  const handleOnSearchChange = (searchData) => {
    console.log(searchData);
    const [lat, lon] = searchData.value.split(' ');

    const currentWeatherFetch = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=736b7f2628a8fca1a8cba5acb85b42b6&units=metric`);
    const forecastWeatherFetch = fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=736b7f2628a8fca1a8cba5acb85b42b6&units=metric`);

    Promise.all([currentWeatherFetch, forecastWeatherFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });

        let firstDtTxt = forecastResponse.list[0].dt_txt;
        let firstDateWithoutTime = firstDtTxt.split(' ')[0];


        for (let i = 1; i < forecastResponse.list.length; i++) {
          const currentDateWithoutTime = forecastResponse.list[i].dt_txt.split(' ')[0];
          if (currentDateWithoutTime !== firstDateWithoutTime) {
            const newDayIndexes = [...dayIndex, i + 5, i + 13, i + 21, i + 29];
            setDayIndex(newDayIndexes); // Χρησιμοποιήστε το setDayIndex για να ενημερώσετε το dayIndex state
            console.log(newDayIndexes);

            
            firstDifferentDateWithoutTime = currentDateWithoutTime;
            thirdDay = forecastResponse.list[i + 8].dt_txt.split(' ')[0];
            fourthDay = forecastResponse.list[i + 16].dt_txt.split(' ')[0];
            fifthDay = forecastResponse.list[i + 24].dt_txt.split(' ')[0];
            break;
          }
        }
        
        console.log(forecast);

        const datePartsSecond = firstDifferentDateWithoutTime.split("-");
        const newSecondDate = `${datePartsSecond[2]}/${datePartsSecond[1]}/${datePartsSecond[0]}`

        const datePartsThird = thirdDay.split("-");
        const newThirdDate = `${datePartsThird[2]}/${datePartsThird[1]}/${datePartsThird[0]}`

        const datePartsFourth = fourthDay.split("-");
        const newFourthDate = `${datePartsFourth[2]}/${datePartsFourth[1]}/${datePartsFourth[0]}`

        const datePartsFifth = fifthDay.split("-");
        const newFifthDate = `${datePartsFifth[2]}/${datePartsFifth[1]}/${datePartsFifth[0]}`

        console.log(firstDifferentDateWithoutTime, thirdDay, fourthDay, fifthDay);

        setFirstDifferentDateWithoutTime(newSecondDate);
        setThirdDay(newThirdDate);
        setFourthDay(newFourthDate);
        setFifthDay(newFifthDate);
      })
      .catch((error) => console.log(error));

  }

  return (
    <div className="App">

      <div className='big'><div className="title"><h3>Weather App</h3></div> </div>
      <Search onSearchChange={handleOnSearchChange} />
      <CurrentWeather data={currentWeather} forecast={forecast} />

    <div className="forecast">
      {dayIndex[0] !== undefined && <div><ForecastWeather data={forecast} day={firstDifferentDateWithoutTime} dayIndex={dayIndex[0]} /></div>}
      {dayIndex[1] !== undefined && <div><ForecastWeather data={forecast} day={thirdDay} dayIndex={dayIndex[1]}/></div>}
      {dayIndex[2] !== undefined && <div><ForecastWeather data={forecast} day={fourthDay} dayIndex={dayIndex[2]}/></div>}
      {dayIndex[3] !== undefined && <div><ForecastWeather data={forecast} day={fifthDay} dayIndex={dayIndex[3]}/></div>}
    </div>
    


    </div>
  );
}

export default App;
