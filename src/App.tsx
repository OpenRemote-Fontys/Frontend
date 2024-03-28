import { useEffect, useRef } from 'react';
import CanvasRenderer from './components/CanvasRenderer.ts';
import { Color } from './types/Color.ts';

function App() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const map = new CanvasRenderer(canvasRef.current ?? new HTMLCanvasElement());		

		map.Gradient([720, 500], 500, 500, Color.MAGENTA, Color.YELLOW)
		map.Gradient([720, 600], 100, 100, Color.MAGENTA, Color.YELLOW)
		map.Svg('https://autumn.revolt.chat/attachments/RfqzEfntQZNjAT2uVc-AGm27kkYvZF_7WBtRQx11FH/TQ.svg', [0, 0]);
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
