import { condition } from "./core";
import { Validation } from "./types";

export const typeValidation = (desiredType: string): Validation<string> => (value) => {
	const currentType = typeof value;

	condition(
		currentType === desiredType, 
		{ reason: "type", desiredType, currentType }
	);

	return value;
};

export const arrayValidation = <T>(): Validation<T[]> => (value) => {
	condition(
		Array.isArray(value), 
		{ reason: "type", desiredType: "array", currentType: typeof value }
	);

	return value;
};

export const lengthValidation = (desiredLength: number): Validation<number> => (value) => {
		const currentLength = value.length;

		condition(
			currentLength === desiredLength, 
			{ reason: "length", desiredLength, currentLength }
		);

		return value;
	};
