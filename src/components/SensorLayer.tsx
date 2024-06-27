import { Circle } from 'react-leaflet';
import Sensor from '../types/Sensor.ts';
import * as cc from 'color-convert';
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
	const [] = useState();

	return (
		<>
			{props.data.map((sensor: Sensor) => {
				return (
					<Circle
						key={sensor.id}
						center={sensor.coordinates}
						radius={6}
						color={'#00000000'}
						pathOptions={{ fillColor: '#' + cc.hsv.hex([125 - sensor.value * 100, 100, 100]) }}
						fillOpacity={0.5}
					/>
				);
			})}
		</>
	);
}
