"use client";

import classes from "./PopupAuthc.module.scss";
import { FormEvent, useState } from "react";
import { useAppDispatch } from "@/lib/redux/redux";
import { loginAction, registrationAction } from "@/lib/redux/store/auth/action";
import { ButtonCustom } from "@/lib/ui/custom-elemets/button-custom/ButtonCustom";
import Form from "../elemets/form-component/FormComponent";
import { schemeEmail, schemePassword } from "@/utils/validator";
import IconsIdList from "../elemets/icons/IconsIdList";
import { popupActions } from "@/lib/redux/store/popup/popup";
import { z } from "zod";

const schemeRegistration = z.object({
  email: schemeEmail,
  password: schemePassword,
});

const schemeLogin = z.object({
  email: z
    .string()
    .refine((val) => val, {
      message: "Email is required",
    })
    .refine((val) => val.trim().includes("@"), { message: "Invalid email" }),
  password: z.string().refine((val) => val, {
    message: "Password is required",
  }),
});

const PopupAuth = () => {
  const dispatch = useAppDispatch();
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.has("email")
      ? (formData.get("email") as string)
      : null;

    const password = formData.has("password")
      ? (formData.get("password") as string)
      : null;

    if (!email || !password) {
      return;
    }

    if (isRegister) {
      dispatch(registrationAction({ email, password }));
    } else {
      dispatch(loginAction({ email, password }));
    }
  };

  const resSchema = isRegister ? schemeRegistration : schemeLogin;

  return (
    <div className={classes.auth}>
      <div className={classes["auth--title"]}>
        <div className={classes["auth--title-header"]}>
          <h4>{isRegister ? "Sing up" : "Sing in"}</h4>
          <ButtonCustom.SiteButton
            styleSettings={{
              color: { dark: true },
              type: ButtonCustom.Type.circle,
              roundess: ButtonCustom.Roundness.sharp,
              size: ButtonCustom.Size.M,
              icon: { left: ButtonCustom.IconsIdList.CLOSE },
            }}
            onClick={() => dispatch(popupActions.toggle(null))}
          />
        </div>
        <div>
          Already have an account?
          <ButtonCustom.SiteButton
            styleSettings={{
              color: { dark: true },
              roundess: ButtonCustom.Roundness.sharp,
              size: ButtonCustom.Size.XS,
              type: ButtonCustom.Type.text,
            }}
            onClick={() => setIsRegister((prev) => !prev)}
          >
            {isRegister ? "Sing in" : "Sing up"}
          </ButtonCustom.SiteButton>
        </div>
      </div>
      <Form schema={resSchema} submitHandler={submitHandler}>
        <Form.InputDefault
          style="line"
          inputSettings={{
            id: "email",
            name: "email",
            type: "text",
            placeholder: "Email",
            required: true,
            autoComplete: "email",
          }}
        />
        <Form.InputDefault
          style="line"
          inputSettings={{
            id: "password",
            name: "password",
            type: showPassword ? "text" : "password",
            placeholder: "Password",
            required: true,
            autoComplete: "current-password",
          }}
          buttonSettings={{
            right: {
              type: "button",
              icon: IconsIdList.VIEWS,
              onClick: () => setShowPassword((prev) => !prev),
            },
          }}
        />
        <ButtonCustom.SiteButton
          typeProperty="submit"
          styleSettings={{
            color: { light: true },
            roundess: ButtonCustom.Roundness.rounded,
            size: ButtonCustom.Size.L,
            type: ButtonCustom.Type.default,
          }}
        >
          {isRegister ? "Sing up" : "Sing in"}
        </ButtonCustom.SiteButton>
      </Form>
      {/* <form className={classes["auth--form"]} onSubmit={submitHandler}>
        <input
          name="email"
          type="email"
          placeholder="Your email"
          className={classes["auth--form-input"]}
        />
        <div>
          <input
            name="password"
            placeholder="Password"
            className={classes["auth--form-input"]}
            type={showPassword ? "text" : "password"}
          />

          <ButtonCustom.SiteButton
            typeProperty="button"
            styleSettings={{
              color: { dark: true },
              roundess: ButtonCustom.Roundness.rounded,
              size: ButtonCustom.Size.M,
              type: ButtonCustom.Type.circle,
              icon: { left: ButtonCustom.IconsIdList.VIEWS },
            }}
            onClick={() => setShowPassword((prev) => !prev)}
          />
        </div>
*/}

      {/* </form>  */}
    </div>
  );
};

export default PopupAuth;
