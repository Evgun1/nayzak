import {
  CreateButton,
  Datagrid,
  ExportButton,
  FilterButton,
  List,
  ReferenceField,
  SearchInput,
  TextField,
  TextInput,
  TopToolbar,
} from "react-admin";

export default function SubcategoriesList() {
  const ListActions = () => (
    <TopToolbar>
      {/*<SelectColumnsButton />*/}
      <FilterButton />
      <CreateButton />
      <ExportButton />
    </TopToolbar>
  );

  const filters = [
    <SearchInput key={"search"} source={"title"} alwaysOn />,
    <TextInput key={"text"} label="Title" source="title" />,
    <TextInput key={"text"} label="Status" source="status" />,
  ];

  return (
    <List actions={<ListActions />} filters={filters}>
      <Datagrid>
        <TextField source={"id"} />
        <TextField source={"title"} />
        <ReferenceField
          sortable={false}
          source={"categoriesId"}
          reference={"categories"}
          label="Categories"
        />
      </Datagrid>
    </List>
  );
}
