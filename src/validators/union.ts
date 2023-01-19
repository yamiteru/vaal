import { type, condition } from "../core";
import { InferValidationArray, Validation } from "../types";

export const union = <T extends Validation[]>(...validations: T) => {
	const length = validations.length;

	return type<InferValidationArray<T>[number]>((value) => {
		for(let i = 0; i < length; ++i) {
			try {
				return validations[i](value) as InferValidationArray<T>[number];
			} catch {
				// skip the error
			}	
		}	

		condition(true, "UNION", { value });
	});
};
