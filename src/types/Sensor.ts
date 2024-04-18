export default interface Sensor {
	id: number;
	name: string;
	roomId: number;
	value: number;
	sensorData: string;
	longitude: number;
	latitude: number;
}
