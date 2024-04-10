import Room from './Room.ts';

export default class CanvasMap {
	svgMap: string;
	longitude: number;
	latitude: number;
	rooms: Room[];

	constructor(svgMap: string, longitude: number, latitude: number, rooms: Room[]) {
		this.svgMap = svgMap;
		this.longitude = longitude;
		this.latitude = latitude;
		this.rooms = rooms;
	}
}
