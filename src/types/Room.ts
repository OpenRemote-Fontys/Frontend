import Coordinates from './Coordinates.ts';

/**
 * Room data
 */
export default interface Room {
	id: number;
	name: string;
	locationArrays: Coordinates[];
	color: string;
}
