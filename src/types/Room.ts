import Coordinates from './Coordinates.ts';

/**
 * Room data
 */
export default interface Room {
	id: string;
	name: string;
	roomBounds: Coordinates[];
	color: string;
}
