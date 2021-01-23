import React, { createContext, useState, useEffect } from 'react';

export const WeatherContext = createContext();

export const WeatherProvider = (props) => {
	const [data, setData] = useState({
		country: '',
		degree: null,
		description: '',
		speed: null,
		humidity: null,
		icon: '',
	});

	const getCurrentLocation = () => {
		navigator.geolocation
			? navigator.geolocation.getCurrentPosition(showPosition, showError)
			: alert('Geolocation is not supported by this browser.');
	};
	function showPosition(position) {
		const lat = `${position.coords.latitude}`;
		const lon = `${position.coords.longitude}`;
		const API = {
			url: 'https://api.openweathermap.org/data/2.5/',
			key: '012261cee5d1a4cd0b01a16274571eaf',
		};
		fetch(
			`${API.url}weather?lat=${lat}&lon=${lon}&units=metric&appId=${API.key}`,
		)
			.then((res) => res.json())
			.then((weather) =>
				setData({
					...data,
					country: `${weather.name}, ${weather.sys.country}`,
					degree: Math.floor(weather.main.temp),
					description: weather.weather[0].description,
					speed: weather.wind.speed,
					humidity: weather.main.humidity,
					icon: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`,
				}),
			);
	}
	function showError(error) {
		switch (error.code) {
			case error.PERMISSION_DENIED:
				alert('User denied the request for Geolocation.');
				break;
			case error.POSITION_UNAVAILABLE:
				alert('Location information is unavailable.');
				break;
			case error.TIMEOUT:
				alert('The request to get user location timed out.');
				break;
			case error.UNKNOWN_ERROR:
				alert('An unknown error occurred.');
				break;
		}
	}

	useEffect(() => {
		getCurrentLocation();
	}, []);

	return (
		<WeatherContext.Provider value={{ data, setData }}>
			{props.children}
		</WeatherContext.Provider>
	);
};
