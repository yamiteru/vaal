import { or } from "pipem";
import { Validation } from "../types";
import { nil } from "./nil";
import { none } from "./none";

export const maybe = <Type extends Validation>(validation: Type) => 
	or(nil, none, validation);
