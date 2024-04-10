export default class Room {
	id: number;
	name: string;
	longitude: number;
	latitude: number;
	visualizationData: string;

	constructor(id: number, name: string, longitude: number, latitude: number, visualizationData: string) {
		this.id = id;
		this.name = name;
		this.longitude = longitude;
		this.latitude = latitude;
		this.visualizationData = visualizationData;
	}
}
