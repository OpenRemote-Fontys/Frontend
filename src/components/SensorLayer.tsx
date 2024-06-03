import { Marker, Tooltip, useMap } from 'react-leaflet';
import Sensor from '../types/Sensor.ts';
import { useState } from 'react';

/**
 * HTML Props for SensorLayer
 * @see SensorLayer
 */
interface SensorLayerProps {
	data: Sensor[];
}

/**
 * A leaflet layer that adds all sensor related map items
 *
 * @param props
 * @constructor
 */
export default function SensorLayer(props: Readonly<SensorLayerProps>) {
	const [markerVisibility, setMarkerVisibility] = useState<boolean>(false);
	const map = useMap();

	map.on('zoomend', () => {
		if (map.getZoom() >= 16) setMarkerVisibility(true);
		else setMarkerVisibility(false);
	});

	return (
		<>
			{props.data.map((sensor: Sensor) => {
				return (
					<Marker
						key={sensor.id}
						position={sensor.coordinates}
						title={sensor.name}
						opacity={markerVisibility ? 1 : 0}
					>
						{markerVisibility ? (
							<Tooltip position={sensor.coordinates} permanent={true}>
								<p>{sensor.value}</p>
							</Tooltip>
						) : (
							<></>
						)}
					</Marker>
				);
			})}
		</>
	);
}
