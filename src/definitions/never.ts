import { condition, createError, customError } from "pipem";

export const never = customError(
  condition(() => false),
  createError("NEVER"),
);
