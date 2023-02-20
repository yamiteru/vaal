import { getOk, isErr, ok } from "elfs";
import { pipe, Pipeable } from "pipem";
import { Infer } from "../types";
import { instance } from "./instance";

export const set = <$Schema extends Pipeable>(schema: $Schema) =>
  pipe(instance<Set<Infer<$Schema>>>(Set), (v) => {
    const res: Set<Infer<$Schema>> = new Set();

    for (const _v of v.values()) {
      const value = schema(_v);

      if (isErr(value)) {
        return value;
      }

      res.add(getOk(value));
    }

    return ok(res);
  });
