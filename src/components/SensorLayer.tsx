import { Circle } from 'react-leaflet';
import Sensor from '../types/Sensor.ts';
import * as cc from 'color-convert';

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
					<Circle
						key={sensor.id}
						center={sensor.coordinates}
						radius={(sensor.value - 0.2) * 7}
						color={'#00000000'}
						fillColor={
							'#' + cc.hsv.hex([100 - (sensor.value > 1 ? 1 : sensor.value - 0.2 * 0.5) * 100, 100, 100])
						}
					/>
				);
			})}
		</>
	);
}
