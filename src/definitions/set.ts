import { define, validation } from "../core";
import { Infer, Validation } from "../types";
import { instance } from "./instance";

export const set = <Schema extends Validation>(schema: Schema) => {
	return define<Set<Infer<Schema>>>(
		instance<Set<Infer<Schema>>>(Set as never),
		validation(
			"SET",
			(value) => {
				const res: Set<Infer<Schema>> = new Set();

				for(const v of (value as Set<Infer<Schema>>).values()) {
					res.add((schema(v) || v) as Infer<Schema>);
				}

				return res;
			}
		)
	);
};
