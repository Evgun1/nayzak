import {
	CreateButton,
	Datagrid,
	ExportButton,
	FilterButton,
	List,
	SearchInput,
	TextField,
	TextInput,
	TopToolbar,
} from 'react-admin';

export default function CategoriesList() {
	// const postFilter = [
	//   <SearchInput key={"categories"} source="title" alwaysOn />,
	// ];

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
		// <TextInput key={"text"} label="Status" source="status" />,
	];

	return (
		<List filters={filters} actions={<ListActions />}>
			<Datagrid>
				<TextField source="id" />
				<TextField source="title" sortable={false} />
			</Datagrid>
		</List>
	);
}
