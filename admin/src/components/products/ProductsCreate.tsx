/** @format */

import { useState } from 'react';
import {
	AutocompleteInput,
	Create,
	Form,
	NumberInput,
	ReferenceInput,
	required,
	SaveButton,
	SelectInput,
	TextInput,
	useCreate,
} from 'react-admin';

import { FieldValues } from 'react-hook-form';

export default function ProductsCreate() {
	const [create] = useCreate();

	const [categoryId, setCategoryId] = useState<number>();
	const submitHandler = async (event: FieldValues) => {
		try {
			await create('products', { data: event });
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Create>
			<Form onSubmit={submitHandler}>
				<TextInput source="title" validate={required()} />
				<TextInput source="description" validate={required()} />
				<NumberInput source="price" validate={required()} />
				<NumberInput source="discount" defaultValue={0} />
				<SelectInput
					label="Status"
					source="status"
					validate={required()}
					choices={[
						{ id: 'inStock', name: 'in stock' },
						{ id: 'discontinued', name: 'discontinued' },
						{ id: 'outOfStock', name: 'out of stock' },
					]}
				/>
				<ReferenceInput reference="categories" source="categoriesId">
					<AutocompleteInput
						validate={required()}
						onChange={(e) => setCategoryId(e)}
					/>
				</ReferenceInput>
				<ReferenceInput
					reference="subcategories"
					source="subcategoriesId"
					filter={{ categoriesId: categoryId }}
				/>
				<ReferenceInput reference={'media'} source={'mediaId'} />
				<SaveButton />
			</Form>
		</Create>
	);
}

// subcategoriesId;
// brandsId;
