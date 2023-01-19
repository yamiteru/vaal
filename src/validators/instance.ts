import { condition, type } from "../core"

export const instance = <T>(desiredInstance: T) => type<T>(
	(value) => {
		condition(
			value instanceof (desiredInstance as never), 
			"INSTANCE", { value, desiredInstance }
		);
	}
);
