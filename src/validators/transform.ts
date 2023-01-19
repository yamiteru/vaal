import { type } from "../core";
import { Infer, Validation } from "../types";

export const transform = <
	Input extends Validation,
	Output extends Validation
>(
	input: Input,
	output: Output,
	fn: (input: Infer<Input>) => Infer<Output>
) => {
	return type<Infer<Output>>(
		(v) => {
			input(v);

			const transformed = fn(v as Infer<Input>);

			output(transformed);

			return transformed;
		}
	);
};
