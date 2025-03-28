import { Context } from "hono";
import getReqBody from "../tools/getReqBody";
import MediaService from "./media.service";
import mediaService from "./media.service";
import { MediaGetDTO } from "./interface/MediaGetDTO";
import { QueryParameterTypes } from "../utils/service/service.type";
import clearCache from "../utils/clear-cache/ClearCache";

class MediaController {
    async getAll(c: Context) {
        const queryParams = c.req.query() as QueryParameterTypes;

        const { media, totalCount } = await mediaService.getAll(queryParams);

        c.res.headers.append("X-Total-Count", totalCount.toString());
        return c.json(media);
    }

    async getOne(c: Context) {
        const mediaId = c.req.param() as { mediaId: string };

        const media = await mediaService.getOne(mediaId.mediaId);

        return c.json(media);
    }

    async getOneByProduct(c: Context) {
        const query = c.req.query();

        return c.json({});
    }

    async uploadMedia(c: Context) {
        const data = (await getReqBody(c)) as MediaGetDTO;
        const media = await MediaService.uploadMedia(data);

        await clearCache("media");
        return c.json(media);
    }

    async deleteMedia(c: Context) {
        const mediaId = (await getReqBody(c)) as number | number[];

        const id = await mediaService.deleteMedia(mediaId);

        await clearCache("media");
        return c.json(id);
    }

    async uploadMediaToLocalHost(c: Context) {
        const data = (await getReqBody(c)) as MediaGetDTO;
        try {
            await MediaService.uploadMediaToLocalHost(data);

            await clearCache("media");
            return c.json("file is write");
        } catch (e) {
            console.log(e);
        }
    }

    async getMediaToLocalHost(c: Context) {
        // const t = await mediaService.getMedialToLocalHost();
        return c.json({ message: "" });
    }
}

export default new MediaController();
