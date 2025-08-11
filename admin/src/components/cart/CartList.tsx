import {
  Datagrid,
  List,
  NumberField,
  ReferenceField,
  TextField,
} from "react-admin";

export default function CartList() {
  return (
    <List>
      <Datagrid>
        <TextField source={"id"} />
        <NumberField source={"amount"} />
        <ReferenceField source={"customersId"} reference={"customers"}>
          <TextField source={"firstName"} />
          <TextField source={"lastName"} />
        </ReferenceField>
        <ReferenceField source={"productsId"} reference={"products"} />
      </Datagrid>
    </List>
  );
}
