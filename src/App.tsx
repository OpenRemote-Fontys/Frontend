import { useEffect, useRef } from 'react';
import MapComponent from './components/map/Map';
import SuggestionComponent from './components/suggestions/Suggestions';
import FooterComponent from './components/footer/Footer';

function App() {
	useEffect(() => {
		
	}, []);

	return (
		<div className='app-container'>            
            <div className='suggestions-container'>
                <SuggestionComponent />
            </div>
            <div className='map-container'>
                <MapComponent />
            </div>
            <div className='footer-container'>
                <FooterComponent />
            </div>
        </div>
	);
}

export default App;
