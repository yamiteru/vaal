import { type } from "../core";
import { isArray } from "../customValidations";
import { InferValidationArray, Validation } from "../types";
import { length } from "../validations/array";

export const tuple = <Types extends Validation[]>(...types: Types) => {
	const typesLength = types.length;

	return type<InferValidationArray<Types>>(
		isArray(),
		length(typesLength),
		(value) => {
			const res: InferValidationArray<Types> = [] as never;

			for(let i = 0; i < typesLength; ++i) {
				res.push(types[i]((value as unknown[])[i]));	
			}	

			return res;
		}
	);
};
