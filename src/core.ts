import { Error, Validation } from "./types";

export function type<T>(
	...validations: Validation<T>[]
): Validation<T> {
	const length = validations.length;

	return function(v) {
		try {
			let latestValue = v;

			for(let i = 0; i < length; ++i) {
				latestValue = validations[i](latestValue);	
			}

			return latestValue as T;
		} catch(e) {
			throw { value: v, ...(e as Record<string, unknown>) };
		}
	};
}

export function condition(statement: unknown, error: {
	reason: string, [key: string]: unknown
}): asserts statement is false {
	if(!statement) {
		throw error;
	}
}

export function assert<T>(
	value: unknown, 
	validation: Validation<T>
): asserts value is T {
	validation(value);
}

export function is<T>(
	value: unknown, 
	validation: Validation<T>
): value is T {
	try {
		validation(value);
		return true;
	} catch {
		return false;
	}
}

export function parse<T>(
	value: unknown, 
	validation: Validation<T>
): [T, null] | [null, Error] {
	try {
		return [validation(value), null];
	} catch (e) {
		return [null, e as Error];
	}
}


