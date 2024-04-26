import { SensorType } from './SensorType.ts';
import Coordinates from './Coordinates.ts';

export default interface Sensor {
	id: number;
	name: string;
	roomId: number;
	value: number;
	sensorType: SensorType;
	coordinates: Coordinates;
}
