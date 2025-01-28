import {
	CreateButton,
	DateField,
	DeleteButton,
	EditButton,
	NumberField,
	ReferenceField,
	Show,
	SimpleShowLayout,
	TextField,
	TopToolbar,
} from "react-admin";

export default function ProductsShow() {
	const ShowActions = () => (
		<TopToolbar>
			<CreateButton />
			<EditButton />
		</TopToolbar>
	);

	return (
		<Show actions={<ShowActions />}>
			<SimpleShowLayout>
				<TextField source="title" />
				<TextField source="description" />
				<NumberField
					source="price"
					options={{ style: "currency", currency: "USD" }}
				/>
				<NumberField source="discount" options={{}} />
				<NumberField
					source="mainPrice"
					options={{ style: "currency", currency: "USD" }}
				/>
				<DateField source="createdAt" />
				<DateField source="updatedAt" />
				<TextField source="status" />

				<ReferenceField
					label="Categories"
					reference={"categories"}
					source="categoriesId"
				/>
				<ReferenceField
					label="Subcategories"
					reference={"subcategories"}
					source="subcategoriesId"
				/>
				<DeleteButton />

				{/*<TextField source="subcategoriesId" />*/}
			</SimpleShowLayout>
		</Show>
	);
}
