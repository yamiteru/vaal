import { type } from "../core";
import { isType } from "../customValidations";

export const boolean = type<boolean>(
	isType("boolean")
);
