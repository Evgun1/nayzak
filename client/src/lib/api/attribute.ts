import { useSearchParams } from "next/navigation";
import { appFetchGet } from ".";
import { Attribute, IAttribute } from "@/types/attribute.interface";
import getIdByParams from "@/tools/getIdByParams";
import { partialRecord } from "zod/v4";

type AttributesAllGetParams = {
	searchParams: URLSearchParams;
};
type AppAttributeBySubcategoryGetParams = {
	param: { slug: string };
	searchParams?: URLSearchParams;
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

export const appAttributeBySubcategoryGet = async (
	params: AppAttributeBySubcategoryGetParams,
) => {
	const { param, searchParams } = params;
	const getId = getIdByParams(param.slug);

	const nginxPathname = `catalog/attribute-definitions/${getId.id}`;
	const { result } = await appFetchGet<Attribute>({
		pathname: nginxPathname,
		searchParams,
	});

	return result;
};

export const appAttributeByProductGet = async (
	params: AppAttributeBySubcategoryGetParams,
) => {
	const { param, searchParams } = params;

	const getId = getIdByParams(param.slug);

	const nginxPathname = `catalog/attribute-definitions/by-product/${getId.id}`;
	const attribute = await appFetchGet<IAttribute[]>({
		pathname: nginxPathname,
		searchParams,
	});

	return {
		attribute: attribute.result,
		countActiveAttributes: attribute.totalCount,
	};
};
