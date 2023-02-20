import { filter, error, errorTuple } from "pipem";

export const gte = (minValue: number) =>
  error(
    filter((v: number) => v >= minValue),
    (value) => errorTuple("GTE", value, { minValue }),
  );

export const gt = (minValue: number) =>
  error(
    filter((v: number) => v > minValue),
    (value) => errorTuple("GT", value, { minValue }),
  );

export const lte = (maxValue: number) =>
  error(
    filter((v: number) => v <= maxValue),
    (value) => errorTuple("LTE", value, { maxValue }),
  );

export const lt = (maxValue: number) =>
  error(
    filter((v: number) => v < maxValue),
    (value) => errorTuple("LT", value, { maxValue }),
  );

export const dividable = (by: number) =>
  error(
    filter((v: number) => !(v % by)),
    (value) => errorTuple("DIVIDABLE", value, { by }),
  );

export const int = error(
  filter((v: number) => Number.isInteger(v)),
  (value) => errorTuple("INT", value),
);

export const float = error(
  filter((v: number) => !Number.isInteger(v)),
  (value) => errorTuple("FLOAT", value),
);

export const positive = gt(0);

export const negative = lt(0);

export const nan = error(
  filter((v: number) => Number.isNaN(v)),
  (value) => errorTuple("NAN", value),
);

export const finite = error(
  filter((v: number) => Number.isFinite(v)),
  (value) => errorTuple("FINITE", value),
);
