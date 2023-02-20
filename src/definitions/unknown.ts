import { Result } from "elfs";
import { Error, Pipeable } from "pipem";

export const unknown = ((value: unknown) => value) as Pipeable<
  unknown,
  Result<unknown, Error>
>;
