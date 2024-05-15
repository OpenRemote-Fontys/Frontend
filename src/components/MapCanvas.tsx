import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import MapData from '../types/MapData.ts';
import { LatLngTuple } from 'leaflet';
import Sensor from '../types/Sensor.ts';
import SensorLayer from './SensorLayer.tsx';
import RoomLayer from './RoomLayer.tsx';
import { coordinatesToArray } from '../types/Coordinates.ts';

/**
 * Leaflet map used for displaying sensor data
 * @constructor
 */
export default function MapCanvas() {
	const [mapData, setMapData] = useState<MapData | undefined>(undefined);
	const [sensorData, setSensorData] = useState<Sensor[] | undefined>(undefined);

	useEffect(() => {
		fetch(new URL(import.meta.env.VITE_MAP_ENDPOINT, import.meta.env.VITE_BACKEND_URL)) // Construct url
			.then((res) => res.json())
			.then((data: MapData) => {
				setMapData(data);
				window.setInterval(() => UpdateMap(), import.meta.env.VITE_MAP_UPDATE_INTERVAL as number); // Update map every x milliseconds
			});
	}, []);

	const UpdateMap = () => {
		fetch(new URL(import.meta.env.VITE_SENSOR_ENDPOINT, import.meta.env.VITE_BACKEND_URL)) // Construct url
			.then((res) => res.json())
			.then((sensorData: Sensor[]) => setSensorData(sensorData)); // Update sensors on map
	};

	if (!mapData || !sensorData)
		return (
			<div className="flex justify-center align-middle h-screen">
				<h1 className="h-fit my-auto animate-bounce">Loading</h1>
			</div>
		);

	const center = coordinatesToArray<LatLngTuple>(mapData.topLeftBounds);
	// const bounds: LatLngBoundsExpression = [
	// 	coordinatesToArray<LatLngTuple>(mapData.topLeftBounds),
	// 	coordinatesToArray<LatLngTuple>(mapData.bottomRightBounds),
	// ];

	return (
		<MapContainer center={center} zoom={19} scrollWheelZoom={false} className="w-screen h-screen">
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{/*<ImageOverlay url={mapData.mapUrl} bounds={bounds} />*/}
			<RoomLayer data={mapData.rooms} />
			<SensorLayer data={sensorData} />
		</MapContainer>
	);
}
