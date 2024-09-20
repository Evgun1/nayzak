"use client";

import classes from "./PopupAuthc.module.scss";
import { FC, FormEvent, useState } from "react";
import { useAppDispatch } from "@/lib/redux/redux";
import { popupActions } from "@/lib/redux/store/popup/popup";
import test from "node:test";
import { loginAction, registrationAction } from "@/lib/redux/store/auth/action";
import { ButtonCustom } from "@/lib/ui/custom-elemets/button-custom/ButtonCustom";
import { initCart } from "@/lib/redux/store/cart/action";

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
      <form className={classes["auth--form"]} onSubmit={submitHandler}>
        <input
          name="email"
          placeholder="Your email"
          className={classes["auth--form-input"]}
          type="email"
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
      </form>
    </div>
  );
};

export default PopupAuth;
