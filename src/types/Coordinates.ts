export default interface Coordinates {
	longitude: number;
	latitude: number;
}

/**
 * Convert coordinates to number array
 *
 * @param coordinates
 */
export function coordinatesToArray<T = Array<number>>(coordinates: Coordinates): T {
	return [coordinates.longitude, coordinates.latitude] as T;
}
