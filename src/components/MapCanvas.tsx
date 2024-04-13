import { useEffect, useRef } from 'react';
import CanvasRender from '../classes/CanvasRender.ts';
import CanvasMap from '../types/CanvasMap.ts';
import Room from '../types/Room.ts';
import { Color } from '../types/Color.ts';

export default function MapCanvas() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		fetch(new URL(import.meta.env.VITE_MAP_ENDPOINT, import.meta.env.VITE_BACKEND_URL))
			.then((res) => res.json())
			.then((mapData: CanvasMap) => {
				if (!canvasRef.current) return;
				if (!mapData) return;

				// TODO: Temporary fix, remove
				const canvasMap = new CanvasMap(
					'https://autumn.revolt.chat/attachments/RfqzEfntQZNjAT2uVc-AGm27kkYvZF_7WBtRQx11FH/TQ.svg',
					[51.450472, 5.452806],
					[51.451806, 5.453639],
					[
						new Room(
							1,
							'Room 1',
							[
								[51.45098336666666, 5.4530463552083335],
								[51.45100683518518, 5.4530463552083335],
								[51.45100683518518, 5.453057201562499],
								[51.45098336666666, 5.453057201562499],
							],
							Color.TRANSPARENT_PURPLE,
						),
						new Room(
							2,
							'Room 2',
							[
								[51.451041420370366, 5.453043318229167],
								[51.45113652962963, 5.453043318229167],
								[51.45113652962963, 5.453057635416666],
								[51.451042655555554, 5.453057635416666],
							],
							Color.TRANSPARENT_GREEN,
						),
					],
				);

				const canvasRenderer = new CanvasRender(canvasRef.current, canvasMap);
				canvasRenderer.Init();
			});
	}, []);

	return <canvas height={window.innerHeight} width={window.innerWidth} ref={canvasRef} id="mapCanvas"></canvas>;
}
