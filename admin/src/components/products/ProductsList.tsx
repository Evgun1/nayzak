'use client';

import {
	AutocompleteInput,
	CreateButton,
	Datagrid,
	DateField,
	ExportButton,
	FilterButton,
	ImageField,
	List,
	NumberField,
	ReferenceField,
	ReferenceInput,
	SearchInput,
	SelectInput,
	TextField,
	TopToolbar,
} from 'react-admin';

import { useLocation } from 'react-router-dom';

const ProductsList = () => {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const getFilter = Object.fromEntries(searchParams.entries()).filter;

	const ListActions = () => (
		<TopToolbar>
			{/*<SelectColumnsButton />*/}
			<FilterButton />
			<CreateButton />
			<ExportButton />
		</TopToolbar>
	);

	const filters = [
		<SearchInput key={'title'} source={'search'} alwaysOn />,
		<SelectInput
			source="status"
			choices={[
				{ id: 'inStock', name: 'in stock' },
				{ id: 'discontinued', name: 'discontinued' },
				{ id: 'outOfStock', name: 'out of stock' },
			]}
			isRequired
		/>,
		<ReferenceInput source="categoriesId" reference="categories">
			<AutocompleteInput isRequired />
		</ReferenceInput>,
		<ReferenceInput
			source="subcategoriesId"
			reference="subcategories"
			filter={{
				categoriesId:
					getFilter && getFilter !== '{}'
						? JSON.parse(getFilter).categoriesId
						: 0,
			}}
		/>,
	];

	return (
		<List actions={<ListActions />} filters={filters}>
			<Datagrid>
				<NumberField source="id" />
				<TextField source="title" sortable={false} />
				{/*<TextField source="mediaId" sortable={false} />*/}
				<ReferenceField reference={'media'} source={'mediaId'}>
					<ImageField source="src" />
				</ReferenceField>

				<TextField source="description" sortable={false} />
				<NumberField
					source="mainPrice"
					options={{ style: 'currency', currency: 'USD' }}
				/>
				<DateField source="createdAt" />
				<DateField source="updatedAt" />
				<TextField source="status" sortable={false} />
				<ReferenceField
					sortable={false}
					label={'Categories'}
					reference={'categories'}
					source={'categoriesId'}
				/>
				<ReferenceField
					sortable={false}
					label={'Subcategories'}
					reference={'subcategories'}
					source={'subcategoriesId'}
				/>
				{/*<TextField source="subcategoriesId" />*/}
			</Datagrid>
		</List>
	);
};
export default ProductsList;
