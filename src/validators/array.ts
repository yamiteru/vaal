import { type } from "../core";
import { isArray } from "../customValidations";
import { Infer, Validation } from "../types";

export const array = <Type extends Validation>(validation: Type) => {
	return type<Infer<Type>[]>(
		isArray(),
		(value) => {
			const length = (value as unknown[]).length;
			const res: Infer<Type>[] = [];

			for(let i = 0; i < length; ++i) {
				res.push(validation((value as unknown[])[i]) as never);
			}

			return res;
		}
	);
};
