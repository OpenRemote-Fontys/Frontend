import Room from '../types/Room.ts';

const EmptyRoomsComponent = (props: { emptyRooms: Room[] }) => {
	return (
		<div>
			<h1 className="w-full text-center text-6xl font-bold">Free rooms</h1>
			<div className="flex justify-around w-full px-16">
				{props.emptyRooms.length === 0 ? <h1 className="text-2xl">No rooms are currently available</h1> : <></>}
				{props.emptyRooms.map((room: Room) => {
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
