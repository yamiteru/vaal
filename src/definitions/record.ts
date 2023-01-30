import { define, validation } from "../core";
import { Infer, Validation } from "../types";
import { type } from "../validations/shared";

export const record = <
	Key extends Validation<string | number | symbol>,
	Value extends Validation
>(
	keySchema: Key,
	valueSchema: Value
) => {
	return define<Record<Infer<Key>, Infer<Value>>>(
		type("object"),
		validation(
			"RECORD",
			(value) => {
				const keys = Object.keys(value as never);	
				const length = keys.length;
				const res: Record<Infer<Key>, Infer<Value>> = {} as never;

				for(let i = 0; i < length; ++i) {
					const k = keys[i];

					res[keySchema(k) || k] = valueSchema(value);	
				}

				return res;
			}
		)
	);
};
