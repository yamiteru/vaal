import { getOk, isErr } from "elfs";
import { map, pipe } from "pipem";
import { InferPipeableObject, PipeableObject } from "../types";
import { type } from "../validations/shared";

export const object = <$Schema extends PipeableObject>(schema: $Schema) => {
  const keys = Object.keys(schema);
  const length = keys.length;

  return pipe(
    type<InferPipeableObject<$Schema>>("object"),
    map((v) => {
      const res: InferPipeableObject<$Schema> = {} as never;

      for (let i = 0; i < length; ++i) {
        const key = keys[i];
        const value = schema[key](v[key]);

        if (isErr(value)) {
          return value;
        }

        res[key as keyof InferPipeableObject<$Schema>] = getOk(value);
      }

      return res;
    }),
  );
};
