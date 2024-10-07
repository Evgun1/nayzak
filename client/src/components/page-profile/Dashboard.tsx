"use client";

import { email, password } from "@/utils/validator";
import { TextClassList } from "../../types/textClassList";
import Form from "../elemets/form-component/FormComponent";
import IconsIdList from "../elemets/icons/IconsIdList";
import classes from "./Dashboard.module.scss";

export default function Dashboard() {
  const schema = new Map();

  schema.set("email", email);
  schema.set("password", password);

  return (
    <div className={classes.dashboard}>
      <div className={TextClassList.REGULAR_18}>
        Hello Omar (not Bruce? Log out)
      </div>
      <div className={TextClassList.REGULAR_18}>
        From your account dashboard you can view your recent orders, manage your
        shipping and billing addresses, and edit your password and account
        details.
      </div>
    </div>
  );
}
