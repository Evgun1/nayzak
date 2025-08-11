import {
	Create,
	Form,
	ImageField,
	ImageInput,
	required,
	SaveButton,
	TextInput,
	useNotify,
} from 'react-admin';
import { FieldValues } from 'react-hook-form';
import { MediaTypes } from './mediaTypes.ts';
import { customDataProvider } from '../../providers/simpleRestProvider.ts';

export default function MediaCreate() {
	const notify = useNotify();

	const submitHandler = async (event: FieldValues) => {
		const formData = new FormData();

		const data = event as MediaTypes;

		const fileName: string | undefined = data.name;
		const description: string | undefined = data.description;
		const file = data.file.rawFile;

		formData.set('file', file);
		formData.set('fileName', fileName ? fileName : '');
		formData.set('description', description ? description : '');

		await customDataProvider
			.create('media/upload', { data: formData })
			.catch((error: Error) => notify(error.message, { type: 'warning' }));
	};

	return (
		<Create>
			<Form onSubmit={submitHandler}>
				<TextInput source="name" />
				<ImageInput source={'file'} validate={required()} multiple={false}>
					<ImageField source="src" title="Image" />
				</ImageInput>
				<TextInput source="description" />
				<SaveButton />
			</Form>
		</Create>
	);
}
