import { getOk, isErr, ok } from "elfs";
import { pipe, filter, error, errorTuple, Pipeable } from "pipem";
import { InferPipeableArray } from "../types";
import { type } from "../validations/shared";

export const tuple = <$Schemas extends Pipeable[]>(...schemas: $Schemas) => {
  const desiredLength = schemas.length;

  return pipe(
    type<InferPipeableArray<$Schemas>>("array"),
    error(
      filter((v) => v.length === desiredLength),
      (value) =>
        errorTuple("TUPLE", value, {
          desiredLength,
          currentLength: value.length,
        }),
    ),
    (v) => {
      const res: InferPipeableArray<$Schemas> = [] as never;

      for (let i = 0; i < desiredLength; ++i) {
        const value = schemas[i](v[i]);

        if (isErr(value)) {
          return value;
        }

        res.push(getOk(value));
      }

      return ok(res);
    },
  );
};
