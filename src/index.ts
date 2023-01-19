import { parse } from "./core";
import { object, optional, string, toNumber } from "./validators";

const user = object({
	name: string,
	age: toNumber,
	token: optional(string)
});

const parsed = parse({
	name: "Yami",
	age: "25"
}, user);

console.log(parsed);

