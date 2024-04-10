import { Color } from '../types/Color.ts';
import { Font } from '../types/Font.ts';
import Sensor from '../types/Sensor.ts';
import simpleheat from 'simpleheat';

export default class CanvasRenderer {
	Screen: number[];
	Canvas: OffscreenCanvas;
	Context: OffscreenCanvasRenderingContext2D;
	RenderCanvas: HTMLCanvasElement;
	RenderContext: CanvasRenderingContext2D;
	HeatmapCanvas: OffscreenCanvas;
	HeatmapContext: OffscreenCanvasRenderingContext2D;
	Origin: number[];

	constructor(canvas: HTMLCanvasElement, origin: number[]) {
		this.Screen = [window.outerWidth, window.outerHeight];
		this.RenderCanvas = canvas;
		this.RenderContext = this.RenderCanvas.getContext('2d') ?? new CanvasRenderingContext2D();
		this.HeatmapCanvas = new OffscreenCanvas(window.innerWidth * 4, window.innerHeight * 4);
		this.HeatmapContext = this.HeatmapCanvas.getContext('2d') ?? new OffscreenCanvasRenderingContext2D();
		this.Canvas = new OffscreenCanvas(window.innerWidth * 4, window.innerHeight * 4);
		this.Context = this.Canvas.getContext('2d') ?? new OffscreenCanvasRenderingContext2D();
		this.Origin = origin;
	}

	/**
	 * Adds text
	 *
	 * @param text - Text to write to the screen
	 * @param location - Location on the screen [X,Y]
	 * @param color - Color of the text
	 * @param stroke - If the text should have a stroke
	 * @param maxWidth - Maximum width of the text in px
	 * @constructor
	 */
	Text(
		text: string,
		location: number[],
		color: Color = Color.BRIGHT_WHITE,
		stroke: boolean = false,
		maxWidth?: number | undefined,
	) {
		// Verify params
		if (location.length != 2) throw new RangeError(`Length of 'location' must be 2, currently ${location.length}`);

		// Conversion
		const rLocation = this.GetScreenLocation(location);

		// Write to canvas
		this.SetColor(color);
		stroke
			? this.RenderContext.strokeText(text, rLocation[0], rLocation[1], maxWidth)
			: this.RenderContext.fillText(text, rLocation[0], rLocation[1], maxWidth);

		this.Render();
	}

	/**
	 * Draws a straight line
	 *
	 * @param from - Starting location [X,Y]
	 * @param to - End Location [X,Y]
	 * @param color - Color of the line
	 * @constructor
	 */
	Line(from: number[], to: number[], color: Color = Color.BRIGHT_WHITE) {
		// Verify params
		if (from.length != 2) throw new RangeError(`Length of 'from' must be 2, currently ${from.length}`);
		if (to.length != 2) throw new RangeError(`Length of 'to' must be 2, currently ${to.length}`);

		// Conversion
		const rFrom = this.GetScreenLocation(from);
		const rTo = this.GetScreenLocation(to);

		// Write to canvas
		this.SetColor(color);
		this.RenderContext.moveTo(rFrom[0], rFrom[1]);
		this.RenderContext.lineTo(rTo[0], rTo[1]);
		this.RenderContext.stroke();

		this.Render();
	}

	/**
	 * Draws a circle
	 *
	 * @param center - Center of the circle
	 * @param radius - Radius of the circle
	 * @param color - Color of the circle
	 * @constructor
	 */
	Circle(center: number[], radius: number, color: Color = Color.BRIGHT_WHITE) {
		// Verify params
		if (center.length != 2) throw new RangeError(`Length of 'center' must be 2, currently ${center.length}`);

		// Conversion
		const rCenter = this.GetScreenLocation(center);

		// Write to canvas
		this.SetColor(color);
		this.RenderContext.beginPath();
		this.RenderContext.arc(rCenter[0], rCenter[1], radius, 0, 2 * Math.PI);
		this.RenderContext.stroke();

		this.Render();
	}

