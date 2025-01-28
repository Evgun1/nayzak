import { ReferenceField, Show, SimpleShowLayout, TextField } from "react-admin";

export default function SubcategoriesShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="title" />
        <ReferenceField
          label="Categories"
          reference={"categories"}
          source="categoriesId"
        />
      </SimpleShowLayout>
    </Show>
  );
}
