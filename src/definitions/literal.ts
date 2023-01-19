import { define, validation } from "../core";
import { Primitive } from "../types";

export const literal = <Options extends Primitive[]>(...options: Options) => {
	return define<Options[number]>(
		validation(
			"LITERAL",
			(v) => !options.includes(v as never),
			() => ({ options })
		)
	);
};
