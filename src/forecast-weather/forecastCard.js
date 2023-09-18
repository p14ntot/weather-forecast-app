
import './forecast.css';
import { useEffect,useState } from 'react';

const ForecastWeather = ({ data, day, dayIndex}) => {

    let [icon, setIcon] = useState('');
    console.log(data);


    if (dayIndex !== null && dayIndex !== undefined) {
        console.log(dayIndex);
    }


    useEffect(() => {
        if (data && data.list && data.list[dayIndex] && data.list[dayIndex].weather[0]) {
            const iconCode = data.list[dayIndex].weather[0].icon;
            console.log("Icon Code:", iconCode);

            switch (iconCode) {

                case '01n':
                    setIcon('icons/01n.png');
                    break;

                case '02d':
                    setIcon('icons/02d.png');
                    break;

                case '02n':
                    setIcon('icons/02n.png');
                    break;

                case '03d':
                    setIcon('icons/03d.png');
                    break;


                case '03n':
                    setIcon('icons/03n.png');
                    break;

                case '04d':
                    setIcon('icons/04d.png');
                    break;

                case '04n':
                    setIcon('icons/04n.png');
                    break;

                case '09d':
                    setIcon('icons/09d.png');
                    break;

                case '09n':
                    setIcon('icons/09n.png');
                    break;

                case '10d':
                    setIcon('icons/10d.png');
                    break;


                case '10n':
                    setIcon('icons/10n.png');
                    break;


                case '11d':
                    setIcon('icons/11d.png');
                    break;

                case '11n':
                    setIcon('icons/11n.png');
                    break;


                case '13d':
                    setIcon('icons/13d.png');
                    break;


                case '13n':
                    setIcon('icons/13n.png');
                    break;


                case '50d':
                    setIcon('icons/50d.png');
                    break;

                case '50n':
                    setIcon('icons/50n.png');
                    break;


                case 'unknown':
                    setIcon('icons/unknown.png');
                    break;


                default:
                    setIcon('icons/01d.png');
                    break;
            }
        }
    }, [data,dayIndex]);


  return (
    <div className="forecast-wrapper">

      <div className="upper">
        <div className="name">{day}</div>
        <div className="icon-forecast">
            <img alt='weather' className='weather-icon' src={icon} />
        </div>       
      </div>

      <div className="bottom">


        {dayIndex >= 2 && (
            <div className='hourly'>
                <p>{data.list[dayIndex - 2].dt_txt.split(' ')[1].split(':').slice(0, 2).join(':')} / <span className="forecast-temperature"> {Math.floor(data.list[dayIndex-2].main.temp)}°C</span></p>
            </div>
            )}

            <div className='hourly'>
            <p>{data.list[dayIndex].dt_txt.split(' ')[1].split(':').slice(0, 2).join(':')} / <span className="forecast-temperature">{Math.floor(data.list[dayIndex].main.temp)}°C</span></p>
            </div>

            {dayIndex + 2 < data.list.length && (
            <div className='hourly'>
                <p>{data.list[dayIndex + 2].dt_txt.split(' ')[1].split(':').slice(0, 2).join(':')} / <span className="forecast-temperature">{Math.floor(data.list[dayIndex+2].main.temp)}°C</span></p>
            </div>
        )}

      </div>

    </div>
  );
};

export default ForecastWeather;


