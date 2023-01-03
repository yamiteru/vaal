



const coercedNumber = () => coerce(
	union(string(), number()),
	number(),
	(input) => +input 
);

const user = object({
	age: coercedNumber()
});
