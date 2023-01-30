import { define } from "../core";
import { Infer, Validation } from "../types";

export const transform = <
	Input extends Validation,
	Output extends Validation
>(
	inputSchema: Input,
	outputSchema: Output,
	fn: (input: Infer<Input>) => Infer<Output>
) => {
	return define<Infer<Output>>(
		(v) => {
			inputSchema(v);

			const transformed = fn(v as Infer<Input>);

			outputSchema(transformed);

			return transformed;
		}
	);
};
