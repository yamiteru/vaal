import { type } from "../core";
import { Infer, Maybe, Validation } from "../types";
import { none } from "./none";
import { nil } from "./null";

export const maybe = <Type extends Validation>(validation: Type) => {
	return type<Maybe<Infer<Type>>>(
		none,
		nil,
		validation as never
	);
};
