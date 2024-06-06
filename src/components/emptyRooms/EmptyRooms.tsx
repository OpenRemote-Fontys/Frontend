import { useEffect, useState } from 'react';
import './styles.css';
import Room from '../../types/Room';

const EmptyRoomsComponent = () => {
    const [emptyRooms, setEmptyRooms] = useState<Room[]>([])

    useEffect(() => {
        window.setInterval(() => UpdateFreeRooms(), import.meta.env.VITE_MAP_UPDATE_INTERVAL as number)        
    })

    const UpdateFreeRooms = () => {
        fetch(new URL(import.meta.env.VITE_EMPTY_ROOM_ENDPOINT, import.meta.env.VITE_BACKEND_URL), {method: "GET"}) // Construct url
			.then((res) => res.json())
			.then((rooms: Room[]) => {
				setEmptyRooms(rooms);				
			});
    }

    return (
        <div className="EmptyRooms-wrapper">
            <div className="EmptyRooms-card card">
            {
                emptyRooms.length === 0 ?
                <span>There are currently no free meeting rooms</span>
                :

                emptyRooms.length === 1 ?
                <span>The following meeting room is free: </span>
                :
                <span>The following meeting rooms are free: </span>
            }
            {
                emptyRooms.map((room: Room) => {
                    return (<span>{room.name} </span>);
                })
            }
            </div>
        </div>
    );
};

export default EmptyRoomsComponent;