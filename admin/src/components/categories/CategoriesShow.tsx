import { Show, SimpleShowLayout, TextField } from 'react-admin';

export default function CategoriesShow() {
	return (
		<Show>
			<SimpleShowLayout>
				<TextField source="id" />
				<TextField source="title" />
			</SimpleShowLayout>
		</Show>
	);
}
