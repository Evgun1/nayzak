/** @format */

import { Edit, Form, SaveButton, TextInput } from 'react-admin';
import { FieldValues } from 'react-hook-form';
import { CategoryTypes } from './categoryTypes.ts';
import { customDataProvider } from '../../providers/simpleRestProvider.ts';

export default function CategoriesEdit() {
    const submitHandler = async (data: FieldValues) => {
        const categoryData = data as CategoryTypes;

        await customDataProvider.update(`categories`, {
            data: categoryData,
            previousData: categoryData,
            id: categoryData.id,
        });
    };

    return (
        <Edit>
            <Form onSubmit={submitHandler}>
                <TextInput source={'title'} />
                <SaveButton />
            </Form>
        </Edit>
    );
}
