import { Datagrid, List, NumberField, TextInput } from 'react-admin';

export default function AddressesList() {
	return (
		<List>
			<Datagrid>
				<TextInput source={'id'} />
				<TextInput source={'city'} />
				<TextInput source={'street'} />
				<NumberField source={'postalCode'} />
			</Datagrid>
		</List>
	);
}
