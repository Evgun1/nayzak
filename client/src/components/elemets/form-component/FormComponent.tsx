import React, { FormEvent, ReactNode, useState } from "react";
import InputPhone from "./InputPhone";
import InputTextArea from "./InputTextArea";
import { ZodEffects, ZodError, ZodObject, ZodRawShape } from "zod";

import InputDefault from "./InputDefault";

import classes from "./FormComponent.module.scss";
import { InputType } from "./InputType";

type FormComponentProps<T extends ZodRawShape> = {
  children: ReactNode;
  schema: Array<ZodObject<T> | ZodEffects<ZodObject<T>>>;

  submitHandler?: (event: FormEvent<HTMLFormElement>) => void;
  classes?: string;
};
const FormComponent = <T extends ZodRawShape>({
  children,
  schema,
  submitHandler,
}: FormComponentProps<T>) => {
  const [errorMessages, setErrorMessages] = useState<Record<string, string[]>>(
    {}
  );

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const objectForm = Object.fromEntries(formData.entries());
    const newErrors: Record<string, string[]> = {};

    schema.forEach((schema) => {
      const effectiveSchema =
        schema instanceof ZodEffects ? schema._def.schema : schema;
      for (const key in objectForm) {
        // let reset:
        //   | { success: true; data: any }
        //   | { success: false; error: ZodError }
        //   | undefined;

        if (!Object.keys(effectiveSchema.shape).includes(key)) {
          continue;
        }

        const reset = effectiveSchema.shape[key].safeParse(objectForm[key]);

        if (!reset.success) {
          if (!newErrors[key]) {
            newErrors[key] = [];
          }
          newErrors[key].push(
            ...reset.error.issues.map((issue) => issue.message)
          );
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrorMessages(newErrors);
      return;
    }

    setErrorMessages({});

    if (submitHandler) submitHandler(event);
  };

  return (
    <form className={classes["form"]} onSubmit={onSubmitHandler} noValidate>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<InputType>(child)) {
          const name = child.props.inputSettings?.name;

          const error = name ? errorMessages[name]?.[0] : undefined;

          return React.cloneElement(child, { error });
        }

        return child;
      })}
    </form>
  );
};

const Form = Object.assign(FormComponent, {
  InputDefault: InputDefault,
  // InputPhone: InputPhone,
  InputTextArea: InputTextArea,
});

export default Form;
