import { Validation } from "../types";
import { either } from "./either";
import { nil } from "./nil";

export const nullable = <Type extends Validation>(validation: Type) => {
	return either(nil, validation);
};
