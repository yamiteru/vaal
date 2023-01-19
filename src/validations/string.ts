import { condition } from "../core";

export const min = (desiredLength: number) => {
	return (value: unknown) => {
		const currentLength = (value as string).length;
		
		condition(
			currentLength < desiredLength, 
			"STRING_MIN_LENGTH", { value, desiredLength, currentLength }
		);
	}
};

export const max = (desiredLength: number) => {
	return (value: unknown) => {
		const currentLength = (value as string).length;

		condition(
			(value as string).length > desiredLength,
			"STRING_MAX_LENGTH", { value, desiredLength, currentLength }
		);
	}
};

export const includes = (searchString: string) => {
	return (value: unknown) => {
		condition(
			!(value as string).includes(searchString), 
			"STRING_INCLUDES", { value, searchString }
		);
	};
};
