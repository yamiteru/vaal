import { Error, Primitive, Validation } from "./types";

export const NONE = Symbol();

export const predicate = <Type>(fn: (value: unknown) => boolean) => {
	return (value: unknown) => {
		return fn(value) 
			? value as Type
			: NONE;
	};
};

export function define<T>(
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
	EQ: Reason<{
		compareValue: unknown;
	}>;

	NEQ: Reason<{
		compareValue: unknown;
	}>;

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

	NUMBER_INT: Reason;

	NUMBER_FLOAT: Reason;

	NUMBER_POSITIVE: Reason;

	NUMBER_NEGATIVE: Reason;

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

	[reason: string]: Reason<
		Record<string, unknown>
	>;
};

export const validation = <
	Type,
	Reason extends keyof Reasons
>(
	reason: Reason,
	predicate: (value: unknown) => Type | typeof NONE, 
	// TODO: make optional only when we don't need to provide any additional context
	context?: (value: unknown) => Omit<Reasons[Reason], "value">
): Validation<Type> => {
	return (value: unknown) => {
		if(predicate(value) === NONE) {
			throw { 
				reason, 
				context: { 
					...(
						context 
							? context(value)
							: {}
					), 
					value 
				} as never 
			};
		}

		return value as Type;
	}; 
};
