import bcrypt from 'bcryptjs';

export const hashBcrypt = async (data: string) => {
	try {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(data, salt);
		return hash;
	} catch (error) {
		console.error(`Error at hashing: ${error}`);
	}
};
