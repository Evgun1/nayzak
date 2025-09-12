function findNumber(param: string): { name: string; id: number } {
	const delimiters = ["-", "=", "_"];

	function recursion(str: string, index = 0): string[] {
		if (index >= delimiters.length) {
			return [str];
		}

		const delimiter = delimiters[index];
		if (str.includes(delimiter)) {
			return str.split(delimiter);
		}

		return recursion(str, index + 1);
	}

	const arrParam = recursion(param);

	const object = {} as { name: string; id: number };

	for (const element of arrParam) {
		const number = element
			.split("")
			.reduce((acc, cur) => {
				if (!Number.isNaN(+cur)) {
					acc.push(+cur);
				}
				return acc;
			}, [] as number[])
			.join("");

		if (!number) {
			object.name = element;
		}
		if (element.includes(number)) {
			object.id = +number;
		}
	}

	return object;
}

type GetIdByParamsResult = { name: string; id: number };

function getIdByParams(params: string): GetIdByParamsResult;
function getIdByParams(params: string[]): GetIdByParamsResult[];
function getIdByParams(
	params: string | string[],
): GetIdByParamsResult | GetIdByParamsResult[] {
	const paramMap = new Map<
		boolean,
		(
			param: string | string[],
		) => { name: string; id: number } | { name: string; id: number }[]
	>();
	paramMap.set(false, (param) => {
		const paramString = param as string;
		const result = findNumber(paramString);

		return result;
	});
	paramMap.set(true, (param) => {
		const paramString = param as string[];
		const result = paramString.map((item) => findNumber(item));
		return result;
	});

	const result = paramMap.get(Array.isArray(params))?.(params);
	return result as
		| { name: string; id: number }
		| { name: string; id: number }[];
}

export default getIdByParams;
