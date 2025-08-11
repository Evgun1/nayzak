import {
	BooleanField,
	CreateButton,
	Datagrid,
	ExportButton,
	FilterButton,
	List,
	NumberField,
	SearchInput,
	TextField,
	TextInput,
	TopToolbar,
} from 'react-admin';

export default function CredentialsList() {
	const ListActions = () => (
		<TopToolbar>
			{/*<SelectColumnsButton />*/}
			<FilterButton />
			<CreateButton />
			<ExportButton />
		</TopToolbar>
	);

	const filters = [
		<SearchInput key={'search'} source={'title'} alwaysOn />,
		<TextInput key={'text'} label="Title" source="title" />,
		<TextInput key={'text'} label="Status" source="status" />,
	];

	return (
		<List actions={<ListActions />} filters={filters}>
			<Datagrid>
				<TextField source={'id'} />
				<TextField source={'email'} />
				<TextField source={'role'} />;
				<BooleanField source={'isActive'} />;
				<NumberField source={'createdAt'} />;
			</Datagrid>
		</List>
	);
}
