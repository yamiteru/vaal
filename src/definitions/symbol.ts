import { define } from "../core";
import { type } from "../validations/shared";

export const symbol = define<symbol>(
	type("symbol")		
);
