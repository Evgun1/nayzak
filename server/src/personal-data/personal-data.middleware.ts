import { Context, Next } from "hono";
import PersonalDataFormDTO from "./interfaces/PersonalDataForm";

class PersonalDataMiddleware {
  async create(c: Context, next: Next) {
    const { firstName, lastName, phone, userID } =
      c.req.parseBody() as PersonalDataFormDTO;
  }
}

export default new PersonalDataMiddleware();
