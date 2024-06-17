import { useState, useEffect } from 'react';

const FooterComponent = () => {
	const [time, setTime] = useState<Date>(new Date());

	useEffect(() => {
		const interval = setInterval(() => setTime(new Date()), 1000);
		return () => {
			clearInterval(interval);
		};
	});

	return (
		<div className="w-full">
			<hr className="mx-8 h-1 opacity-80" />
			<div className="flex justify-between p-2 mb-2 ">
				<div className="text-4xl">
					Last update: <p className="font-thin">2 minutes ago</p>
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
};

export default FooterComponent;
