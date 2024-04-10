import { useEffect, useRef, useState } from 'react';
import CanvasRenderer from './CanvasRenderer.ts';
import CanvasMap from '../types/CanvasMap.ts';
import Sensor from '../types/Sensor.ts';

interface MapCanvasProps {
	LocationGrid?: boolean;
	Zoom?: number;
}

export default function MapCanvas(props: Readonly<MapCanvasProps>) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [mapState, setMapState] = useState<CanvasMap | undefined>(undefined);
	const [sensorState, setSensorState] = useState<Sensor[] | undefined>(undefined);

	useEffect(() => {
		fetch('http://localhost:5200/map/test')
			.then((res) => res.json())
			.then((data) => {
				data.svgMap =
					'https://autumn.revolt.chat/attachments/RfqzEfntQZNjAT2uVc-AGm27kkYvZF_7WBtRQx11FH/TQ.svg';
				setMapState(data);
			});

		fetch('http://localhost:5200/sensor/test')
			.then((res) => res.json())
			.then((data) => {
				setSensorState(data);
			});
	}, []);

	useEffect(() => {
		if (!canvasRef.current) return;
		if (!mapState) return;
		if (!sensorState) return;

		const canvasRenderer = new CanvasRenderer(canvasRef.current, [mapState.latitude, mapState.longitude]);

		canvasRenderer.Zoom(props.Zoom ?? 1);
		canvasRenderer.Svg(mapState.svgMap, [0, 0]);
		if (props.LocationGrid) canvasRenderer.LocationGrid(200);
		canvasRenderer.Heatmap(sensorState);
	}, [mapState, props.LocationGrid, props.Zoom, sensorState]);

	if (!mapState || !sensorState) return <h1>Loading</h1>;
	return (
		<canvas
			className="w-screen h-screen overflow-hidden"
			height={window.innerHeight}
			width={window.innerWidth}
			ref={canvasRef}
			id="renderCanvas"
		/>
	);
}
