import { MediaItem } from "@/types/media.types";
import { appFetchGet } from ".";
import { CacheItem } from "./interface/appGetFetch.interface";

type AppMediaGetAllProps = {
	searchParams?: URLSearchParams;
};

const tag = "media";

export const appMediaAllGet = async (props: AppMediaGetAllProps) => {
	const { searchParams } = props;
	const pathname = "media";

	const cache: CacheItem = {
		revalidate: 1800,
		tag,
	};

	const { result, totalCount } = await appFetchGet<MediaItem[]>({
		cache,
		pathname,
		searchParams,
	});

	return { result, totalCount };
};

export const appMediaOneGet = async (mediaId: number | string) => {
	const pathname = `media/${mediaId}`;
	const cache: CacheItem = {
		revalidate: 1800,
		tag,
	};
	const { result, totalCount } = await appFetchGet<MediaItem>({
		cache,
		pathname,
	});

	return result;
};
