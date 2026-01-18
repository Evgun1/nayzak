import { ButtonClassList } from "@/types/buttonClassList.enum";
import { FunctionComponent } from "react";

interface AddressPreviewProps {
	keyValue: string;
	value: string;
}

const AddressPreview: FunctionComponent<AddressPreviewProps> = (props) => {
	const { keyValue, value } = props;

	return (
		<>
			<span className={ButtonClassList.BUTTON_SMALL}>
				{keyValue.charAt(0).toUpperCase() +
					keyValue
						.replace(/([a-z])([A-Z])/g, "$1 $2")
						.slice(1)
						.toLocaleLowerCase()}
			</span>
			<span>{value}</span>
		</>
	);
};

export default AddressPreview;
