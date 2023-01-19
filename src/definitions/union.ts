import { define, NONE, validation } from "../core";
import { InferValidationArray, Validation } from "../types";

export const union = <T extends Validation[]>(...validations: T) => {
	const length = validations.length;

	return define<InferValidationArray<T>[number]>(
		validation(
			"UNION",
			(v) => {
				for(let i = 0; i < length; ++i) {
					try {
						return validations[i](v) as InferValidationArray<T>[number];
					} catch {
						// skip the error
					}	
				}

				return NONE;
			}
		)
	)
};
