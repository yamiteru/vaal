import { parse } from "./core";
import { number } from "./definitions";
import { optional } from "./definitions/optional";

const schema = optional(number);

console.log(parse("wrong", schema));
console.log(parse(undefined, schema));
console.log(parse(null, schema));
console.log(parse(1, schema));
