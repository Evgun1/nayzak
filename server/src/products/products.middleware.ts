import { Context, Next } from "hono";
import { HTTPException } from "hono/http-exception";
import credentialsService from "../credentials/credentials.service";
import { plainToInstance } from "class-transformer";
import ProductQueryDTO from "./dto/ProductsInputDTO";
import { validate } from "class-validator";
import { createMiddleware } from "hono/factory";

class ProductMiddleware {
  setupQueryDTO(c: Context, next: Next) {
    return createmiddleware<{ variables: { querydto: productquerydto } }>(
      async (c, next) => {
        c.set("querydto", (query =  c.req.query())=> );
        await next();
      },
    );
  }
  async delete(c: Context, next: Next) {
    const token = c.req.header("Authorization");

    if (!token) throw new HTTPException(401, { message: "Not authorization" });
    const credentials = await credentialsService.findCredentials({
      token,
    });

    if (credentials.role !== "admin") {
      throw new HTTPException(403, {
        message: "The client cannot delete the data",
      });
    }
    await next();
  }

  async create(c: Context, next: Next) {
    const token = c.req.header("Authorization");

    if (!token) throw new HTTPException(401, { message: "Not authorization" });
    const credentials = await credentialsService.findCredentials({
      token,
    });

    if (credentials.role !== "admin") {
      throw new HTTPException(403, {
        message: "The client cannot create the data",
      });
    }
    await next();
  }

  async validateDTO(c: Context, next: Next) {
    return async (c: Context, next: Next) => {
      const queryDTO = plainToInstance(ProductQueryDTO, c.req.query());
      const errors = await validate(queryDTO);

      if (errors.length > 0) {
        throw new HTTPException(400, {
          message: errors.map((error) => error.constraints).join(", "),
        });
      }
    };
  }
}

export default new ProductMiddleware();
