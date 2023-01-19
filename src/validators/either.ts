import { Validation } from "../types";
import { union } from "./union";

export const either = <
	Left extends Validation, 
	Right extends Validation
>(
	left: Left, 
	right: Right 
) => {
	return union(left, right); 
};
