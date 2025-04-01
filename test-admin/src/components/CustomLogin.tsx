import { Login, TextInput, PasswordInput, useLogin, Form } from 'react-admin';
import { useNotify } from 'react-admin';
import { FieldValues } from 'react-hook-form';

const CustomLogin = () => {
	const login = useLogin();
	const notify = useNotify();

	const handleLogin = async (event: FieldValues) => {
		const data = event as { email: string; password: string };

		const email = data.email;
		const password = data.password;

		try {
			await login({ email, password });
		} catch (error) {
			notify('Invalid email or password', { type: 'warning' });
		}
	};

	return (
		<Login>
			<Form onSubmit={handleLogin}>
				<TextInput source="email" />
				<PasswordInput source="password" />
				<button type={'submit'}>Sing in</button>
			</Form>
		</Login>
	);
};
export default CustomLogin;
