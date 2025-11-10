export default function isValidJSONObjectString(str: string) {
	try {
		JSON.parse(str);
	} catch (error) {
		return false;
	}
	return true;
}
