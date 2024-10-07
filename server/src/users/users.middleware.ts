import { Context, Next } from "hono";
import UserGetDTO from "./interface/UserGetInput";

class UsersMiddleware {
  async registration(c: Context, next: Next) {
    const body = await c.req.formData();
  }
}

export default new UsersMiddleware();
