import { Color } from './Color.ts';

export default class ColorStop {
	distance: number;
	color: Color;

	constructor(distance: number, color: Color) {
		this.distance = distance;
		this.color = color;
	}
}
