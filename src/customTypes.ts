export const coerce = <
	I extends Validation, 
	O extends Validation
>(
	input: I,
	output: O,
	fn: (input: Infer<I>) => Infer<O>
) => type<Infer<O>>(
	(v) => {
		input(v);

		const coerced = fn(v);

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
	(v) => {
		condition(
			v instanceof (desiredType as any), 
			{ reason: "type", currentType: typeof v, desiredType }
		);
	}
);

export const date = () => type<Date>(
	instance(Date)
);

export const any = () => type<any>();

export const literal = <T>(desiredValue: T) => {
	const desiredType = typeof desiredValue;

	return type<T>(
		typeValidation(desiredType),
		(currentValue) => {
			condition(
				desiredValue === currentValue, 
				{ reason: "literal", currentValue, desiredValue }
			);
		}
	);
}

export const optional = <T extends Validation>(schema: T) => type<undefined | Infer<T>>(
	(v) => {
		if(v !== undefined) {
			schema(v);
		}
	}	
);

export const object = <
	T extends ValidationObject 
>(schema: T) => type<InferValidationObject<T>>(
	typeValidation("object"),
	(v) => {
		for(const key in schema) {
			(schema as any)[key](v[key]);
		}
	}
);

export const record = <
	K extends Validation, 
	V extends Validation
>(key: K, value: V) => type<Record<Infer<K>, Infer<V>>>(
	typeValidation("object"),
	(v) => {
		for(const k in v) {
			key(k);	
			value(v[k]);
		}
	}
);

export const array = <T extends Validation>(schema: T) => type<Infer<T>[]>(
	arrayValidation(),
	(v) => {
		const length = v.length;

		for(let i = 0; i < length; ++i) {
			schema(v[i]);
		}
	}
);

export const tuple = <T extends ValidationArray>(...schema: T) => {
	const length = schema.length;

	return type<InferValidationArray<T>>(
		arrayValidation(),
		lengthValidation(length),
		(v) => {
			for(let i = 0; i < length; ++i) {
				(schema as any)[i](v[i]);
			}	
		}
	);
}



export const union = <T extends ValidationArray>(...schema: T) => {
	const length = schema.length;

	return type<InferValidationArray<T>[number]>(
		(v) => {
			let valid = false;

			for(let i = 0; i < length; ++i) {
				if(is(v[i], schema[i])) {
					valid = true;
					break;
				}
			}

			condition(valid, { reason: "union" });
		}
	);
}

export const nullable = <T extends Validation>(schema: T) => type<null | Infer<T>>(
	union(literal(null), schema)
);

export const enums = <T extends any[]>(...values: T) => type<T[number]>(
	(v) => {
		condition(
			v in values,
			{ reason: "mismatch", value: v }
		);
	}
);

