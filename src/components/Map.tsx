import MapCanvas from './MapCanvas.tsx';
import FooterComponent from './Footer.tsx';
import { useState } from 'react';

const MapComponent = () => {
	const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

	return (
		<>
			<div className="w-full h-inherit pt-2.5 overflow-hidden">
				<div className="h-full w-full p-6">
					<MapCanvas onUpdate={setLastUpdate} />
				</div>
			</div>
			<FooterComponent lastUpdate={lastUpdate} />
		</>
	);
};

export default MapComponent;
