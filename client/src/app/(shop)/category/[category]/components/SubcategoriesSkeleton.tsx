import classes from "./SubcategoriesSkeleton.module.scss";
import Skeleton from "@/components/skeleton/Skeleton";
import React from "react";

const SubcategoriesSkeleton: React.FC = () => {
	return <Skeleton className={classes["skeleton"]} />;
};

export default SubcategoriesSkeleton;
