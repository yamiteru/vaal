import { getOk, isErr, ok } from "elfs";
import { pipe, Pipeable } from "pipem";
import { Infer } from "../types";
import { type } from "../validations/shared";

export const array = <$Schema extends Pipeable>(schema: $Schema) =>
  pipe(type("array"), (v: Infer<$Schema>[]) => {
    const length = v.length;
    const res: Infer<$Schema>[] = [];

    for (let i = 0; i < length; ++i) {
      const result = schema(v[i]);

      if (isErr(result)) {
        return result;
      }

      res.push(getOk(result));
    }

    return ok(res);
  });
