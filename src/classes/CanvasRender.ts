import CanvasMap from '../types/CanvasMap.ts';
import Room from '../types/Room.ts';
import { Color } from '../types/Color.ts';
import simpleheat from 'simpleheat';

export default class CanvasRender {
	Canvas: HTMLCanvasElement;
	Context: CanvasRenderingContext2D;
	Origin: number[];
	Bound: number[];
	Map: CanvasMap;

	/**
	 * Handles all the canvas code
	 *
	 * @param canvas - Ref to the canvas
	 * @param map - Map data
	 */
	constructor(canvas: HTMLCanvasElement, map: CanvasMap) {
		this.Canvas = canvas;
		this.Context = canvas.getContext('2d') ?? new CanvasRenderingContext2D();
		this.Origin = map.topLeftBounds;
		this.Bound = map.bottomRightBounds;
		this.Map = map;

		this.Canvas.onclick = (ev) => {
			console.log([
				this.Origin[0] + (ev.x / this.Canvas.width) * (this.Bound[0] - this.Origin[0]),
				this.Origin[1] + (ev.y / this.Canvas.height) * (this.Bound[1] - this.Origin[1]),
			]);
		};
	}

	/**
	 * Adds all map elements
	 *
	 * @constructor
	 */
	Init() {
		this.Context.scale(0.7, 0.7);

		this.AddMap(this.Map.svgMap);
		this.AddHeatmap();
		this.AddRooms(this.Map.rooms);
	}

	/**
	 * Add image as map
	 *
	 * @param mapUrl - Full URL to image to load as map
	 * @constructor
	 * @private
	 */
	private AddMap(mapUrl: string) {
		const image = new Image();
		image.src = mapUrl;
		image.onload = () => {
			this.Context.drawImage(image, 0, 0);
		};
	}

	/**
	 * Adds all rooms to the map
	 *
	 * @param rooms - List of rooms to add
	 * @constructor
	 * @private
	 */
	private AddRooms(rooms: Room[]) {
		this.Context.globalCompositeOperation = 'destination-over'; // Needed to prevent the rooms from overwriting the heatmap
		rooms.forEach((room: Room) => {
			this.AddRoom(room.points, room.visualizationData); // TODO: hex to color
		});
		this.Context.globalCompositeOperation = 'source-over';
	}

	/**
	 * Adds a single room to the map
	 *
	 * @param points - List of coordinates representing the corners of the room
	 * @param color - The color of the room
	 * @constructor
	 * @private
	 */
	private AddRoom(points: number[][], color: Color) {
		const canvasPoints = points.map((point) => this.GpsToScreen(point)); // Convert GPS coordinates to screen position

		this.Context.fillStyle = color;
		this.Context.beginPath();
		canvasPoints.forEach((point, i) => {
			if (i === 0) this.Context.moveTo(point[0], point[1]);
			else this.Context.lineTo(point[0], point[1]);
		});

		this.Context.closePath();
		this.Context.fill();
	}

	/**
	 * Creates a heatmap from data
	 *
	 * @constructor
	 * @private
	 */
	private AddHeatmap() {
		simpleheat(this.Canvas)
			.radius(40, 15)
			.data([
				[800, 800, 0.4],
				[850, 820, 0.7],
				[810, 850, 0.45],
			])
			.draw();
	}

	/**
	 * Converts GPS coordinates to screen locations
	 *
	 * @param coordinates - GPS coordinates
	 * @constructor
	 * @private
	 */
	private GpsToScreen(coordinates: number[]) {
		return [
			((coordinates[0] - this.Origin[0]) / (this.Bound[0] - this.Origin[0])) * this.Canvas.width * 1.43, // 1.43 to compensate for 0.7 zoom
			((coordinates[1] - this.Origin[1]) / (this.Bound[1] - this.Origin[1])) * this.Canvas.height * 1.43,
		];
	}
}
