import { ImageOverlay, MapContainer, Polygon, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import MapData from '../types/MapData.ts';
import { LatLngBoundsExpression, LatLngExpression } from 'leaflet';
import Sensor from '../types/Sensor.ts';
import Room from '../types/Room.ts';
import Coordinates, { coordinatesToArray } from '../types/Coordinates.ts';

export default function MapCanvas() {
	const [mapData, setMapData] = useState<MapData | undefined>(undefined);
	const [sensorData, setSensorData] = useState<Sensor[] | undefined>(undefined);

	useEffect(() => {
		fetch(new URL(import.meta.env.VITE_MAP_ENDPOINT, import.meta.env.VITE_BACKEND_URL))
			.then((res) => res.json())
			.then((data: MapData) => {
				setMapData(data);
				window.setInterval(() => UpdateMap(), import.meta.env.VITE_MAP_UPDATE_INTERVAL as number);
			});
	}, []);

	const UpdateMap = () => {
		fetch(new URL(import.meta.env.VITE_SENSOR_ENDPOINT, import.meta.env.VITE_BACKEND_URL))
			.then((res) => res.json())
			.then((sensorData: Sensor[]) => setSensorData(sensorData));
	};

	if (!mapData) return <h1>Loading</h1>;

	const center: LatLngExpression = [mapData.center.longitude, mapData.center.latitude];
	const bounds: LatLngBoundsExpression = [
		[mapData.topLeftBounds.longitude, mapData.topLeftBounds.latitude],
		[mapData.bottomRightBounds.longitude, mapData.bottomRightBounds.latitude],
	];

	return (
		<MapContainer center={center} zoom={19} scrollWheelZoom={false} className="w-screen h-screen">
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<ImageOverlay url={mapData.mapUrl} bounds={bounds} />
			{mapData.rooms.map((room: Room) => {
				const positions = room.locationArrays.map((coords: Coordinates) =>
					coordinatesToArray(coords),
				) as LatLngExpression[];
				return <Polygon key={room.id} positions={positions} opacity={0.3} />;
			})}
		</MapContainer>
	);
}
