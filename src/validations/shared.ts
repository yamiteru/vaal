import { errorTuple, error, filter } from "pipem";

export const type = <$Type>(desiredType: string) =>
  error(
    filter((value: $Type) =>
      desiredType === "array"
        ? Array.isArray(value)
        : typeof value === desiredType,
    ),
    (value) =>
      errorTuple("TYPE", value, { desiredType, currentType: typeof value }),
  );

export const eq = <$Type>(compareValue: $Type) =>
  error(
    filter((v: $Type) => v === compareValue),
    (value) => errorTuple("EQ", value, { compareValue }),
  );

export const neq = <$Type>(compareValue: $Type) =>
  error(
    filter((v: $Type) => v !== compareValue),
    (value) => errorTuple("NEQ", value, { compareValue }),
  );
