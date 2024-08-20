import jwt from "jsonwebtoken";

import prismaClient from "../prismaClient";
import { sign } from "hono/jwt";
import { Context } from "hono";
class TokenService {
  async generateToken(payload: any) {
    const accessToken = await sign(
      {
        ...payload,
        exp: 60 * 30 * 1000,
      },
      process.env.JWT_ACCESS_SECRET as string
    );
    const refreshToken = await sign(
      {
        ...payload,
        exp: 60 * 60 * 24 * 30 * 1000,
      },
      process.env.JWT_REFRESH_SECRET as string
    );

    return { accessToken, refreshToken };
  }

  async saveToken(userID: any, refreshToken: any) {
    const tokenData = await prismaClient.token.findFirst({
      where: { user_id: userID },
      select: { user_id: true },
    });

    // const findeIDByUserID = await prismaClient.token.findFirst({
    //   where: { user_id: userID },
    //   select: { id: true },
    // });

    if (tokenData) {
      return await prismaClient.token.update({
        where: {
          user_id: tokenData,
        },
        data: { refreshToken: refreshToken },
      });
    }

    const createToken = await prismaClient.token.create({
      data: { user_id: userID, refreshToken },
    });

    return createToken;
  }
}

export default new TokenService();
