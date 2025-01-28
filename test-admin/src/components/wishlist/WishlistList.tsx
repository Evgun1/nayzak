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

export default function WishlistList() {
	const ListActions = () => (
		<TopToolbar>
			{/*<SelectColumnsButton />*/}
			<FilterButton />
			<CreateButton />
			<ExportButton />
		</TopToolbar>
	);

	const filters = [
		<SearchInput key={"search"} name={"search"} source={"title"} alwaysOn />,
		<TextInput key={"text"} label="Status" source="status" />,
	];

	return (
		<List actions={<ListActions />} filters={filters}>
			<Datagrid>
				<TextField source="id" />
				<ReferenceField reference={"customers"} source={"customersId"} />
				<ReferenceField reference={"products"} source={"productsId"} />
			</Datagrid>
		</List>
	);
}
