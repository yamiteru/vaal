import { define, predicate, validation } from "../core";

export const instance = <Type>(desiredInstance: Type) => {
	return define<Type>(
		validation(
			"INSTANCE",
			predicate((v) => v instanceof (desiredInstance as never) === false),
			() => ({ desiredInstance })
		)
	);
};
