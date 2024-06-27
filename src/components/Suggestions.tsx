import { MdGroups, MdPerson } from 'react-icons/md';
import EmptyRoomsComponent from './EmptyRooms.tsx';
import { useEffect, useState } from 'react';
import Room from '../types/Room.ts';

const SuggestionComponent = () => {
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
		<>
			<div className="mt-16 mx-16 flex justify-around h-1/3">
				<section className="flex-1 items-center text-center justify-between">
					<MdGroups className="w-full h-1/2" />
					<h1 className="text-6xl font-thin">Group</h1>
					<hr className="m-2 opacity-20" />
					<p className="font-bold text-3xl">
						{emptyRooms.length > 0 ? emptyRooms[0].name : 'No suggestion available'}
					</p>
				</section>
				<section className="flex-1 items-center text-center justify-between">
					<MdPerson className="w-full h-1/2" />
					<h1 className="text-6xl font-thin">Individual</h1>
					<hr className="m-2 opacity-20" />
					<p className="font-bold text-3xl">
						{emptyRooms.length > 0 ? emptyRooms.reverse()[0].name : 'No suggestion available'}
					</p>
				</section>
			</div>
			<EmptyRoomsComponent emptyRooms={emptyRooms} />
		</>
	);
};

export default SuggestionComponent;
