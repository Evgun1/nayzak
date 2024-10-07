import { decode, jwt } from "hono/jwt";
import prismaClient from "../prismaClient";
import PersonalDataFormDTO from "./interfaces/PersonalDataForm";
import PersonalDataParamsDTO from "./interfaces/PersonalDataParams";
import UserGetDTO from "../users/interface/UserGetInput";
import usersService from "../users/users.service";

class PersonalDataServer {
  async getOne(inputData: PersonalDataParamsDTO) {}

  async create({ firstName, lastName, phone, userToken }: PersonalDataFormDTO) {
    if (!userToken) return;
    const { id } = await usersService.findUserByToken(userToken);

    if (!firstName || !lastName || !phone) return;

    const result = await prismaClient.personalData.create({
      data: { firstName, lastName, phone, users_id: id },
    });

    return result;
  }
}

export default new PersonalDataServer();
