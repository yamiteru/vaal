import { condition, type } from "../core";

export const never = type<never>(
	(value) => condition(value === undefined, "NEVER", { value })
);
