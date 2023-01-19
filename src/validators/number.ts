import { type } from "../core";
import { isType } from "../customValidations";

export const number = type<number>(
	isType("number")	
);
