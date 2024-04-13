import Room from './Room.ts';

export default class CanvasMap {
	svgMap: string;
	topLeftBounds: number[];
	bottomRightBounds: number[];
	rooms: Room[];

	constructor(svgMap: string, topLeftBounds: number[], bottomRightBounds: number[], rooms: Room[]) {
		this.svgMap = svgMap;
		this.topLeftBounds = topLeftBounds;
		this.bottomRightBounds = bottomRightBounds;
		this.rooms = rooms;
	}
}
