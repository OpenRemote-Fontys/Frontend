import { useState, useEffect } from 'react';

export default function Footer() {
	const [time, setTime] = useState<Date>(new Date());
	const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

	useEffect(() => {
		setInterval(() => setTime(new Date()), 1000);
		setInterval(() => setLastUpdate(new Date()), import.meta.env.VITE_MAP_UPDATE_INTERVAL as number);
	}, []);

	return (
		<div className="w-full">
			<hr className="mx-8 h-1 opacity-80" />
			<div className="flex justify-between p-2 mb-2 ">
				<div className="text-4xl">
					Last update:
					<p className="font-thin">
						{lastUpdate.toLocaleTimeString('nl-nl', {
							hour: '2-digit',
							minute: '2-digit',
							second: undefined,
						})}
					</p>
				</div>
				<div className="text-5xl font-bold h-fit my-auto">
					{time.toLocaleTimeString('nl-nl', {
						hour: '2-digit',
						minute: '2-digit',
						second: undefined,
					})}
				</div>
				<div className="block self-auto w-[15%] mt-auto">© Openremote Fontys 2024</div>
			</div>
		</div>
	);
}
