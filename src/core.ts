import { Validation } from "./types";

export function type<T>(
	...validations: Validation<T>[]
): Validation<T> {
	const length = validations.length;

	return function(v) {
		try {
			let latestValue = v;

			for(let i = 0; i < length; ++i) {
				latestValue = (validations as any)[i](latestValue);	
			}

			return latestValue;
		} catch(e) {
			throw { value: v, ...(e as any) };
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
	value: any, 
	validation: Validation<T>
): asserts value is T {
	validation(value);
}

export function is<T>(
	value: any, 
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
	value: any, 
	validation: Validation<T>
): [T, null] | [null, { value: unknown, reason: string, [key: string]: unknown }] {
	try {
		return [validation(value), null];
	} catch (e) {
		return [null, e as any];
	}
}


