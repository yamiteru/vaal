import { define, validation } from "../core";
import { Infer, Validation } from "../types";
import { instance } from "./instance";

export const map = <
	Key extends Validation,
	Value extends Validation
>(
	keySchema: Key,
	valueSchema: Value
) => {
	return define<Map<Infer<Key>, Infer<Value>>>(
		instance<Map<Infer<Key>, Infer<Value>>>(Map as never),
		validation(
			"MAP",	
			(value) => {
				const res: Map<Infer<Key>, Infer<Value>> = new Map();

				for(const [k, v] of (value as Map<Infer<Key>, Infer<Value>>).entries()) {
					res.set(
						(keySchema(k) || k) as Infer<Key>, 
						(valueSchema(v) || v) as Infer<Value>
					);
				}

				return res;
			}
		)
	);
};
