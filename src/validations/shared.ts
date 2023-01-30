import { error, filter } from "pipem";

export const type = <Type>(desiredType: string) => filter<unknown, Type>(
	(value) => desiredType === "array" 
		? Array.isArray(value)
		: typeof value === desiredType,
	error("TYPE", { desiredType })
);
