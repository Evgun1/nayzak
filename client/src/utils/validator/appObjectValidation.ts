'use client';
import { ZodObject, ZodRawShape } from 'zod';

type FormObjectValidationProps<T extends ZodRawShape> = {
	objectSchema: ZodObject<T>;
	object: { [key: string]: FormDataEntryValue | string };
};
const appObjectValidation = <T extends ZodRawShape>({
	objectSchema,
	object,
}: FormObjectValidationProps<T>) => {
	const error: Record<string, string[]> = {};

	for (const key in object) {
		if (!Object.keys(objectSchema.shape).includes(key)) {
			continue;
		}

		const result = objectSchema.shape[key].safeParse(object[key]);

		if (!result.success) {
			if (!error[key]) {
				error[key] = [];
			}

			error[key].push(...result.error.issues.map((err) => err.message));
		}
	}

	return error;
};

export default appObjectValidation;
