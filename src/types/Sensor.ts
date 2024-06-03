import { SensorType } from './SensorType.ts';
import { LatLngTuple } from 'leaflet';

/**
 * Sensor data
 */
export default interface Sensor {
	id: number;
	name: string;
	roomId: number;
	value: number;
	sensorType: SensorType;
	coordinates: LatLngTuple;
}
