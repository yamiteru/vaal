import { error, errorTuple } from "pipem";
import { Primitive } from "../types";
import { eq } from "../validations/shared";

export const literal = <$Type extends Primitive>(desiredValue: $Type) =>
  error(eq(desiredValue), (value) =>
    errorTuple("LITERAL", value, { desiredValue }),
  );
