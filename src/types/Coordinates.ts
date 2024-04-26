export default interface Coordinates {
	longitude: number;
	latitude: number;
}

export function coordinatesToArray(coordinates: Coordinates): number[] {
	return [coordinates.longitude, coordinates.latitude];
}
