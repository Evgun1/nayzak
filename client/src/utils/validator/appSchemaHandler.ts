import { ZodEffects, ZodObject, ZodRawShape } from 'zod';
import appEffectsValidation from './appEffectsValidation';
import appObjectValidation from './appObjectValidation';

type AppSchemaHandlerProps<T extends ZodRawShape> = {
	formData: FormData;
	schema: Array<ZodObject<T> | ZodEffects<ZodObject<T>>>;
};

const appSchemaHandler = <T extends ZodRawShape>({
	formData,
	schema,
}: AppSchemaHandlerProps<T>) => {
	const objectForm = Object.fromEntries(formData.entries());

	let hasErrors = false;

	const error = schema.reduce((acc, cur) => {
		if (cur instanceof ZodObject) {
			const error = appObjectValidation({
				objectSchema: cur,
				object: objectForm,
			});

			if (Object.keys(error).length > 0) {
				acc = { ...acc, ...error };
				hasErrors = true;
				return acc;
			}
			return acc;
		}

		if (cur instanceof ZodEffects) {
			const error = appEffectsValidation({
				effectsSchema: cur,
				object: objectForm,
			});

			if (Object.keys(error).length > 0) {
				acc = { ...acc, ...error };
				hasErrors = true;
				return acc;
			}
			return acc;
		}

		return acc;
	}, {});

	// setErrorMessages(error);
	return { hasErrors, error };
};

export default appSchemaHandler;
