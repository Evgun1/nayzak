"use clinet";

import { useState } from "react";
import { ZodEffects, ZodObject, ZodRawShape } from "zod";

type FormEffectsValidationProps<T extends ZodRawShape> = {
  effectsSchema: ZodEffects<ZodObject<T>>;
  formObject: { [key: string]: FormDataEntryValue };
};

const formEffectsValidation = <T extends ZodRawShape>({
  effectsSchema,
  formObject,
}: FormEffectsValidationProps<T>) => {
  const [newError, setNewError] = useState<{ [key: string]: string[] }>();
  // const resultsCollection: Record<string, string> = {};
  // const newErrors: Record<string, string[]> = {};

  for (const key in formObject) {
    if (!Object.keys(effectsSchema._def.schema.shape).includes(key)) continue;

    const reset = effectsSchema._def.schema.shape[key].safeParse(
      formObject[key]
    );

    if (!reset.success) {
      
      // newErrors[key].push(...reset.error.issues.map((val) => val.message));
    return
    }
    // resultsCollection[key] = reset.data;
  }

  // const resetEffetch = effectsSchema.safeParse(resultsCollection);
  // if (!resetEffetch.success) {
  //   resetEffetch.error.issues.map((val) =>
  //     newErrors[val.path[0]].push(...val.message.toString())
  //   );
  // }
};

export default formEffectsValidation;
