import { Create, Form, SaveButton, TextInput, useNotify } from "react-admin";
import { FieldValues } from "react-hook-form";
import { customDataProvider } from "../../providers/simpleRestProvider.ts";

export default function CategoriesCreate() {
  const notify = useNotify();
  const submitHandler = async (event: FieldValues) => {
    const data = event as { title: string };
    const formData = new FormData();
    formData.set("title", data.title);
    try {
      await customDataProvider.create("categories", { data: formData });
    } catch (err) {
      const error = err as Error;
      notify(error.message, { type: "warning" });
    }
  };

  return (
    <Create>
      <Form onSubmit={submitHandler}>
        <TextInput source={"title"} resource={"categories"} />
        <SaveButton />
      </Form>
    </Create>
  );
}
