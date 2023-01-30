import { InferValidationArray, Validation } from "../types";

export const union = <T extends Validation[]>(...validations: T) => {
	const length = validations.length;

	return (value: unknown) => {
		for(let i = 0; i < length; ++i) {
			try {
				const tmp = validations[i](value) as InferValidationArray<T>[number];

				if(tmp === undefined) {
					throw "I don't care about the error message";
				}

				return tmp;
			} catch {
				// skip the error
			}	
		}

		return undefined;
	}
};
