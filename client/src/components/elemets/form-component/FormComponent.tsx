import React, {
  DetailedReactHTMLElement,
  FormEvent,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";
import InputPhone from "./InputPhone";
import InputTextArea from "./InputTextArea";
import {
  SafeParseReturnType,
  util,
  ZodEffects,
  ZodError,
  ZodObject,
  ZodRawShape,
} from "zod";

import InputDefault from "./InputDefault";

import classes from "./FormComponent.module.scss";
import { InputType } from "./InputType";
import { log } from "console";
import { Result } from "postcss";

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

    const resultsCollection: Record<string, string> = {};

    let reset: SafeParseReturnType<any, any>;

    schema.forEach((schema) => {
      for (const key in objectForm) {
        if (schema instanceof ZodEffects) {
          if (!Object.keys(schema._def.schema.shape).includes(key)) {
            continue;
          }

          reset = schema.safeParse(objectForm);
        } else {
          if (!Object.keys(schema.shape).includes(key)) {
            continue;
          }

          reset = schema.shape[key].safeParse(objectForm[key]);
        }

        if (!reset.success) {
          if (!newErrors[key]) {
            newErrors[key] = [];
          }

          newErrors[key].push(...reset.error?.issues.map((val) => val.message));
        }
      }

      console.log(resultsCollection);
    });

    if (Object.keys(newErrors).length > 0) {
      setErrorMessages(newErrors);
      return;
    }

    setErrorMessages({});

    if (submitHandler) submitHandler(event);
  };

  const formRecursion = (children: ReactNode) => {
    return React.Children.map(children, (child): ReactNode => {
      if (React.isValidElement(child)) {
        if (child.type === InputDefault || child.type === InputTextArea) {
          const inputChild = child as ReactElement<InputType>;

          const name = inputChild.props.inputSettings?.name;
          const error = name ? errorMessages[name]?.[0] : undefined;

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
