import { PipeableAny, PipeableInput } from "pipem";

export type Either<Left, Right> = Left | Right;

export type Nullable<Type> = Either<null, Type>;

export type Maybe<Type> = Either<Nullable<undefined>, Type>;

export type PipeableObject = Record<string, PipeableAny>;

export type InferPipeableObject<T extends PipeableObject> = {
  [K in keyof T]: Infer<T[K]>;
};

export type PipeableArray = PipeableAny[];

export type InferPipeableArray<T extends PipeableArray> = {
  [K in keyof T]: Infer<T[K]>;
};

export type Error = {
  value: unknown;
  reason: string;
  [key: string]: unknown;
};

export type Infer<T extends PipeableAny> = T extends PipeableInput<infer X>
  ? X
  : never;

export type Primitive = string | number | bigint | boolean | null | undefined;
