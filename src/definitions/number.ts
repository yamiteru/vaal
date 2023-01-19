import { define } from "../core";
import { type } from "../validations/shared";

export const number = define<number>(
	type("number")	
);
