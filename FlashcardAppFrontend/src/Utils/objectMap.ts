/* eslint-disable @typescript-eslint/no-explicit-any */
const objectMap = (obj: object, fn: any) => {
	return Object.fromEntries(
		Object.entries(obj).map(
			([k, v], i) => [k, fn(v, k, i)]
		)
	);
};

export default objectMap;