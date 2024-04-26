import { Color } from './Color.ts';
import Coordinates from './Coordinates.ts';

export default interface Room {
	id: number;
	name: string;
	locationArrays: Coordinates[];
	color: Color;
}
