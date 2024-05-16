import { LatLngExpression } from 'leaflet';

/**
 * Room data
 */
export default interface Room {
	id: string;
	name: string;
	roomBounds: LatLngExpression[];
	color: string;
}
