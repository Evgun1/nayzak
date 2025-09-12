import { IAttribute } from "@/types/attribute.interface";

export type GroupAttributesItem = {
	name: string;
	value: { type: string; id: number }[];
};

type GroupAttributesType = Array<GroupAttributesItem>;

function groupAttributes(attributes: IAttribute[]) {
	const filterAttributes: GroupAttributesType = [];
	for (const element of attributes) {
		const findIndex = filterAttributes.findIndex((item) =>
			item.name.includes(element.name),
		);
		if (findIndex === -1) {
			filterAttributes.push({
				name: element.name,
				value: [
					{
						id: element.id,
						type: element.type,
					},
				],
			});
		} else {
			filterAttributes[findIndex].value.push({
				id: element.id,
				type: element.type,
			});
		}
	}

	return filterAttributes;
}
export default groupAttributes;
