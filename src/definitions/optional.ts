import { either, PipeableAny } from "pipem";
import { literal } from "./literal";

export const optional = <Schema extends PipeableAny>(schema: Schema) =>
  either(literal(undefined), schema);
