import { randomUUID } from "crypto";
import prismaClient from "../prismaClient";
import bcrypt from "bcrypt";
import { UserDto } from "./user.dto";
import mailService from "../mail/mail.service";
import { HTTPException } from "hono/http-exception";
import { sign, decode } from "hono/jwt";
import UserGetDTO from "./interface/UserGetInput";
import { Prisma } from "@prisma/client";

export async function registration(useToken: string) {
  const {
    payload: { email, password },
  }: { payload: { email: string; password: string } } = decode(useToken);

  const where = await userWhere({ email });
  const queryOprions: Prisma.UsersFindFirstArgs = {
    where,
  };

  const user = await prismaClient.users.findFirst(queryOprions);
  // if (user)
  //   throw new HTTPException(409, {
  //     message: `Email already exists`,
  //   });

  // const hashPassword = await bcrypt.hash(inputData.password.trim(), 3);
  const activationLink = randomUUID();

  const createUser = await prismaClient.users.create({
    data: {
      email: email.trim(),
      password: password,
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

  const token = await sign(userDTO, process.env.JWT_SECRET_KEY as string);

  return token;
}

export async function login(userToken: string) {
  const {
    payload: { email, password },
  }: { payload: { email: string; password: string } } = decode(userToken);

  const where = await userWhere({ email });
  const queryOprions: Prisma.UsersFindFirstArgs = {
    where,
  };

  const user = await prismaClient.users.findFirst(queryOprions);
  if (!user) {
    return;
    // throw new HTTPException(401, { message: "User not found" });
  }

  // const isPasswordEquals = await bcrypt.compare(
  //   password as string,
  //   user.password
  // );
  // if (!isPasswordEquals)
  //   throw new HTTPException(401, { message: "Incorrect password" });

  const userDTO = new UserDto({
    id: user.id,
    email: user.email,
    isActivatet: user.isActive,
  });

  const token = await sign(userDTO, process.env.JWT_SECRET_KEY as string);

  return token;
}

export async function activate(activationLink: string) {
  const user = await prismaClient.users.findFirst({
    where: { activationLink },
  });

  if (!user) {
    return;
    // throw new HTTPException(400, { message: "Invalid activation link" });
  }

  await prismaClient.users.update({
    where: { id: user.id },
    data: { isActive: true },
  });
}

export async function check(token: string) {
  const { payload } = decode(token);

  const user = await prismaClient.users.findFirst({
    where: { email: payload.email },
  });

  if (!user) {
    // throw new HTTPException(401, { message: "Not authorized" });
    return;
  }

  const userData = new UserDto({
    id: user.id,
    email: user.email,
    isActivatet: user.isActive,
  });

  const newToken = await sign(userData, process.env.JWT_SECRET_KEY as string);

  return newToken;
}

export async function findUserByToken(token: string) {
  const decodeToken: { header: any; payload: UserDto } = decode(token);

  const user = await prismaClient.users.findFirst({
    where: { email: decodeToken.payload.email },
  });

  if (!user) throw new HTTPException(401, { message: "Not authorized" });
  return user;
}

async function userWhere(userGetData: UserGetDTO) {
  const where: Prisma.UsersWhereInput = {};

  if (userGetData.email) {
    where.email = userGetData.email;
  }

  return where;
}

export default {
  registration,
  login,
  check,
  activate,
  findUserByToken,
};
