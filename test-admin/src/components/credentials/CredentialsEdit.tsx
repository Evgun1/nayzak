import {
  Edit,
  Form,
  required,
  TextInput,
  NullableBooleanInput,
  SelectInput,
  SaveButton,
  useNotify,
} from "react-admin";
import { customDataProvider } from "../../providers/simpleRestProvider.ts";
import { FieldValues } from "react-hook-form";
import { CredentialTypes } from "./credentialTypes.ts";

export default function CredentialsEdit() {
  const notify = useNotify();
  const submitHandler = async (event: FieldValues) => {
    const data = event as CredentialTypes;
    const formData = new FormData();

    const email = data.email as string;
    const role = data.role as string;
    const isActive = data.isActive as boolean;
    const id = data.id as number;

    formData.set("email", email);
    formData.set("role", role);
    formData.set("isActive", isActive.toString());

    // try {

    await customDataProvider
      .update("credentials", {
        data: formData,
        id: id.toString(),
        previousData: customDataProvider.getOne(`credentials`, { id }),
      })
      .catch((err) => {
        notify(err.message, { type: "warning" });
      });
    // } catch (e: Error) {
    //   notify(e.message.toString().replace("HttpError2:", ""), {
    //     type: "warning",
    //   });
    // }

    // update("credentials", { data: formData });
  };

  return (
    <Edit>
      <Form onSubmit={submitHandler}>
        <TextInput source={"email"} validate={required()} />
        <SelectInput
          source={"role"}
          label={"Role"}
          validate={required()}
          choices={[
            { id: "admin", name: "admin" },
            { id: "client", name: "client" },
          ]}
        />
        <NullableBooleanInput
          label={"Active"}
          source={"isActive"}
          validate={required()}
        />

        <SaveButton type={"submit"} />
      </Form>
    </Edit>
  );
}
