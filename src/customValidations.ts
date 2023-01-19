import { condition } from "./core";
import { Validation } from "./types";

export const isType = <T>(desiredType: string): Validation<T> => 
	(value: unknown) => {
		const currentType = typeof value;

		condition(
			currentType === desiredType, 
			"TYPE", { value, desiredType, currentType }
		);

		return value as T;
	};

export const isArray = <T extends unknown[]>(): Validation<T> => 
	(value: unknown) => {
		condition(
			Array.isArray(value), 
			"TYPE", { value, desiredType: "array", currentType: typeof value }
		);

		return value as T;
	};

export const eq = (desiredValue: unknown) => {
	return (value: unknown) => {
		condition(desiredValue !== value, "EQ", { value });
	};
};

export const neq = (desiredValue: unknown) => {
	return (value: unknown) => {
		condition(desiredValue === value, "NEQ", { value });
	};
};
