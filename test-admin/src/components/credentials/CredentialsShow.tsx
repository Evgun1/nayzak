import {
	BooleanField,
	NumberField,
	Show,
	SimpleShowLayout,
	TextField,
} from 'react-admin';

export default function CredentialsShow() {
	return (
		<Show>
			<SimpleShowLayout>
				<TextField source={'email'} label="Email" />
				<TextField source={'role'} label="Role" />
				<BooleanField source={'isActive'} label="Active" />
				<NumberField source={'createdAt'} label="CreatedAt" />
			</SimpleShowLayout>
		</Show>
	);
}
