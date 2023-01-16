import { 
	Validation,
	is, 
	parse, 
	assert, 
	string, 
	number, 
	bigint, 
	date, 
	instance,
	literal, 
	boolean,
	symbol,
	object,
	record,
	array,
	tuple,
	enums,
	unknown,
	optional,
	coerce
} from "../src";

const NONE = { __type: "NONE" };

describe.each<[
	name: string, 
	options: { 
		type: Validation<any>, 
		valid?: any[], 
		invalid?: any,
		onAssert?: (type: Validation<any>) => void;
		onIs?: (type: Validation<any>) => void;
		onParse?: (type: Validation<any>) => void;
	}
]>([
	["string", { type: string(), valid: [""], invalid: NONE }],
	["number", { type: number(), valid: [0], invalid: NONE }],
	["bigint", { type: bigint(), valid: [BigInt(0)], invalid: NONE }],
	["date", { type: date(), valid: [new Date()], invalid: NONE }],
	["instance", { type: instance(Date), valid: [new Date()], invalid: NONE }],
	["literal", { type: literal(0), valid: [0], invalid: NONE }],
	["boolean", { type: boolean(), valid: [true], invalid: NONE }],
	["symbol", { type: symbol(), valid: [Symbol()], invalid: NONE }],
	["object", { type: object({ a: number(), b: string() }), valid: [{ a: 0, b: "" }], invalid: NONE }],
	["record", { type: record(string(), number()), valid: [{ a: 0, b: 0 }], invalid: NONE }],
	["array", { type: array(number()), valid: [[[0, 0]]], invalid: NONE }],
	["tuple", { type: tuple(number(), string()), valid: [[[0, ""]]], invalid: NONE }],
	["enums", { type: enums(0, 1, 2), valid: [1], invalid: NONE }],
	["unknown", { type: unknown(), valid: [1] }],
	["optional", { type: optional(number()), valid: [1, undefined] }],
	["coerce", { 
		type: coerce(string(), number(), (v) => +v), 
		onAssert: (type) => {
			it("should assert that 1 is string", () => {
				expect(() => assert("1", type)).not.toThrow();
			});
		},
		onIs: (type) => {
			it("should return true when 1 is string", () => {
				expect(is("1", type)).toBe(true);
			});
		},
		onParse: (type) => {
			it(`should return [number, null] when parsing valid value 1`, () => {
				const [value, error] = parse("1", type);

				expect(value).toStrictEqual(1);
				expect(error).toBe(null);
			});		
		}
	}]
])("%s", (name, { type, valid, invalid, onAssert, onIs, onParse }) => {
	describe("assert", () => {
		valid && it.each(valid)(`should assert that %s is ${name}`, (input) => {
			expect(() => assert(input, type)).not.toThrow();
		});	

		invalid && it(`should throw error when %s is not ${name}`, () => {
			expect(() => assert(invalid, type)).toThrow();
		});

		onAssert?.(type);	
	});

	describe("is", () => {
		valid && it.each(valid)(`should return true when %s is ${name}`, (input) => {
			expect(is(input, type)).toBe(true);
		});

		invalid && it(`should return false when value is not ${name}`, () => {
			expect(is(invalid, type)).toBe(false);
		});

		onIs?.(type);	
	});
	
	describe("parse", () => {
		valid && it.each(valid)(`should return [${name}, null] when parsing valid value %s`, (input) => {
			const [value, error] = parse(input, type);

			expect(value).toStrictEqual(input);
			expect(error).toBe(null);
		});

		invalid && it(`should return [null, Error] when parsing invalid value`, () => {
			const [value, error] = parse(invalid, type);

			expect(value).toBe(null);
			expect(error).toBeDefined();
		});

		onParse?.(type);	
	});
});
