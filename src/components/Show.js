import React, { useContext } from 'react';
import { WeatherContext } from './WeatherContext';
import './css/Show.css';

function Show() {
	const { data } = useContext(WeatherContext);
	return (
		<div>
			{data.country && <p className='country'>{data.country}</p>}
			{data.degree && <p className='degree'>{data.degree}&#8451;</p>}
			{data.description && <p className='description'>{data.description}</p>}
			{data.speed && (
				<p className='speed'>wind speed: &nbsp; &nbsp; {data.speed} km/h</p>
			)}
			{data.humidity && (
				<p className='humidity'>humidity: &nbsp; &nbsp; {data.humidity}%</p>
			)}
			{data.icon && (
				<div>
					<img src={`${data.icon}`} alt='icon' />
				</div>
			)}
		</div>
	);
}

export default Show;
