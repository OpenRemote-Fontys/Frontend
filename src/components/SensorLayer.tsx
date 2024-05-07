import { Marker, Tooltip } from 'react-leaflet';
import Sensor from '../types/Sensor.ts';
import { coordinatesToArray } from '../types/Coordinates.ts';
import { LatLngExpression } from 'leaflet';

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
	return (
		<>
			{props.data.map((sensor: Sensor) => {
				return (
					<Marker
						key={sensor.id}
						position={coordinatesToArray<LatLngExpression>(sensor.coordinates)}
						title={sensor.name}
						opacity={0}
					>
						<Tooltip permanent={true}>
							<p>{sensor.value}</p>
						</Tooltip>
					</Marker>
				);
			})}
		</>
	);
}
