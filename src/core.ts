import { pipe } from "pipem";
import { Error, Validation } from "./types";

export const noReason = () => ({});

export function assert<T>(
	value: unknown, 
	validation: Validation<T>
): asserts value is T {
	validation(value as never);
}

export function is<T>(
	value: unknown, 
	validation: Validation<T>
): value is T {
	try {
		validation(value as never);
		return true;
	} catch {
		return false;
	}
}

export async function parse<T>(
	value: unknown,
	validation: Validation<T>
): Promise<[T, null] | [null, Error]> {
	try {
		const maybeData = await pipe(validation)((value as never));

		if(maybeData === undefined) {
			throw "Pipe returned prematurely";
		}

		return [maybeData, null];
	} catch (e) {
		return [null, e as Error];
	}
}
