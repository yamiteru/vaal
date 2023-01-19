import { condition, type } from "../core";
import { Primitive } from "../types";

export const literal = <Options extends Primitive[]>(...options: Options) => {
	return type<Options[number]>(
		(value) => {
			condition(
				options.includes(value as never) === false, 
				"LITERAL", { value, options }
			);
		}
	);
};
