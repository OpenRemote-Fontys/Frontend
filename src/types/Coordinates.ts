export default interface Coordinates {
	longitude: number;
	latitude: number;
}

/**
 * Convert coordinates to number array
 *
 * @param coordinates
 */
export function coordinatesToArray(coordinates: Coordinates): number[] {
	return [coordinates.longitude, coordinates.latitude];
}
