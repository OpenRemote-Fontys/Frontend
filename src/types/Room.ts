export default class Room {
	id: number;
	name: string;
	points: number[][];
	visualizationData: string;

	constructor(id: number, name: string, points: number[][], visualizationData: string) {
		this.id = id;
		this.name = name;
		this.points = points;
		this.visualizationData = visualizationData;
	}
}
