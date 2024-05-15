import Room from './Room.ts';
import { LatLngTuple } from 'leaflet';

/**
 * Map data
 */
export default interface MapData {
	mapUrl: string;
	topLeftBounds: LatLngTuple;
	bottomRightBounds: LatLngTuple;
	center: LatLngTuple;
	rooms: Room[];
}
