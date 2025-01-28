import {
  CreateButton,
  DeleteButton,
  ImageField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";

export default function MediaShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source={"name"} />
        <ImageField source={"src"} label={"Image"} />
        <TextField source={"description"} />
        <div style={{ display: "flex", gap: 10 }}>
          <CreateButton />
          <DeleteButton />
        </div>
      </SimpleShowLayout>
    </Show>
  );
}
