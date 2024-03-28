import { Color } from '../types/Color.ts';
import { Font } from '../types/Font.ts';

// OnMouse variables declared here because the object 'this' scope is unavailable in an On... event
let imageData: ImageData | undefined;
let lastImageDrawPosition: number[] = [0, 0];
let startingPosition: number[] | undefined = undefined;

export default class CanvasRenderer {
	Screen: number[];
	Canvas: OffscreenCanvas;
	Context: OffscreenCanvasRenderingContext2D;
	RenderCanvas: HTMLCanvasElement;
	RenderContext: CanvasRenderingContext2D;

	constructor(canvas: HTMLCanvasElement) {
		this.Screen = [window.outerWidth, window.outerHeight];
		this.RenderCanvas = canvas;
		this.RenderContext = this.RenderCanvas.getContext('2d') ?? new CanvasRenderingContext2D();
		this.Canvas = new OffscreenCanvas(window.innerWidth * 4, window.innerHeight * 4);
		this.Context = this.Canvas.getContext('2d') ?? new OffscreenCanvasRenderingContext2D();
		this.RenderCanvas.onmousedown = this.OnMouseDown;
		this.RenderCanvas.onmouseup = this.OnMouseUp;
		this.RenderCanvas.onmouseleave = this.OnMouseUp;
		this.RenderCanvas.onmousemove = this.OnMouseMove;
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
			? this.Context.strokeText(text, rLocation[0], rLocation[1], maxWidth)
			: this.Context.fillText(text, rLocation[0], rLocation[1], maxWidth);

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
		this.Context.moveTo(rFrom[0], rFrom[1]);
		this.Context.lineTo(rTo[0], rTo[1]);
		this.Context.stroke();

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
		this.Context.beginPath();
		this.Context.arc(rCenter[0], rCenter[1], radius, 0, 2 * Math.PI);
		this.Context.stroke();

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
		const grd = this.Context.createRadialGradient(centerX, centerY, 0, centerX, centerY, width / 2);
		grd.addColorStop(0, startColor);
		grd.addColorStop(0.8, endColor);
		grd.addColorStop(1, Color.TRANSPARENT);
		this.Context.fillStyle = grd;
		this.Context.fillRect(Center[0], Center[1], width, height);

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
			this.Context.drawImage(img, rLocation[0], rLocation[1]);
			this.Render();
		};
		img.crossOrigin = 'anonymous';
		img.src = image;
	}

	/**
	 * Zoom in the canvas
	 *
	 * @param level - Zoom multiplier
	 * @constructor
	 */
	Zoom(level: number) {
		this.Context.scale(level, level);
		this.RenderContext.scale(level, level);
	}

	/**
	 * Sets the font used
	 *
	 * @param font - Font enum
	 * @constructor
	 */
	SetFont(font: Font) {
		this.Context.font = font;
		this.Render();
	}

	/**
	 * Copy OffscreenCanvas to the screen
	 *
	 * @constructor
	 */
	Render() {
		imageData = this.Context.getImageData(0, 0, window.innerWidth * 4, window.innerHeight * 4);
		this.RenderContext.putImageData(imageData, 0, 0);
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

		return [(position[0] / 1920) * this.Screen[0], (position[1] / 1080) * this.Screen[1]];
	}

	/**
	 * Set the drawing color
	 *
	 * @param color - Color enum
	 * @constructor
	 * @private
	 */
	private SetColor(color: Color) {
		this.Context.fillStyle = color;
		this.Context.strokeStyle = color;
	}

	private OnMouseDown(e: MouseEvent) {
		startingPosition = [e.x, e.y];
	}

	private OnMouseUp() {
		startingPosition = undefined;
	}

	private OnMouseMove(e: MouseEvent) {
		if (!startingPosition) return;
		if (!imageData) return;

		const canvas = e.target as HTMLCanvasElement;
		const context = canvas.getContext('2d') ?? new CanvasRenderingContext2D();

		lastImageDrawPosition = [
			lastImageDrawPosition[0] + (e.x - startingPosition[0]),
			lastImageDrawPosition[1] + (e.y - startingPosition[1]),
		];
		startingPosition = [e.x, e.y];

		context.clearRect(0, 0, window.innerWidth, window.innerHeight);
		context.putImageData(imageData, lastImageDrawPosition[0], lastImageDrawPosition[1]);
	}
}
