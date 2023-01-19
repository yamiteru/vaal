import { predicate, validation } from "../core";

export const min = (desiredLength: number) => {
	return validation(
		"STRING_MIN_LENGTH",
		predicate((v) => (v as string).length < desiredLength),
		(v) => ({ currentLength: (v as string).length, desiredLength })
	);
};

export const max = (desiredLength: number) => {
	return validation(
		"STRING_MAX_LENGTH",
		predicate((v) => (v as string).length > desiredLength),
		(v) => ({ currentLength: (v as string).length, desiredLength })
	);
};

export const includes = (searchString: string) => {
	return validation(
		"STRING_INCLUDES",
		predicate((v) => !(v as string).includes(searchString)),
		() => ({ searchString })
	);
};
