import Coordinates from './Coordinates.ts';

/**
 * Room data
 */
export default interface Room {
	id: number;
	name: string;
	roomBounds: Coordinates[];
	color: string;
}
