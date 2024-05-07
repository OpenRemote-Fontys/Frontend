import { Polygon } from 'react-leaflet';
import Coordinates, { coordinatesToArray } from '../types/Coordinates.ts';
import { LatLngExpression } from 'leaflet';
import Room from '../types/Room.ts';

/**
 * HTML props for RoomLayer
 * @see RoomLayer
 */
interface RoomLayerProps {
	data: Room[];
}

/**
 * A leaflet layer that displays the rooms on the map
 *
 * @param props
 * @constructor
 */
export default function RoomLayer(props: Readonly<RoomLayerProps>) {
	return (
		<>
			{props.data.map((room: Room) => {
				// Convert coordinates to Leaflet type
				const positions = room.locationArrays.map((coords: Coordinates) =>
					coordinatesToArray<LatLngExpression>(coords),
				);

				return <Polygon key={room.id} positions={positions} opacity={0.3} />;
			})}
		</>
	);
}
