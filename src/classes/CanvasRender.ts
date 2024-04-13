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

	constructor(canvas: HTMLCanvasElement, map: CanvasMap) {
		this.Canvas = canvas;
		this.Context = canvas.getContext('2d') ?? new CanvasRenderingContext2D();
		this.Origin = map.topLeftBounds;
		this.Bound = map.bottomRightBounds;
		this.Map = map;
	}

	Init() {
		this.Context.scale(0.7, 0.7);
		this.AddMap(this.Map.svgMap);
		this.AddHeatmap();
		this.AddRooms(this.Map.rooms);
	}

	private AddMap(mapUrl: string) {
		const image = new Image();
		image.src = mapUrl;
		image.onload = () => {
			this.Context.drawImage(image, 0, 0);
		};
	}

	private AddRooms(rooms: Room[]) {
		this.Context.globalCompositeOperation = 'destination-over';
		rooms.forEach((room: Room) => {
			this.AddRoom(room.points, Color.WHITE); // TODO: hex to color
		});
		this.Context.globalCompositeOperation = 'source-over';
	}

	private AddRoom(points: number[][], color: Color) {
		const canvasPoints = points.map((point) => this.GpsToScreen(point));

		this.Context.fillStyle = color;
		this.Context.beginPath();
		canvasPoints.forEach((point, i) => {
			if (i === 0) this.Context.moveTo(point[0], point[1]);
			else this.Context.lineTo(point[0], point[1]);
		});

		this.Context.closePath();
		this.Context.fill();
	}

	private AddHeatmap() {
		simpleheat(this.Canvas)
			.data([
				[100, 100, 0.9],
				[200, 100, 0.85],
			])
			.draw();
	}

	private GpsToScreen(coordinates: number[]) {
		const size = [this.Bound[0] - this.Origin[0], this.Bound[1] - this.Origin[1]];
		const location = [coordinates[0] - this.Origin[0], coordinates[1] - this.Origin[1]];

		return [(location[0] / size[0]) * this.Canvas.width, (location[1] / size[1]) * this.Canvas.height];
	}
}
