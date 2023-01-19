import { Error, Primitive, Validation } from "./types";

export function type<T>(
	...validations: Validation<T>[]
): Validation<T> {
	const length = validations.length;

	return function(v) {
		let latestValue = v;

		for(let i = 0; i < length; ++i) {
			const nextValue = validations[i](latestValue);

			if(nextValue !== undefined) {
				latestValue = nextValue;
			}
		}

		return latestValue as T;
	};
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
		return [validation(value) || value as T, null];
	} catch (e) {
		return [null, e as Error];
	}
}

export type Reason<
	T extends Record<string, unknown> = Record<string, unknown>
> = T & { value: unknown };

export type Reasons = {
	EQ: Reason;

	NEQ: Reason;

	GT: Reason;

	GTE: Reason;

	LT: Reason;

	LTE: Reason;

	NEVER: Reason;

	UNION: Reason;

	LITERAL: Reason<{
		options: Primitive[];
	}>;
	
	TYPE: Reason<{
		currentType: string;
		desiredType: string;
	}>;

	INSTANCE: Reason<{
		desiredInstance: unknown;
	}>;

	STRING_MIN_LENGTH: Reason<{ 
		currentLength: number; 
		desiredLength: number; 
	}>; 

	STRING_MAX_LENGTH: Reason<{ 
		currentLength: number;
		desiredLength: number; 
	}>;

	STRING_INCLUDES: Reason<{
		searchString: string;
	}>;

	ARRAY_LENGTH: Reason<{
		currentLength: number;
		desiredLength: number;
	}>;
};

export const condition = <Reason extends keyof Reasons>(
	expression: boolean,
	reason: Reason, 
	context: Reasons[Reason] 
) => {
		if(expression) {
			throw { reason, context };
		}
};

