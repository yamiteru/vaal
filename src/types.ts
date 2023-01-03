export type Validation<T = any> = (v: any) => T;

export type ValidationObject = Record<string, Validation>;

export type InferValidationObject<T extends ValidationObject> = {
	[K in keyof T]: Infer<T[K]>;
};

export type ValidationArray = Validation[];

export type InferValidationArray<T extends ValidationArray> = {
	[K in keyof T]: Infer<T[K]> 
};

export type Infer<
	T extends Validation
> = T extends Validation<infer X> 
	? X
	: never;

