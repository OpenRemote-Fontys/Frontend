import Room from './Room.ts';
import Coordinates from './Coordinates.ts';

export default class MapData {
	mapUrl: string;
	topLeftBounds: Coordinates;
	bottomRightBounds: Coordinates;
	center: Coordinates;
	rooms: Room[];

	constructor(
		svgMap: string,
		topLeftBounds: Coordinates,
		bottomRightBounds: Coordinates,
		center: Coordinates,
		rooms: Room[],
	) {
		this.mapUrl = svgMap;
		this.topLeftBounds = topLeftBounds;
		this.bottomRightBounds = bottomRightBounds;
		this.center = center;
		this.rooms = rooms;
	}
}
