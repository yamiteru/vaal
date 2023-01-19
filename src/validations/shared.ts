import { predicate, validation } from "../core";

export const type = <Type>(desiredType: string) => {
	return validation<Type, "TYPE">(
		"TYPE",
		predicate((v) => desiredType === "array" 
			? !Array.isArray(v)
			: typeof v !== desiredType),
		(v) => ({ currentType: typeof v, desiredType })
	);
};

export const eq = (compareValue: unknown) => {
	return validation(
		"EQ", 
		predicate((v) => v !== compareValue),
		() => ({ compareValue })
	);
};

export const neq = (compareValue: unknown) => {
	return validation(
		"NEQ", 
		predicate((v) => v === compareValue),
		() => ({ compareValue })
	);
};
