import { Color } from './Color.ts';

export default class Room {
	id: number;
	name: string;
	points: number[][];
	visualizationData: Color;

	constructor(id: number, name: string, points: number[][], visualizationData: Color) {
		this.id = id;
		this.name = name;
		this.points = points;
		this.visualizationData = visualizationData;
	}
}
