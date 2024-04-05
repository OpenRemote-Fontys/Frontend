import { useEffect, useRef } from 'react';
import CanvasRenderer from './components/CanvasRenderer.ts';

function App() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const heatmapCanvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (!canvasRef.current) return
		if (!heatmapCanvasRef.current) return
		
		const map = new CanvasRenderer(canvasRef.current, heatmapCanvasRef.current);
		map.Svg('https://autumn.revolt.chat/attachments/RfqzEfntQZNjAT2uVc-AGm27kkYvZF_7WBtRQx11FH/TQ.svg', [0, 0]);
		map.LocationGrid(200)
		map.Heatmap([
			{
				location: [1000, 1000],
				value: 5,
			},
			{
				location: [975, 1000],
				value: 3,
			},
			{
				location: [100, 100],
				value: 3,
			}
		]);
	}, [canvasRef.current, heatmapCanvasRef.current]);

	return (
		<>
			<canvas
				className="w-screen h-screen overflow-hidden"
				height={window.innerHeight}
				width={window.innerWidth}
				ref={canvasRef}
				id="renderCanvas"
			/>
			<canvas
				className="w-screen h-screen overflow-hidden"
				height={window.innerHeight*2}
				width={window.innerWidth*2}
				ref={heatmapCanvasRef}
				id="heatmapCanvas"
			/>
		</>
	);
}

export default App;
