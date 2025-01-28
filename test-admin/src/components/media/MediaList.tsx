import {
  CreateButton,
  Datagrid,
  ExportButton,
  FilterButton,
  ImageField,
  List,
  SearchInput,
  TextField,
  TopToolbar,
} from "react-admin";

export default function MediaList() {
  const ListActions = () => (
    <TopToolbar>
      {/*<SelectColumnsButton />*/}
      <FilterButton />
      <CreateButton />
      <ExportButton />
    </TopToolbar>
  );

  const filters = [
    <SearchInput key={"search"} name={"search"} source={"name"} alwaysOn />,
    // <TextInput key={"text"} label="Name" source="name" />,
  ];

  return (
    <List filters={filters} actions={<ListActions />}>
      <Datagrid>
        <TextField source={"id"} />
        <TextField source={"name"} />
        <ImageField source={"src"} label={"Image"} />
      </Datagrid>
    </List>
  );
}
