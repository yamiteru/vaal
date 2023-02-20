import { filter, error, errorTuple } from "pipem";
import { Either } from "../types";

export const min = (desiredLength: number) =>
  error(
    filter((v: string) => v.length >= desiredLength),
    (value) =>
      errorTuple("STRING_LENGTH_MIN", value, {
        desiredLength,
        currentLength: value.length,
      }),
  );

export const max = (desiredLength: number) =>
  error(
    filter((v: string) => v.length <= desiredLength),
    (value) =>
      errorTuple("STRING_LENGTH_MAX", value, {
        desiredLength,
        currentLength: value.length,
      }),
  );

export const length = (desiredLength: number) =>
  error(
    filter((v: string) => v.length <= desiredLength),
    (value) =>
      errorTuple("STRING_LENGHT_EQUAL", value, {
        desiredLength,
        currentLength: value.length,
      }),
  );

export const includes = (searchString: string) =>
  error(
    filter((v: string) => v.includes(searchString)),
    (value) =>
      errorTuple("STRING_INCLUDES", value, {
        searchString,
      }),
  );

export const startsWith = (searchString: string) =>
  error(
    filter((v: string) => v.startsWith(searchString)),
    (value) =>
      errorTuple("STRING_STARTS_WITH", value, {
        searchString,
      }),
  );

export const endsWith = (searchString: string) =>
  error(
    filter((v: string) => v.endsWith(searchString)),
    (value) =>
      errorTuple("STRING_ENDS_WITH", value, {
        searchString,
      }),
  );

export const trim = (value: string) => value.trim();

export const trimStart = (value: string) => value.trimStart();

export const trimEnd = (value: string) => value.trimEnd();

export const regex = (pattern: Either<RegExp, string>) =>
  error(
    filter((v: string) => new RegExp(pattern).test(v)),
    (value) =>
      errorTuple("STRING_REGEX", value, {
        pattern,
      }),
  );

const emailRegex =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@((?!-)([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{1,})[^-<>()[\].,;:\s@"]$/i;

export const email = regex(emailRegex);

const uuidRegex =
  /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i;

export const uuid = regex(uuidRegex);

export const url = error(
  filter((v: string) => {
    try {
      new URL(v);
      return true;
    } catch {
      return false;
    }
  }),
  (value) => errorTuple("STRING_URL", value),
);
