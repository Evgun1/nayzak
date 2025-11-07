import { ProductsWhereInput } from "src/prisma/interface/where";
import {
	ProductsPrismaIncludes,
	ProductsPrismaOrderBy,
	ProductsPrismaSelect,
	ProductsPrismaWhere,
} from "./productsPrismaArgsItem";
import { ProductsOrderBy } from "src/prisma/interface/orderBy";

export interface ProductsPrismaArgs {
	select?: ProductsPrismaSelect;
	includes?: ProductsPrismaIncludes;
	where?: ProductsWhereInput;
	orderBy?: ProductsOrderBy;
	limit?: number;
	offset?: number;
}
