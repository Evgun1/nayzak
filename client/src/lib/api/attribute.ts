import { useSearchParams } from "next/navigation";
import { appFetchGet } from ".";
import { Attribute, IAttribute } from "@/types/attribute.interface";

type AttributesAllGetParams = {
	searchParams: URLSearchParams;
};

export const appAttributesAllGet = async (params: AttributesAllGetParams) => {
	const { searchParams } = params;

	const nginxPathname = `catalog/attribute-definitions/`;
	const { result } = await appFetchGet<IAttribute[]>({
		pathname: nginxPathname,
		searchParams,
	});
	return result;
};

type AppAttributeBySubcategoryGetParams = {
	param: string | number;
	searchParams?: URLSearchParams;
};

export const appAttributeBySubcategoryGet = async (
	params: AppAttributeBySubcategoryGetParams,
) => {
	const { param, searchParams } = params;

	const nginxPathname = `catalog/attribute-definitions/${param}`;
	const { result } = await appFetchGet<Attribute>({
		pathname: nginxPathname,
		searchParams,
	});

	return result;
};
