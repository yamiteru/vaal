import { condition, type } from "./core";
import { typeValidation, arrayValidation, lengthValidation } from "./customValidations";
import { Validation, Infer, ValidationObject, ValidationArray, InferValidationArray, InferValidationObject } from "./types";

export const coerce = <
	I extends Validation, 
	O extends Validation
>(
	input: I,
	output: O,
	fn: (input: Infer<I>) => Infer<O>
) => type<Infer<O>>(
	(v: unknown) => {
		input(v);

		const coerced = fn(v as Infer<I>);

		output(coerced);

		return coerced;
	}
);

export const string = () => type<string>(
	typeValidation("string")	
);

export const number = () => type<number>(
	typeValidation("number")
);

export const boolean = () => type<boolean>(
	typeValidation("boolean")
);

export const bigint = () => type<bigint>(
	typeValidation("bigint")
);

export const symbol = () => type<symbol>(
	typeValidation("symbol")
);

export const instance = <T>(desiredType: T) =>  type<T>(
	(value: unknown) => {
		condition(
			value instanceof (desiredType as any), 
			{ reason: "type", currentType: typeof value, desiredType }
		);

		return value as T;
	}
);

export const date = () => type<Date>(
	instance<Date>(Date as any)
);

export const unknown = () => type<unknown>();

export const literal = <T>(desiredValue: T) => {
	const desiredType = typeof desiredValue;

	return type<T>(
		typeValidation(desiredType),
		(currentValue: unknown) => {
			condition(
				desiredValue === currentValue, 
				{ reason: "literal", currentValue, desiredValue }
			);

			return currentValue as T;
		}
	);
}

export const optional = <T extends Validation>(schema: T) => type<undefined | Infer<T>>(
	(value: unknown) => {
		if(value !== undefined) {
			return schema(value) as Infer<T>;
		}

		return value as undefined;
	}	
);

export const object = <
	T extends ValidationObject 
>(schema: T) => type<InferValidationObject<T>>(
	typeValidation("object"),
	(value: unknown) => {
		const result: InferValidationObject<T> = {} as never;

		for(const key in schema) {
			result[key] = schema[key]((value as Record<string, unknown>)[key]) as any;
		}

		return result;
	}
);

export const record = <
	K extends Validation<string | number | symbol>, 
	V extends Validation
>(key: K, value: V) => type<Record<Infer<K>, Infer<V>>>(
	typeValidation("object"),
	(currentValue: unknown) => {
		const result: Record<Infer<K>, Infer<V>> = {} as never;

		for(const k in (currentValue as Record<string, unknown>)) {
			key(k);	
			result[k] = value((currentValue as Record<string, unknown>)[k]);
		}

		return result;
	}
);

export const array = <T extends Validation>(schema: T) => type<Infer<T>[]>(
	arrayValidation(),
	(value: unknown) => {
		const length = (value as unknown[]).length;
		const result: Infer<T>[] = [];

		for(let i = 0; i < length; ++i) {
			result.push(schema((value as unknown[])[i]) as Infer<T>);
		}

		return result;
	}
);

export const tuple = <T extends ValidationArray>(...schema: T) => {
	const length = schema.length;

	return type<InferValidationArray<T>>(
		arrayValidation(),
		lengthValidation(length),
		(value: unknown) => {
			const result: InferValidationArray<T> = [] as never;

			for(let i = 0; i < length; ++i) {
				result.push(schema[i]((value as unknown[])[i]));
			}	

			return result;
		}
	);
}

export const enums = <T extends unknown[]>(...values: T) => type<T[number]>(
	(value: unknown) => {
		condition(
			values.indexOf(value) > -1,
			{ reason: "mismatch", value }
		);

		return value as T[number];
	}
);

