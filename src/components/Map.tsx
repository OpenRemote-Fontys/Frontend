import MapCanvas from './MapCanvas.tsx';
import Footer from './Footer.tsx';

const MapComponent = () => {
	return (
		<>
			<div className="w-full h-inherit pt-2.5 overflow-hidden">
				<div className="h-full w-full p-6">
					<div className="flex flex-row">
						<h1 className="font-thin px-2">Legenda: </h1>
						<span className="bg-red-600 px-5">Loud</span>
						<span className="bg-yellow-500 px-5">Noisy</span>
						<span className="bg-green-600 px-5">Silent</span>
					</div>
					<MapCanvas />
				</div>
			</div>
			<Footer />
		</>
	);
};

export default MapComponent;
