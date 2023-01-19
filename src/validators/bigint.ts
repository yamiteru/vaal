import { type } from "../core";
import { isType } from "../customValidations";

export const bigint = type<bigint>(
	isType("bigint")
);
