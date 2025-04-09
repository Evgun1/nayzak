import { Hono } from "hono";
import ProductsController from "./products.controller";
import productsController from "./products.controller";
import validation from "../validator/validation";
import customValidator from "../validator/customValidator";
import mainMiddleware from "../utils/middleware/main.middleware";
import { sqlQuery } from "../../sql";
import { json } from "stream/consumers";
import { Brands, Categories, Prisma, Products } from "@prisma/client";

const productRouter = new Hono();

const schemaParam = new Map().set("productId", validation().global.number);
const schemaProducts = new Map();

const productsValidation = validation().product;
for (const [key, schema] of Object.entries(productsValidation)) {
    schemaProducts.set(key, schema);
}

productRouter.get(
    "/",

    // productsMiddleware.search,
    ProductsController.getAll
);

productRouter.get(
    "/:productParam",

    // customValidator("param", schemaParam),
    ProductsController.getProduct
);
productRouter.get(
    "/by-params/:category/:subcategory",
    productsController.getAllByParams
);
productRouter.get(
    "/min-max-price/:category/:subcategory",
    productsController.getMinMaxPrice
);

productRouter.put(
    "/:productId",
    mainMiddleware.checkAdmin,
    productsController.change
);

productRouter.post(
    "/",
    customValidator("body", schemaProducts),
    mainMiddleware.checkAdmin,
    productsController.create
);

productRouter.delete(
    "/:productId",

    customValidator("param", schemaParam),
    // productsMiddleware.delete,
    mainMiddleware.checkAdmin,
    productsController.delete
);

// const sql = sqlQuery.select<Products>("Products");

// const categoriesJoin = sqlQuery.join<Categories>("Categories", "INNER");
// categoriesJoin.fields(["id"]);
// categoriesJoin.where({ title: "*ttt*" });

// const categoriesJoin3 = sqlQuery.join<Categories>("Categories", "INNER");
// categoriesJoin3.fields(["id"]);
// categoriesJoin3.where({ title: "*ttt*" });

// sql.fields(["brandsId"]);
// sql.where({ brandsId: "1" });

// const t = await sql.query();

// console.log(t);

export default productRouter;
