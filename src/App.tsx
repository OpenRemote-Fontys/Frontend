import MapComponent from './components/Map.tsx';
import SuggestionComponent from './components/Suggestions.tsx';
import FooterComponent from './components/Footer.tsx';
import EmptyRoomsComponent from './components/EmptyRooms.tsx';

function App() {
	return (
		<div className="flex flex-col h-screen">
			<SuggestionComponent />
			<EmptyRoomsComponent />
			<MapComponent />
			<div className="">
				<FooterComponent />
			</div>
		</div>
	);
}

export default App;
