import {
  Edit,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";

export default function CustomersEdit() {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="firsName" validate={required()} />
        <TextInput source="lastName" validate={required()} />
        <NumberInput source="phone" validate={required()} />
        <ReferenceInput source="credentialsId" reference={"credentials"}>
          <SelectInput
            label={"Email"}
            source="email"
            optionText="email"
            optionValue="id"
            validate={required()}
          />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  );
}
