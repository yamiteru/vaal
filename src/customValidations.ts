import { condition } from "./core";
import { Validation } from "./types";

export const typeValidation = <T>(desiredType: string): Validation<T> => 
	(value: unknown) => {
		const currentType = typeof value;

		condition(
			currentType === desiredType, 
			{ reason: "type", desiredType, currentType }
		);

		return value as T;
	};

export const arrayValidation = <T extends unknown[]>(): Validation<T> => 
	(value: unknown) => {
		condition(
			Array.isArray(value), 
			{ reason: "type", desiredType: "array", currentType: typeof value }
		);

		return value as T;
	};

export const lengthValidation = <T>(desiredLength: number): Validation<T> => 
	(value: unknown) => {
		const currentLength = (value as unknown[]).length;

		condition(
			currentLength === desiredLength, 
			{ reason: "length", desiredLength, currentLength }
		);

		return value as T;
	};

