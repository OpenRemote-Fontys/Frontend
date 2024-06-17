import { useEffect, useState } from 'react';
import Room from '../types/Room.ts';

const EmptyRoomsComponent = () => {
	const [emptyRooms, setEmptyRooms] = useState<Room[]>([]);

	useEffect(() => {
		window.setInterval(UpdateFreeRooms, import.meta.env.VITE_MAP_UPDATE_INTERVAL as number);
	}, []);

	const UpdateFreeRooms = () => {
		fetch(new URL(import.meta.env.VITE_EMPTY_ROOM_ENDPOINT, import.meta.env.VITE_BACKEND_URL)) // Construct url
			.then((res) => res.json())
			.then((rooms: Room[]) => {
				setEmptyRooms(rooms);
			});
	};

	return (
		<div>
			<h1 className="w-full text-center text-6xl font-bold">Free rooms</h1>
			<div className="flex justify-around w-full px-16">
				{emptyRooms.length === 0 ? <h1 className="text-2xl">No rooms are currently available</h1> : <></>}
				{emptyRooms.map((room: Room) => {
					return (
						<span key={room.id} className="text-3xl">
							{room.name}
						</span>
					);
				})}
			</div>
			<hr className="mx-16 my-2 opacity-50" />
		</div>
	);
};

export default EmptyRoomsComponent;
