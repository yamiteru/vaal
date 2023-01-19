import { define } from "../core";
import { type } from "../validations/shared";

export const bigint = define<bigint>(
	type("bigint")
);
