import React from 'react';
import Header from './components/Header';
import { WeatherProvider } from './components/WeatherContext';
import Form from './components/Form';
import Show from './components/Show';
import './App.css';

function App() {
	return (
		<div className='App'>
			<Header />
			<WeatherProvider>
				<Form />
				<Show />
			</WeatherProvider>
		</div>
	);
}

export default App;
