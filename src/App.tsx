import { useEffect, useRef } from 'react';
import MapComponent from './components/map/Map';
import SuggestionComponent from './components/suggestions/Suggestions';
import FooterComponent from './components/footer/Footer';

function App() {
	useEffect(() => {
		
	}, []);

	return (
		<div className='app-container'>
            <div className='map-container'>
                <MapComponent></MapComponent>
            </div>
            <div className='suggestions-container'>
                <SuggestionComponent></SuggestionComponent>
            </div>
            <div className='footer-container'>
                <FooterComponent></FooterComponent>
            </div>
        </div>
	);
}

export default App;
