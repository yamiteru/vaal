import { predicate, validation } from "../core";

export const int = validation(
	"NUMBER_INT",
	predicate((v) => !Number.isInteger(v)),
);

export const float = validation(
	"NUMBER_FLOAT",
	predicate((v) => Number.isInteger(v))	
);

export const gt = (compareValue: number) => {
	return validation(
		"NUMBER_GT",
		predicate((v) => (v as number) > compareValue),
		() => ({ compareValue })
	);
};

export const gte = (compareValue: number) => {
	return validation(
		"NUMBER_GTE",
		predicate((v) => (v as number) >= compareValue),
		() => ({ compareValue })
	);
};

export const lt = (compareValue: number) => {
	return validation(
		"NUMBER_LT",
		predicate((v) => (v as number) < compareValue),
		() => ({ compareValue })
	);
};

export const lte = (compareValue: number) => {
	return validation(
		"NUMBER_LTE",
		predicate((v) => (v as number) <= compareValue),
		() => ({ compareValue })
	);
};

export const positive = gt(0);

export const negative = lt(0);

export const divisible = (dividend: number) => {
	return validation(
		"NUMBER_DIVISIBLE",
		predicate((v) => !((v as number) % dividend)),
		() => ({ dividend })
	);
};

export const finite = validation(
	"NUMBER_FINITE",
	predicate((v) => Number.isFinite(v))
);

export const nan = validation(
	"NUMBER_NAN",
	predicate((v) => isNaN(v as number))
);
