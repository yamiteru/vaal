import { error, filter } from "pipem";

export const never = filter(() => false, error("NEVER"));
