import {
	NumberField,
	ReferenceField,
	Show,
	SimpleShowLayout,
	TextField,
} from 'react-admin';

export default function CustomersShow() {
	return (
		<Show>
			<SimpleShowLayout>
				<ReferenceField
					sortable={false}
					label={'Email'}
					reference={'credentials'}
					source={'credentialsId'}
				>
					<TextField source="email" sortable={false} />
				</ReferenceField>
				<TextField source={'firstName'} />
				<TextField source={'lastName'} />
				<NumberField source={'phone'} />
			</SimpleShowLayout>
		</Show>
	);
}
