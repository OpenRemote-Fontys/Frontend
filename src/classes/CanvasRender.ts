import MapData from '../types/MapData.ts';
import Room from '../types/Room.ts';
import { Color } from '../types/Color.ts';
import simpleheat from 'simpleheat';
import Sensor from '../types/Sensor.ts';
import Coordinates from '../types/Coordinates.ts';

export default class CanvasRender {
	Canvas: HTMLCanvasElement;
	Context: CanvasRenderingContext2D;
	Origin: Coordinates;
	Bound: Coordinates;
	Map: MapData;
	Sensors: Sensor[];
	private SimpleHeat: simpleheat.Instance;

	/**
	 * Handles all the canvas code
	 *
	 * @param canvas - Ref to the canvas
	 * @param map - Map data
	 */
	constructor(canvas: HTMLCanvasElement, map: MapData) {
		this.Canvas = canvas;
		this.Context = canvas.getContext('2d') ?? new CanvasRenderingContext2D();
		this.Origin = map.topLeftBounds;
		this.Bound = map.bottomRightBounds;
		this.Map = map;
		this.Sensors = [];
		this.SimpleHeat = simpleheat(this.Canvas);
		this.SimpleHeat.radius(40, 15);

		this.Canvas.onclick = (ev) => {
			console.log([
				this.Origin.longitude + (ev.x / this.Canvas.width) * (this.Bound.longitude - this.Origin.longitude),
				this.Origin.latitude + (ev.y / this.Canvas.height) * (this.Bound.latitude - this.Origin.latitude),
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

		this.AddMap(this.Map.mapUrl);
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
			this.AddRoom(room.locationArrays, room.color); // TODO: hex to color
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
	private AddRoom(points: Coordinates[], color: Color) {
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
		const data = this.Sensors.map((sensor) => {
			const location = this.GpsToScreen(sensor.coordinates);
			return [...location, sensor.value];
		}) as [number, number, number][];
		console.log(data);
		this.SimpleHeat.clear();
		this.SimpleHeat.data(data);
		this.SimpleHeat.draw();
	}

	/**
	 * Converts GPS coordinates to screen locations
	 *
	 * @param coordinates - GPS coordinates
	 * @constructor
	 * @private
	 */
	private GpsToScreen(coordinates: Coordinates) {
		return [
			((coordinates.longitude - this.Origin.longitude) / (this.Bound.longitude - this.Origin.longitude)) *
				this.Canvas.width *
				1.43, // 1.43 to compensate for 0.7 zoom
			((coordinates.latitude - this.Origin.latitude) / (this.Bound.latitude - this.Origin.latitude)) *
				this.Canvas.height *
				1.43,
		];
	}

	/**
	 * Updates the map with new sensor data
	 *
	 * @param sensorData - New sensor data
	 * @constructor
	 */
	UpdateMap(sensorData: Sensor[]) {
		this.Sensors = sensorData;
		this.AddHeatmap();
	}
}
