import MapComponent from './components/Map.tsx';
import SuggestionComponent from './components/Suggestions.tsx';

function App() {
	return (
		<div className="flex flex-col h-screen">
			<SuggestionComponent />
			<MapComponent />
		</div>
	);
}

export default App;
