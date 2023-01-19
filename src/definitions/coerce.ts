import { bigint } from "./bigint";
import { boolean } from "./boolean";
import { date } from "./date";
import { number } from "./number";
import { string } from "./string";
import { transform } from "./transform";
import { unknown } from "./unknown";

export const toString = transform(
	unknown, string, (v) => `${v}`
);

export const toNumber = transform(
	unknown, number, (v) => +(v as never)
);

export const toBoolean = transform(
	unknown, boolean, (v) => !!v
);

export const toBigInt = transform(
	unknown, bigint, (v) => BigInt(v as never)
);

export const toDate = transform(
	unknown, date, (v) => new Date(v as never)
);
