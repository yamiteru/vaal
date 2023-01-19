import { type } from "../core";
import { Infer, Validation } from "../types";

export const record = <
	Key extends Validation<string | number | symbol>,
	Value extends Validation
>(
	key: Key,
	value: Value
) => {
	return type<Record<Infer<Key>, Infer<Value>>>(
		(v) => {
			const keys = Object.keys(v as never);	
			const length = keys.length;
			const res: Record<Infer<Key>, Infer<Value>> = {} as never;

			for(let i = 0; i < length; ++i) {
				const k = keys[i];

				res[key(k) || k] = value(v);	
			}

			return res;
		}
	);
};
