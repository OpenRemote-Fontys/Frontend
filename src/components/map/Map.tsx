import MapCanvas from '../MapCanvas';
import './styles.css';

const MapComponent = () => {
	return (
		<div className="map-wrapper">
			<div className="map-card card">
				<MapCanvas />
			</div>
		</div>
	);
};

export default MapComponent;
