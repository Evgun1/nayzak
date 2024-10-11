// import InputCustom from "@/lib/ui/custom-elemets/input-castom/InputCustom";
import { TextClassList } from "../../types/textClassList";
import Form from "../elemets/form-component/FormComponent";
import classes from "./AccountDetails.module.scss";
import { z, ZodObject } from "zod";
import { FormEvent } from "react";
import { schemaName, schemeEmail, schemePassword } from "@/utils/validator";

// const schema = confirmPassword;

const schemaDetalInformation = z.object({
  firstName: schemaName.refine((val) => !/[0-9]/.test(val), {
    message: "There should be no numbers",
  }),

  lastName: schemaName.refine((val) => !/[0-9]/.test(val), {
    message: "There should be no numbers",
  }),

  displayName: schemaName,
});

const schemaConfirmPassword = z
  .object({
    newPassword: schemePassword,
    confirmPassword: schemePassword,
  })
  .refine((val) => val.newPassword === val.confirmPassword, {
    message: "The password does not match",
    path: ["confirmPassword"],
  });

export default function AccountDetails() {
  const detalInformationHandler = (event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
  };
  const t = (event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);

    const t2 = schemaConfirmPassword._def.schema;

    const res = t2.shape.newPassword.safeParse("T!1");

    if (!res.success) {
      const t = res.error.issues.map((val) => val.message);

      console.log(t);
    } else {
      const t = schemaConfirmPassword.safeParse({
        confirmPassword: "T!2",
        newPassword: res.data,
      });
      const t = t.error?.issues.map((val) => val.message);

if (t.success) {
  
}

    }
  };

  return (
    <div>
      {/* <Form
        schema={[schemaDetalInformation]}
        submitHandler={detalInformationHandler}
      >
        <Form.InputDefault
          label="First name *"
          inputSettings={{
            placeholder: "Fist name",
            id: "firstName",
            name: "firstName",
            type: "text",
          }}
          style="contained"
        />
        <Form.InputDefault
          label="Last name *"
          inputSettings={{
            placeholder: "Last name",
            id: "lastName",
            name: "lastName",
            type: "text",
          }}
          style="contained"
        />
        <Form.InputDefault
          label="Display name *"
          inputSettings={{
            placeholder: "Display name",
            id: "displayName",
            name: "displayName",
            type: "text",
          }}
          style="contained"
        />
        <Form.InputDefault
          label="Email *"
          inputSettings={{
            placeholder: "Email",
            id: "email",
            name: "email",
            type: "email",
            autoComplete: "email",
          }}
          style="contained"
        />
        <button type="submit">ttt</button>
      </Form> */}

      <Form schema={[]} submitHandler={t}>
        <div
          className={`${TextClassList.SEMIBOLD_18} ${classes["account__password-title"]}`}
        >
          Password change
        </div>
        <div>
          <Form.InputDefault
            label="Old password"
            inputSettings={{
              placeholder: "Old password",
              id: "oldPassword",
              name: "oldPassword",
              type: "password",
              autoComplete: "current-password",
            }}
            style="contained"
          />
          <Form.InputDefault
            label="New password"
            inputSettings={{
              placeholder: "New password",
              id: "newPassword",
              name: "newPassword",
              type: "password",
              autoComplete: "current-password",
            }}
            style="contained"
          />
          <Form.InputDefault
            label="Repeat new password"
            inputSettings={{
              placeholder: "Repeat new password",
              id: "repearPassword",
              name: "confirmPassword",
              type: "password",
              autoComplete: "new-password",
            }}
            style="contained"
          />
        </div>

        <button type="submit">ttt</button>
      </Form>
    </div>
  );
}
