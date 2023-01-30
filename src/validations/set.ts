import { predicate, validation } from "../core";

export const min = (desiredSize: number) => {
	return validation(
		"SET_MIN",
		predicate((v) => (v as Set<unknown>).size >= desiredSize),
		(v) => ({ desiredSize, currentSize: (v as Set<unknown>).size })
	);
};

export const max = (desiredSize: number) => {
	return validation(
		"SET_MAX",
		predicate((v) => (v as Set<unknown>).size <= desiredSize),
		(v) => ({ desiredSize, currentSize: (v as Set<unknown>).size })
	);
};

export const size = (desiredSize: number) => {
	return validation(
		"SET_SIZE",
		predicate((v) => (v as Set<unknown>).size === desiredSize),
		(v) => ({ desiredSize, currentSize: (v as Set<unknown>).size })
	);
};
