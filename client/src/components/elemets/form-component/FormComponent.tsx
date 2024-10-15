import React, { FormEvent, ReactElement, ReactNode, useState } from "react";
import InputTextArea from "./InputTextArea";
import {
  ZodEffects,
  ZodEffectsDef,
  ZodObject,
  ZodRawShape,
  ZodType,
} from "zod";

import InputDefault from "./InputDefault";

import classes from "./FormComponent.module.scss";
import { InputType } from "./InputType";
import appObjectValidation from "../../../utils/validator/appObjectValidation";
import appEffectsValidation from "../../../utils/validator/appEffectsValidation";

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
    let hasErrors = false;

    schema.forEach((schema) => {
      if (schema instanceof ZodObject) {
        const error = appObjectValidation({
          objectSchema: schema,
          object: objectForm,
        });

        if (Object.keys(error).length > 0) {
          setErrorMessages(error);
          hasErrors = true;
          return;
        }
        setErrorMessages({});
      }

      if (schema instanceof ZodEffects) {
        const error = appEffectsValidation({
          effectsSchema: schema,
          object: objectForm,
        });

        if (Object.keys(error).length > 0) {
          setErrorMessages(error);
          hasErrors = true;
          return;
        }

        setErrorMessages({});
      }
    });

    if (!hasErrors && submitHandler) submitHandler(event);
  };

  const formRecursion = (children: ReactNode) => {
    return React.Children.map(children, (child): ReactNode => {
      if (React.isValidElement(child)) {
        if (child.type === InputDefault || child.type === InputTextArea) {
          const inputChild = child as ReactElement<InputType>;

          const name = inputChild.props.inputSettings?.name;
          const error = name ? errorMessages[name] : undefined;

          return React.cloneElement(inputChild, { error });
        } else {
          const childWithChildren = child as ReactElement<{
            children: ReactNode;
          }>;

          return React.cloneElement(childWithChildren, {
            children: formRecursion(childWithChildren.props.children),
          });
        }
      }

      return child;
    });
  };

  return (
    <form className={classes["form"]} onSubmit={onSubmitHandler} noValidate>
      {formRecursion(children)}
    </form>
  );
};

const Form = Object.assign(FormComponent, {
  InputDefault: InputDefault,
  // InputPhone: InputPhone,
  InputTextArea: InputTextArea,
});

export default Form;
