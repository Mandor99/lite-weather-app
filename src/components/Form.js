import React, { useContext } from 'react';
import { WeatherContext } from './WeatherContext';
import './css/Form.css';

function Form() {
	const { setData } = useContext(WeatherContext);
	const getData = async (e) => {
		e.preventDefault();
		// console.log(e.target.elements.search.value); to get children of form(element is form, elements is children)
		const API = {
			url: 'https://api.openweathermap.org/data/2.5/',
			key: '012261cee5d1a4cd0b01a16274571eaf',
		};
		const city = e.target.elements.search.value;
		try {
			const all_api = await fetch(
				`${API.url}weather?q=${city}&units=metric&appId=${API.key}`,
			);
			const data = await all_api.json();
			const { name, sys, main, weather, wind } = data;
			// console.log(data);
			setData({
				...data,
				country: `${name}, ${sys.country}`,
				degree: Math.floor(main.temp),
				description: weather[0].description,
				speed: wind.speed,
				humidity: main.humidity,
				icon: `http://openweathermap.org/img/wn/${weather[0].icon}@4x.png`,
			});
		} catch (error) {
			alert('something error may be the wrong is country name');
		}
	};

	return (
		<form id='form' onSubmit={getData}>
			<input
				className='cityName'
				type='text'
				name='search'
				placeholder='find another city ...'
				// onChange={(e) => console.log(e)}
			/>
		</form>
	);
}

export default Form;
