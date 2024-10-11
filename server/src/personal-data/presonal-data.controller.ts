import { Context } from "hono";
import personalDataService from "./personal-data.service";
import PersonalDataParamsDTO from "./interfaces/PersonalDataParams";
import PersonalDataFormDTO from "./interfaces/PersonalDataForm";
import { json } from "stream/consumers";

class PersonalDataControler {
  async getAll() {}
  async getOne(c: Context) {
    const inputData = c.req.query() as PersonalDataParamsDTO;

    const {} = personalDataService.getOne(inputData);
  }

  async create(c: Context) {
    const inputData = (await c.req.parseBody()) as PersonalDataFormDTO;

    if (!inputData) return;

    const personalData = await personalDataService.create(inputData);

    return c.json({ personalData });
  }

  async delete() {}

  async change() {}
}

export default new PersonalDataControler();
