import { error, filter } from "pipem";
import { Primitive } from "../types";

export const literal = <Type extends Primitive>(desiredValue: Type) => 
	filter<unknown, Type>(
		(value) => value === desiredValue,
		error("LITERAL", { desiredValue })
	);
