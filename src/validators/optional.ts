import { Validation } from "../types";
import { either } from "./either";
import { none } from "./none";

export const optional = <Type>(validation: Validation<Type>) => {
	return either(none, validation);
};
