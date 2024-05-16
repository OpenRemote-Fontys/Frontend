import { Polygon } from 'react-leaflet';
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
				return (
					<Polygon
						key={room.id}
						positions={room.roomBounds}
						opacity={0.3}
						color={room.color}
						fillColor={room.color}
					/>
				);
			})}
		</>
	);
}
