import MapComponent from './components/Map.tsx';
import SuggestionComponent from './components/Suggestions.tsx';
import FooterComponent from './components/Footer.tsx';

function App() {
	return (
		<div className="flex flex-col h-screen">
			<SuggestionComponent />
			<MapComponent />
			<div className="">
				<FooterComponent />
			</div>
		</div>
	);
}

export default App;
