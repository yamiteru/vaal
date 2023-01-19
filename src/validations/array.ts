import { predicate, validation } from "../core";

export const length = (desiredLength: number) => {
	return validation(
		"ARRAY_LENGTH",
		predicate((v) => (v as unknown[]).length !== desiredLength),
		(v) => ({ currentLength: (v as unknown[]).length, desiredLength })
	);
};
