import { pipe, PipeableInput } from "pipem";
import { Either, Error } from "./types";

export const noReason = () => ({});

export function assert<Type>(
  value: unknown,
  validation: PipeableInput<Type>,
): asserts value is Type {
  validation(value as never);
}

export function is<Type>(
  value: unknown,
  validation: PipeableInput<Type>,
): value is Type {
  try {
    validation(value as never);
    return true;
  } catch {
    return false;
  }
}

export function parse<Type>(
  value: unknown,
  validation: PipeableInput<Type>,
): Either<[Type, null], [null, Error]> {
  try {
    return [pipe(validation)(value as never), null];
  } catch (e) {
    return [null, e as Error];
  }
}
