import { type } from "../core";
import { isType } from "../customValidations";

export const string = type<string>(
	isType("string")
);
