"use clinet";

import { useState } from "react";
import { ZodEffects, ZodObject, ZodRawShape } from "zod";

type FormEffectsValidationProps<T extends ZodRawShape> = {
  effectsSchema: ZodEffects<ZodObject<T>>;
  object: { [key: string]: FormDataEntryValue | string };
};

const appEffectsValidation = <T extends ZodRawShape>({
  effectsSchema,
  object,
}: FormEffectsValidationProps<T>) => {
  const error: Record<string, string[]> = {};
  const resultsCollection: Record<string, string> = {};

  const newObject: Record<any, any> = {};

  for (const key in object) {
    // if (!Object.keys(effectsSchema._def.schema.shape).includes(key)) continue;

    console.log(effectsSchema._def.schema instanceof ZodObject);

    newObject[key] = object[key];
    const result = effectsSchema._def.schema.shape[key].safeParse(object[key]);

    if (!result.success) {
      if (!error[key]) {
        error[key] = [];
      }
      error[key].push(...result.error.issues.map((val) => val.message));
    } else {
      resultsCollection[key] = result.data ?? "";
    }
  }

  const keyValidity = Object.keys(newObject).every(
    (key, i) => key === Object.keys(resultsCollection)[i]
  );

  if (keyValidity) {
    const result = effectsSchema.safeParse(resultsCollection);
    if (!result.success) {
      result.error.issues.map((val) => (error[val.path[0]] = [val.message]));
    }
  }

  return error;
};

export default appEffectsValidation;
