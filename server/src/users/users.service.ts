import { randomUUID } from "crypto";
import prismaClient from "../prismaClient";
import bcrypt from "bcrypt";
import TokenService from "../token/token.service";
import { UserDto } from "./user.dto";
import mailService from "../mail/mail.service";
import { HTTPException } from "hono/http-exception";

class UsersServer {
  async registration(email: string, password: string) {
    const candidate = await prismaClient.users.findFirst({
      where: { email },
    });
    if (candidate)
      throw new HTTPException(401, {
        message: `Email already exists`,
      });

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = randomUUID();

    const createUser = await prismaClient.users.create({
      data: {
        email,
        password: hashPassword,
        activationLink,
      },
    });
    await mailService.sendActivateMail(
      email,
      `${process.env.API_URL}user/active/${activationLink}`
    );
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

  async activate(activationLink: string) {
    const user = await prismaClient.users.findFirst({
      where: { activationLink },
    });

    if (!user) {
      throw new HTTPException(400, { message: "Invalid activation link" });
    }

    await prismaClient.users.update({
      where: { id: user.id },
      data: { isActive: true },
    });
  }
}

export default new UsersServer();
