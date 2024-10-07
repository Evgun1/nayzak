import React, {
  FC,
  FormEvent,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import InputPhone from "./InputPhone";
import InputTextArea from "./InputTextArea";
import { z, ZodObject, ZodRawShape, ZodString } from "zod";

import InputDefault from "./InputDefault";

import classes from "./FormComponent.module.scss";
import { email, registration } from "@/utils/validator";
import { InputType } from "./InputType";

type FormComponentProps<T extends ZodRawShape> = {
  children: ReactNode;
  schema: ZodObject<T>;

  // schema: Map<string, ZodString>;
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

    for (const key in objectForm) {
      if (!Object.keys(schema.shape).includes(key)) {
        continue;
      }

      const reset = schema.shape[key].safeParse(objectForm[key]);

      console.log(objectForm);

      if (reset?.success) {
        continue;
      }
      const error = reset?.error.issues.map((value) => {
        return value.message;
      });

      if (error) newErrors[key] = error;
    }

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

// enum InputType{
//   TEXT = 'text',
//   EMAIL= 'email',
//   PASSWORD = 'password',
// }

// type FormInput = {
//   type: InputType
//   error?: Record<string, string>
//   placeholder?: string
// }

// type Form = Map<string , FormInput>

// const form: Form = new Map()

// form.set('login', {
//   type: InputType.EMAIL,

// })

// form.set('password', {
//   type: InputType.PASSWORD
// })
