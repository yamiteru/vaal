import { or } from "pipem";
import { Validation } from "../types";
import { nil } from "./nil";

export const nullable = <Type extends Validation>(validation: Type) => or(nil, validation);
