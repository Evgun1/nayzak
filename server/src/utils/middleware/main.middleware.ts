import { Context, Next } from "hono";
import { HTTPException } from "hono/http-exception";
import credentialsService from "../../credentials/credentials.service";

class MainMiddleware {
  async checkAdmin(c: Context, next: Next) {
    const token = c.req.header("Authorization");
    if (!token) throw new HTTPException(401, { message: "No token provided" });

    const credentials = await credentialsService.findCredentials({ token });

    if (!credentials.role.includes("admin"))
      throw new HTTPException(403, {
        message: "You do not have admin privileges",
      });
    await next();
  }
}

export default new MainMiddleware();
export { MainMiddleware };
