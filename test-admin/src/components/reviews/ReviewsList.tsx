import {
	Datagrid,
	List,
	NumberField,
	ReferenceField,
	TextField,
} from 'react-admin';

export default function ReviewsList() {
	return (
		<List>
			<Datagrid>
				<TextField source="id" />
				<NumberField source="rating" />
				<TextField source="text" />
				<ReferenceField source="customersId" reference="customers" />
				<ReferenceField source="productsId" reference="products" />
			</Datagrid>
		</List>
	);
}