	/**
	 * Draws a circular gradient
	 *
	 * @param center - Start corner of the box
	 * @param width - Width of box
	 * @param height - Height of box
	 * @param startColor - Color of circle
	 * @param endColor - Color of background
	 * @constructor
	 */
	Gradient(
		center: number[],
		width: number,
		height: number,
		startColor: Color = Color.BRIGHT_GREEN,
		endColor: Color = Color.BLACK,
	) {
		// Verify params
		if (center.length != 2) throw new RangeError(`Length of 'center' must be 2, currently ${center.length}`);

		// Conversion
		const Center = this.GetScreenLocation(center);

		// Calculate center of the rectangle
		const centerX = Center[0] + width / 2;
		const centerY = Center[1] + height / 2;

		// Write to canvas
		this.SetColor(startColor);
		const grd = this.RenderContext.createRadialGradient(centerX, centerY, 0, centerX, centerY, width / 2);
		grd.addColorStop(0, startColor);
		grd.addColorStop(0.8, endColor);
		grd.addColorStop(1, Color.TRANSPARENT);
		this.RenderContext.fillStyle = grd;
		this.RenderContext.fillRect(Center[0], Center[1], width, height);

		this.Render();
	}

	/**
	 * Creates a heatmap from data points
	 *
	 * @param data - Data points
	 * @constructor
	 */
	Heatmap(data: Sensor[]) {
		const points = data.map((sensor) => {
			const screenLocation = this.GetScreenLocation([sensor.latitude, sensor.longitude]);
			return [screenLocation[0], screenLocation[1], sensor.value];
		}) as ([number, number] | [number, number, number])[];

		console.log(points);
		simpleheat(this.RenderCanvas).data(points).draw();

		this.Render();
	}

	/**
	 * Draws an SVG
	 *
	 * @param image - Image URL
	 * @param location - Top-left location [X,Y]
	 * @constructor
	 */
	Svg(image: string, location: number[]) {
		// Verify params
		if (location.length != 2) throw new RangeError(`Length of 'location' must be 2, currently ${location.length}`);

		// Conversion
		const rLocation = this.GetScreenLocation(location);

		// Write to canvas
		const img = new Image();
		img.onload = () => {
			this.RenderContext.drawImage(img, rLocation[0], rLocation[1]);
			this.Render();
		};
		img.crossOrigin = 'anonymous';
		img.src = image;
	}

	/**
	 * Creates a grid with location markers
	 *
	 * @param interval - How much room should there be between lines
	 * @constructor
	 */
	LocationGrid(interval: number) {
		[...new Array(Math.floor(this.Canvas.height / interval)).keys()].forEach((y) => {
			this.Line([0, y * interval], [this.Canvas.width, y * interval], Color.TRANSPARENT_WHITE);
			this.Text((y * interval).toFixed() + 'y', [15, y * interval + 15]);
		});

		[...new Array(Math.floor(this.Canvas.width / interval)).keys()].forEach((x) => {
			this.Line([x * interval, 0], [x * interval, this.Canvas.height], Color.TRANSPARENT_WHITE);
			this.Text((x * interval).toFixed() + 'x', [x * interval + 15, 15]);
		});
	}

	/**
	 * Zoom in the canvas
	 *
	 * @param level - Zoom multiplier
	 * @constructor
	 */
	Zoom(level: number) {
		this.RenderContext.scale(level, level);
		this.RenderContext.scale(level, level);
	}

	/**
	 * Sets the font used
	 *
	 * @param font - Font enum
	 * @constructor
	 */
	SetFont(font: Font) {
		this.RenderContext.font = font;
		this.Render();
	}

	/**
	 * Copy OffscreenCanvas to the screen
	 *
	 * @constructor
	 */
	Render() {
		// const imageData = this.RenderContext.getImageData(0, 0, window.innerWidth * 4, window.innerHeight * 4);
		//
		// this.RenderContext.putImageData(imageData, 0, 0);
	}

	/**
	 * Convert a position on a 1920x1080 grid to the correct place on the current resolution
	 *
	 * @param position - [X,Y] position
	 * @constructor
	 * @private
	 */
	private GetScreenLocation(position: number[]) {
		// Verify params
		if (position.length != 2) throw new RangeError(`Length of 'position' must be 2, currently ${position.length}`);

		// Return canvas location
		return [(this.Origin[0] - position[0]) * 100000, (position[1] - this.Origin[1]) * 100000];
		// return [(position[0] / 1920) * this.Screen[0], (position[1] / 1080) * this.Screen[1]];
	}

	/**
	 * Set the drawing color
	 *
	 * @param color - Color enum
	 * @constructor
	 * @private
	 */
	private SetColor(color: Color) {
		this.RenderContext.fillStyle = color;
		this.RenderContext.strokeStyle = color;
	}
}
