import { type } from "../core";
import { Infer, Validation } from "../types";
import { instance } from "./instance";

export const map = <
	Key extends Validation,
	Value extends Validation
>(
	key: Key,
	value: Value
) => {
	return type<Map<Infer<Key>, Infer<Value>>>(
		instance<Map<Infer<Key>, Infer<Value>>>(Map as never),
		(v) => {
			const res: Map<Infer<Key>, Infer<Value>> = new Map();

			for(const [_k, _v] of (v as Map<Infer<Key>, Infer<Value>>).entries()) {
				res.set(
					(key(_k) || _k) as Infer<Key>, 
					(value(_v) || _v) as Infer<Value>
				);
			}

			return res;
		}
	);
};
