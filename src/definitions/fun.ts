import { type } from "../validations/shared";

export const fun = type<(...props: unknown[]) => unknown>("function");
