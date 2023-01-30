import { Pipeable } from "pipem";

export type Either<Left, Right> = Left | Right;

export type Nullable<Type> = Either<null, Type>;

export type Maybe<Type> = Either<Nullable<undefined>, Type>;

export type Validation<
	Input = unknown, 
	Output = unknown
> = Pipeable<Input, Output>;

export type ValidationObject = Record<string, Validation>;

export type InferValidationObject<T extends ValidationObject> = {
	[K in keyof T]: Infer<T[K]>;
};

export type ValidationArray = Validation[];

export type InferValidationArray<T extends ValidationArray> = {
	[K in keyof T]: Infer<T[K]> 
};

export type Error = { 
	value: unknown; 
	reason: string; 
	[key: string]: unknown;
};

export type Infer<
	T extends Validation
> = T extends Validation<infer X> 
	? X
	: never;

export type Primitive = string | number | bigint | boolean | null | undefined;
