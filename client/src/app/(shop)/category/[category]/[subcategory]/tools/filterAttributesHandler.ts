import { IAttribute } from "@/types/attribute.interface";
import { FilterAttributesState } from "../@filter/components/FilterList";

export default function filterAttributesHandler(
	attributes: IAttribute[],
	urlSearchparams: URLSearchParams,
) {
	const filterAttributes: FilterAttributesState = [];
	for (const element of attributes) {
		const checkedValid = urlSearchparams
			.get(element.name)
			?.split(",")
			.map((item) => +item);

		const findIndex = filterAttributes.findIndex((item) =>
			item.name.includes(element.name),
		);
		if (findIndex === -1) {
			filterAttributes.push({
				name: element.name,
				value: [
					{
						active: element.active,
						id: element.id,
						type: element.type,
						checked:
							checkedValid && checkedValid.includes(element.id)
								? true
								: false,
					},
				],
			});
		} else {
			filterAttributes[findIndex].value.push({
				active: element.active,
				id: element.id,
				type: element.type,
				checked:
					checkedValid && checkedValid.includes(element.id)
						? true
						: false,
			});
		}
	}

	return filterAttributes;
}
