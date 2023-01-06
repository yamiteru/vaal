import { object, string, number, coerce, parse, array, boolean, tuple, date, optional, enums } from "../src";

describe("Test", () => {
  it("should do stuff", () => {
		const userSchema = object({
			name: optional(string()),
			age: coerce(
				string(),
				number(),
				(value) => +value
			), 
			booleans: array(boolean()),
			gender: enums("m", "f", "n"),
			tuple: tuple(string(), string(), date())
		});

		const userData = {
			name: "yamiteru",
			age: "one",
			booleans: [true, false, false],
			gender: "m", 
			tuple: ["yami", "teru", new Date()]	
		};

		const [data, error] = parse(userData, userSchema);
    
		expect(data).toBeDefined();
		expect(error).toBe(null);
  });
});
