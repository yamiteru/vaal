import { define, validation } from "../core";
import { InferValidationObject, Validation, ValidationObject } from "../types";
import { type } from "../validations/shared";
import { string } from "./string";

export const object = <Schema extends ValidationObject>(schema: Schema) => {
	const keys = Object.keys(schema);
	const length = keys.length;

	return define<InferValidationObject<Schema>>(
		type("object"),
		validation(
			"OBJECT",
			(value) => {
				const res: InferValidationObject<Schema> = {} as never;

				for(let i = 0; i < length; ++i) {
					const key = keys[i];

					(res as Record<string, unknown>)[key] = schema[key]((value as Record<string, unknown>)[key]);	
				}	

				return res;
			}
		)
	);
};

export const intersection = <Schemas extends Validation<ValidationObject>[]>(
	...schemas: Schemas
) => {
	const length = schemas.length;

	return validation(
		"OBJECT_INTERSECTION",
		(v) => {
			let res = {}; 

			for(let i = 0; i < length; ++i) {
				res = { ...res, ...schemas[i](v) };
			}

			return res;
		}
	);
};

export const extend = <
	SourceSchema extends ValidationObject,
	ExtendSchema extends ValidationObject,
>(
	sourceSchema: Validation<InferValidationObject<SourceSchema>>,
	extendSchema: Validation<InferValidationObject<ExtendSchema>>
) => {
	return intersection(sourceSchema, extendSchema);
};

const a = object({ a: string });
const b = object({ b: string });
const c = extend(a, b);
