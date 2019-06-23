import React from 'react';
import Image from './Image.js';
import BasicInfo from './BasicInfo';

const Weather = ({location, current}) => {

  let info = {Condition: current.condition.text, Wind: current.wind_kph, Temperature: `${current.feelslike_c}°C`};

  return (
    <div className="weather">
      <h3>Weather in { location.name }</h3>
      <Image altText="condition" url={ current.condition.icon } />
      <BasicInfo { ...info }/>
    </div>
  );
}

export default Weather
