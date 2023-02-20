import { getOk, isErr, ok, ResultOk } from "elfs";
import { pipe, Pipeable, PipeableOutput } from "pipem";
import { Infer } from "../types";
import { type } from "../validations/shared";

export const record = <
  $Key extends PipeableOutput<ResultOk<string | number | symbol>>,
  $Value extends Pipeable,
>(
  keySchema: $Key,
  valueSchema: $Value,
) =>
  pipe(type<Record<Infer<$Key>, Infer<$Value>>>("object"), (v) => {
    const keys = Object.keys(v);
    const length = keys.length;
    const res: Record<Infer<$Key>, Infer<$Value>> = {} as never;

    for (let i = 0; i < length; ++i) {
      const k = keys[i];
      const key = keySchema(k);

      if (isErr(key)) {
        return key;
      }

      const value = valueSchema(v[k]);

      if (isErr(value)) {
        return value;
      }

      res[getOk(key)] = getOk(value);
    }

    return ok(res);
  });
