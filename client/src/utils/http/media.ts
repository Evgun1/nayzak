import { MediaItem } from "@/types/media.types";
import { appFetchGet } from ".";

type AppMediaGetAllProps = {
    searchParams?: URLSearchParams;
};

const tag = "media";

export const appMediaAllGet = async (props: AppMediaGetAllProps) => {
    const { searchParams } = props;
    const pathname = "media";

    const { response, totalCount } = await appFetchGet<MediaItem[]>({
        tag,
        pathname,
        searchParams,
    });

    return { response, totalCount };
};

export const appMediaOneGet = async (mediaId: number | string) => {
    const pathname = `media/${mediaId}`;

    const { response, totalCount } = await appFetchGet<MediaItem>({
        tag,
        pathname,
    });

    return response;
};
