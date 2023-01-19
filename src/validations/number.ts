import { predicate, validation } from "../core";

export const int = validation(
	"NUMBER_INT",
	predicate((v) => !Number.isInteger(v)),
);

export const float = validation(
	"NUMBER_FLOAT",
	predicate((v) => Number.isInteger(v))	
);

export const positive = validation(
	"NUMBER_POSITIVE",
	predicate((v) => (v as number) < 0)	
);

export const negative = validation(
	"NUMBER_POSITIVE",
	predicate((v) => (v as number) > 0)	
);
