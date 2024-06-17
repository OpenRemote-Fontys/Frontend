import { MdGroups, MdPerson } from 'react-icons/md';

const SuggestionComponent = () => {
	return (
		<div className="mt-16 mx-16 flex justify-around h-1/3">
			<section className="flex-1 items-center text-center justify-between">
				<MdGroups className="w-full h-1/2" />
				<h1 className="text-6xl font-thin">Group</h1>
				<hr className="m-2 opacity-20" />
				<p className="font-bold text-3xl">Table 13</p>
			</section>
			<section className="flex-1 items-center text-center justify-between">
				<MdPerson className="w-full h-1/2" />
				<h1 className="text-6xl font-thin">Individual</h1>
				<hr className="m-2 opacity-20" />
				<p className="font-bold text-3xl">2.401</p>
			</section>
		</div>
	);
};

export default SuggestionComponent;
