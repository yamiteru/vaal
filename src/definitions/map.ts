import { getOk, isErr, ok } from "elfs";
import { pipe, Pipeable } from "pipem";
import { Infer } from "../types";
import { instance } from "./instance";

export const map = <$Key extends Pipeable, $Value extends Pipeable>(
  keySchema: $Key,
  valueSchema: $Value,
) =>
  pipe(instance<Map<Infer<$Key>, Infer<$Value>>>(Map), (v) => {
    const res: Map<Infer<$Key>, Infer<$Value>> = new Map();

    for (const [_k, _v] of v.entries()) {
      const key = keySchema(_k);

      if (isErr(key)) {
        return key;
      }

      const value = valueSchema(_v);

      if (isErr(value)) {
        return value;
      }

      res.set(getOk(key), getOk(value));
    }

    return ok(res);
  });
