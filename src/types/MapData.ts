import Room from './Room.ts';
import Coordinates from './Coordinates.ts';

/**
 * Map data
 */
export default interface MapData {
	mapUrl: string;
	topLeftBounds: Coordinates;
	bottomRightBounds: Coordinates;
	center: Coordinates;
	rooms: Room[];
}
