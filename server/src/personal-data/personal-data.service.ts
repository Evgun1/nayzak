import { decode, jwt } from "hono/jwt";
import prismaClient from "../prismaClient";
import PersonalDataFormDTO from "./interfaces/PersonalDataForm";
import PersonalDataParamsDTO from "./interfaces/PersonalDataParams";
import UserGetDTO from "../users/interface/UserGetInput";
import usersService from "../users/users.service";

class PersonalDataServer {
  async getOne(inputData: PersonalDataParamsDTO) {}

  async create({ firstName, lastName, phone, userID }: PersonalDataFormDTO) {
    const result = await prismaClient.personalData.create({
      data: {
        firstName: firstName as string,
        lastName: lastName as string,
        phone: phone as number,
        users_id: userID as number,
      },
    });

    return result;
  }
}

export default new PersonalDataServer();
