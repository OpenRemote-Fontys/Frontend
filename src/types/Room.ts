import { Color } from './Color.ts';

export default interface Room {
	id: number;
	name: string;
	points: number[][];
	visualizationData: Color;
}
