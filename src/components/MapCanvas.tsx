import { useEffect, useRef } from 'react';
import CanvasRender from '../classes/CanvasRender.ts';
import CanvasMap from '../types/CanvasMap.ts';
import Room from '../types/Room.ts';

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
								[51.4505, 5.4529],
								[51.4506, 5.4529],
								[51.4506, 5.453],
								[51.4505, 5.453],
							],
							'#FFFFFF',
						),
					],
				);

				const canvasRenderer = new CanvasRender(canvasRef.current, canvasMap);
				canvasRenderer.Init();
			});
	}, []);

	return <canvas height={window.innerHeight} width={window.innerWidth} ref={canvasRef} id="mapCanvas"></canvas>;
}
