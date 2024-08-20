import { randomUUID } from "crypto";
import prismaClient from "../prismaClient";
import bcrypt from "bcrypt";
import TokenService from "../token/token.service";
import { UserDto } from "./user.dto";
import mailService from "../mail/mail.service";

class UsersServer {
  async registration(email: string, password: string) {
    const candidate = await prismaClient.users.findFirst({
      where: { email },
    });
    if (candidate) throw new Error(`Already exists ${candidate.email}`);

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = randomUUID();

    const createUser = await prismaClient.users.create({
      data: {
        email,
        password: hashPassword,
        activationLink,
      },
    });
    await mailService.sendActivateMail(email, activationLink);
    const userDTO = new UserDto({
      id: createUser.id,
      email: createUser.email,
      isActivatet: createUser.isActive,
    });
    const tokens = await TokenService.generateToken({ ...userDTO });
    await TokenService.saveToken(userDTO.id, tokens.refreshToken);

    return {
      ...tokens,
      createUser: userDTO,
    };
  }
}

export default new UsersServer();
