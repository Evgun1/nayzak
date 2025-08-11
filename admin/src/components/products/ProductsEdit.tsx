import {
	AutocompleteInput,
	Edit,
	Form,
	NumberInput,
	ReferenceInput,
	required,
	SaveButton,
	SelectInput,
	TextInput,
	useGetRecordId,
} from 'react-admin';

import { FieldValues } from 'react-hook-form';
import { ProductTypes } from './productTypes.ts';
import { useEffect, useState } from 'react';
import { customDataProvider } from '../../providers/simpleRestProvider.ts';

export default function ProductsEdit() {
	const [currentCategoryId, setCurrentCategoryId] = useState<number>(0);
	const [categoryId, setCategoryId] = useState<number>(currentCategoryId);
	const id = useGetRecordId();

	const onSubmitHandler = async (data: FieldValues) => {
		const productData = data as ProductTypes;
		await customDataProvider.update(`products`, {
			id: productData.id,
			data: productData,
			previousData: productData,
		});
	};

	useEffect(() => {
		customDataProvider
			.getOne('products', { id })
			.then(({ data }) => {
				setCurrentCategoryId(data.categoriesId);
			})
			.catch((err: Error) => {
				throw new Error(err.message);
			});
	}, [id]);

	useEffect(() => {
		setCategoryId(currentCategoryId);
	}, [currentCategoryId]);

	return (
		<Edit>
			<Form onSubmit={onSubmitHandler}>
				<TextInput source="title" validate={required()} />
				<TextInput source="description" validate={required()} />
				<NumberInput source="discount" validate={required()} />
				<NumberInput source="price" validate={required()} />
				<SelectInput
					label="Status"
					source="status"
					validate={required()}
					choices={[
						{ id: 'inStock', name: 'in stock' },
						{ id: 'discontinued', name: 'discontinued' },
						{ id: 'outOfStock', name: 'out of stock' },
					]}
				></SelectInput>
				<ReferenceInput reference="categories" source="categoriesId">
					<AutocompleteInput
						onChange={(val) => {
							setCategoryId(val);
						}}
						validate={required()}
					/>
				</ReferenceInput>
				<ReferenceInput
					reference="subcategories"
					source="subcategoriesId"
					filter={{ categoriesId: categoryId }}
				>
					<AutocompleteInput validate={required()} format={(val) => val} />
				</ReferenceInput>
				<ReferenceInput reference={'media'} source={'mediaId'}>
					{/*<ImageField source={"src"} />*/}
					<AutocompleteInput />
				</ReferenceInput>
				<SaveButton />
			</Form>
		</Edit>
	);
}
