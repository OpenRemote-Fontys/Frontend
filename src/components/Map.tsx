import MapCanvas from './MapCanvas.tsx';

const MapComponent = () => {
	return (
		<div className="w-full h-inherit pt-2.5 overflow-hidden">
			<div className="h-full w-full p-6">
				<MapCanvas />
			</div>
		</div>
	);
};

export default MapComponent;
