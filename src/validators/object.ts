import { type } from "../core";
import { isType } from "../customValidations";
import { InferValidationObject, ValidationObject } from "../types";

export const object = <Schema extends ValidationObject>(schema: Schema) => {
	const keys = Object.keys(schema);
	const length = keys.length;

	return type<InferValidationObject<Schema>>(
		isType("object"),
		(value) => {
			const res: InferValidationObject<Schema> = {} as never;

			for(let i = 0; i < length; ++i) {
				const key = keys[i];

				(res as Record<string, unknown>)[key] = schema[key]((value as Record<string, unknown>)[key]);	
			}	

			return res;
		}
	);
};
