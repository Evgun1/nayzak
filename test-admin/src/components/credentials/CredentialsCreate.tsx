import {
  Create,
  Form,
  PasswordInput,
  required,
  SelectInput,
  TextInput,
  NullableBooleanInput,
  SaveButton,
  useNotify,
} from "react-admin";
import { customDataProvider } from "../../providers/simpleRestProvider.ts";
import { FieldValues } from "react-hook-form";
import { CredentialTypes } from "./credentialTypes.ts";

export default function CredentialsCreate() {
  const notify = useNotify();

  const submitHandler = async (event: FieldValues) => {
    const data = event as CredentialTypes;

    const fromData = new FormData();

    const password = data.password as string;
    const email = data.email as string;
    const role = data.role as string;
    const isActive = data.isActive as boolean;

    fromData.set("email", email);
    fromData.set("password", password);
    fromData.set("role", role);
    fromData.set("isActive", isActive.toString());

    await customDataProvider
      .create("credentials/registration", {
        data: fromData,
      })
      .catch((error: Error) =>
        notify(error.message.toString().replace("HttpError2:", ""), {
          type: "warning",
        }),
      );
  };
  return (
    <Create>
      <Form onSubmit={submitHandler}>
        <TextInput source="email" validate={required()} />
        <PasswordInput source="password" validate={required()} />
        <SelectInput
          source={"role"}
          validate={required()}
          choices={[
            { id: "admin", name: "admin" },
            { id: "client", name: "client" },
          ]}
        />
        <NullableBooleanInput
          label="Active"
          source="isActive"
          validate={required()}
          falseLabel={"No active"}
          trueLabel={"Active"}
        />

        <SaveButton />
      </Form>
    </Create>
  );
}
