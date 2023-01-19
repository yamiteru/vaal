import { condition } from "../core";

export const length = (desiredLength: number) => {
	return (value: unknown) => {
		const currentLength = (value as unknown[]).length;

		condition(
			currentLength !== desiredLength,
			"ARRAY_LENGTH", { value, currentLength, desiredLength }
		);
	};
};
