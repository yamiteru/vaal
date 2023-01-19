import { type } from "../core";
import { isType } from "../customValidations";

export const symbol = type<symbol>(
	isType("symbol")		
);
