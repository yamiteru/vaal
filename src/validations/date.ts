import { predicate, validation } from "../core";

export const min = (compareDate: Date) => {
	return validation(
		"DATE_MIN",
		predicate((v) => (v as Date).getTime() >= compareDate.getTime()),
		() => ({ compareDate })
	);
};

export const max = (compareDate: Date) => {
	return validation(
		"DATE_MAX",
		predicate((v) => (v as Date).getTime() <= compareDate.getTime()),
		() => ({ compareDate })
	);
};
