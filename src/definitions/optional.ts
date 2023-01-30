import { or } from "pipem";
import { Validation } from "../types";
import { none } from "./none";

export const optional = <Type extends Validation>(validation: Type) => or(none, validation);
