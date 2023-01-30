import { or } from "pipem";
import { number, string } from "./definitions";
import { maybe } from "./definitions/maybe";

const value = maybe(or(string, number));	

console.log(value(1));
console.log(value("one"));
console.log(value(null));
console.log(value([]));

