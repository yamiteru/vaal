import { NONE, noReason, validation } from "../core";
import { Either } from "../types";

export const min = (desiredLength: number) => {
	return validation(
		"STRING_MIN_LENGTH",
		(value: string) => value.length < desiredLength ? NONE: value,
		(value) => ({ currentLength: value.length, desiredLength })
	);
};

export const max = (desiredLength: number) => {
	return validation(
		"STRING_MAX_LENGTH",
		(value: string) => value.length > desiredLength ? NONE: value,
		(value) => ({ currentLength: value.length, desiredLength })
	);
};

export const length = (desiredLength: number) => {
	return validation(
		"STRING_LENGTH",
		(value: string) => value.length !== desiredLength ? NONE: value,
		(value) => ({ currentLength: value.length, desiredLength })
	);
};

export const includes = (searchString: string) => {
	return validation(
		"STRING_INCLUDES",
		(value: string) => value.includes(searchString) ? value: NONE,
		() => ({ searchString })
	);
};

export const startsWith = (searchString: string) => {
	return validation(
		"STRING_STARTS_WITH",
		(value: string) => value.startsWith(searchString) ? value: NONE,
		() => ({ searchString })
	);
};

export const endsWith = (searchString: string) => {
	return validation(
		"STRING_ENDS_WITH",
		(value: string) => value.endsWith(searchString) ? value: NONE,
		() => ({ searchString })
	);
};

export const trim = validation(
	"STRING_TRIM",
	(value: string) => value.trim(),
	noReason	
);

export const trimStart = validation(
	"STRING_TRIM_START",
	(value: string) => value.trimStart(),
	noReason
);

export const trimEnd = validation(
	"STRING_TRIM_END",
	(value: string) => value.trimEnd(),
	noReason
);

export const regex = (pattern: Either<RegExp, string>) => {
	return validation(
		"STRING_REGEX",
		(value: string) => new RegExp(pattern).test(value) ? value: NONE,
		() => ({ pattern })
	);
};

const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@((?!-)([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{1,})[^-<>()[\].,;:\s@"]$/i;

export const email = regex(emailRegex);

const uuidRegex = /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i;

export const uuid = regex(uuidRegex);

export const url = validation(
	"STRING_URL",
	(value: string) => {
		try {
			new URL(value);
			return value;
		} catch {
			return NONE; 
		}
	},
	noReason
);
