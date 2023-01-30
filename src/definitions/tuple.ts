import { define, validation } from "../core";
import { InferValidationArray, Validation } from "../types";
import { length } from "../validations/array";
import { type } from "../validations/shared";

export const tuple = <Schemas extends Validation[]>(...schemas: Schemas) => {
	const typesLength = schemas.length;

	return define<InferValidationArray<Schemas>>(
		type("array"),
		length(typesLength),
		validation(
			"TUPLE",
			(value) => {
				const res: InferValidationArray<Schemas> = [] as never;

				for(let i = 0; i < typesLength; ++i) {
					res.push(schemas[i]((value as unknown[])[i]));	
				}	

				return res;
			}
		)
	);
};
