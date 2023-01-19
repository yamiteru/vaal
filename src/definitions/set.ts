import { type } from "../core";
import { Infer, Validation } from "../types";
import { instance } from "./instance";

export const set = <Type extends Validation>(validation: Type) => {
	return type<Set<Infer<Type>>>(
		instance<Set<Infer<Type>>>(Set as never),
		(value) => {
			const res: Set<Infer<Type>> = new Set();

			for(const v of (value as Set<Infer<Type>>).values()) {
				res.add((validation(v) || v) as Infer<Type>);
			}

			return res;
		}
	);
};
