import { define, validation } from "../core";
import { Infer, Validation } from "../types";
import { type } from "../validations/shared";

export const array = <Schema extends Validation>(schema: Schema) => {
	return define<Infer<Schema>[]>(
		type("array"),
		validation(
			"ARRAY",
			(value) => {
				const length = (value as unknown[]).length;
				const res: Infer<Schema>[] = [];

				for(let i = 0; i < length; ++i) {
					res.push(schema((value as unknown[])[i]) as never);
				}

				return res;
			}
		)
	);
};
