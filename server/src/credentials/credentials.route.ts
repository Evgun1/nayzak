import { Context, Hono, Next } from "hono";
import appRouter from "../route";

import { validator } from "hono/validator";
import credentialsMiddleware from "./credentials.middleware";
import schemaValidationHandler from "../validator/schemaValidationHandler";
import validation from "../validator/validation";
import customValidator from "../validator/customValidator";
import credentialsService from "./credentials.service";
import credentialsController from "./credentials.controller";

const credentialsRoute = new Hono();

const schemaRegister = new Map();
schemaRegister.set("password", validation().auth.password);
schemaRegister.set("email", validation().auth.email);

const schemaChangePassword = new Map();
schemaChangePassword.set("newPassword", validation().auth.password);

const schemaChangeParam = new Map().set(
    "credentialsId",
    validation().global.number
);

credentialsRoute.get("/", credentialsController.getAll);
credentialsRoute.get("/:credentialsId", credentialsController.getOne);

credentialsRoute.get(
    "/active/:link ",
    credentialsMiddleware.active,
    credentialsController.active
);

credentialsRoute.post(
    "/registration",
    customValidator("body", schemaRegister),
    credentialsMiddleware.registration,
    credentialsController.registration
);

credentialsRoute.post(
    "/login",
    credentialsMiddleware.login,
    credentialsController.login
);

credentialsRoute.post(
    "/init",
    credentialsMiddleware.check,
    credentialsController.check
);

credentialsRoute.put(
    "/change-password",
    customValidator("body", schemaChangePassword),

    credentialsMiddleware.changePassword,
    credentialsController.changePassword
);

credentialsRoute.put(
    "/:credentialsId",
    customValidator("param", schemaChangeParam),
    credentialsMiddleware.change,
    credentialsController.change
);

credentialsRoute.delete("/", credentialsController.delete);

export default credentialsRoute;
