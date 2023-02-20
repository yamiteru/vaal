import { either, PipeableAny } from "pipem";
import { literal } from "./literal";

export const nullable = <Schema extends PipeableAny>(schema: Schema) =>
  either(literal(null), schema);
