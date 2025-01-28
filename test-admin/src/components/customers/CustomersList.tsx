import {
	FilterButton,
	List,
	TopToolbar,
	Datagrid,
	TextField,
	SearchInput,
	TextInput,
	CreateButton,
	ExportButton,
	NumberField,
	ReferenceField,
} from 'react-admin';

const ProductsList = () => {
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
				<NumberField source="id" />
				<ReferenceField
					sortable={false}
					label={'email'}
					reference={'credentials'}
					source={'credentialsId'}
				>
					<TextField source="email" sortable={false} />
				</ReferenceField>
				{/*<NumberField source="credentialsId" />*/}
				<TextField source="firstName" sortable={false} />
				<TextField source="lastName" sortable={false} />
				<NumberField source="phone" />
				{/*<TextField source="status" sortable={false} />*/}
				{/*<DateField source="createdAt" />*/}`
				{/*<DateField source="updatedAt" />`*/}
			</Datagrid>
		</List>
	);
};
export default ProductsList;
