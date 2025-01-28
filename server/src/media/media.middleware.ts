import { Context, Next } from "hono";
import { HTTPException } from "hono/http-exception";
import credentialsService from "../credentials/credentials.service";

class MediaMiddleware {
  async deleteMedia(c: Context, next: Next) {
    const token = c.req.header("Authorization");

    if (!token)
      throw new HTTPException(401, { message: "Authorization is missing" });

    const credentialsRole = await credentialsService
      .findCredentials({ token })
      .then((data) => data.role);

    if (credentialsRole !== "admin")
      throw new HTTPException(403, {
        message: "The client cannot delete the data",
      });

    await next();
  }
}

export default new MediaMiddleware();
