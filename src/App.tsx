import { useEffect, useRef } from 'react';
import CanvasRenderer from './components/CanvasRenderer.ts';
import { Color } from './types/Color.ts';
import { Font } from './types/Font.ts';

function App() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const map = new CanvasRenderer(canvasRef.current ?? new HTMLCanvasElement());
		map.Zoom(1);
		map.SetFont(Font.VERDANA_40);
		map.Text('Pain', [50, 50], Color.BRIGHT_RED);
		map.SetFont(Font.SANS_SERIF_50);
		map.Text('and suffering', [50, 90], Color.GREEN);
		map.Line([60, 60], [100, 50], Color.CYAN);
		map.Circle([180, 180], 10, Color.YELLOW);
		map.Gradient([1000, 100],200, 200, Color.BRIGHT_GREEN, Color.BLACK)
		map.Svg('https://upload.wikimedia.org/wikipedia/commons/f/f7/Bananas.svg', [150, 150]);
	}, []);

	return (
		<canvas
			className="w-screen h-screen overflow-hidden"
			height={window.innerHeight}
			width={window.innerWidth}
			ref={canvasRef}
		/>
	);
}

export default App;
