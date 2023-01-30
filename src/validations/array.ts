import { predicate, validation } from "../core";

export const length = <Type>(desiredLength: number) => {
	return validation<Type, "ARRAY_LENGTH">(
		"ARRAY_LENGTH",
		predicate((v) => (v as unknown[]).length !== desiredLength),
		(v) => ({ currentLength: (v as unknown[]).length, desiredLength })
	);
};

export const min = <Type>(desiredLength: number) => {
	return validation<Type, "ARRAY_MIN">(
		"ARRAY_MIN",
		predicate((v) => (v as unknown[]).length >= desiredLength),
		(v) => ({ currentLength: (v as unknown[]).length, desiredLength })
	);
};

export const max = <Type>(desiredLength: number) => {
	return validation<Type, "ARRAY_MAX">(
		"ARRAY_MAX",
		predicate((v) => (v as unknown[]).length <= desiredLength),
		(v) => ({ currentLength: (v as unknown[]).length, desiredLength })
	);
};
