export default class Sensor {
	location: number[];
	value: number;

	constructor(location: number[], value: number) {
		this.location = location;
		this.value = value;
	}
}
