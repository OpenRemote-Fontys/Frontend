export default class Sensor {
	id: number;
	name: string;
	roomId: number;
	value: number;
	sensorData: string;
	longitude: number;
	latitude: number;

	constructor(
		id: number,
		name: string,
		roomId: number,
		value: number,
		sensorData: string,
		longitude: number,
		latitude: number,
	) {
		this.id = id;
		this.name = name;
		this.roomId = roomId;
		this.value = value;
		this.sensorData = sensorData;
		this.longitude = longitude;
		this.latitude = latitude;
	}
}
