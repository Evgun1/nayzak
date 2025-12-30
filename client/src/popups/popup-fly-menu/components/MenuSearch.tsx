import classes from "./MenuSearch.module.scss";
import DisplayIcon from "@/components/icons/displayIcon";
import IconsIdList from "@/components/icons/IconsIdList";
import { appProductsGet } from "@/lib/api/products";
import { ProductBase } from "@/types/product/productBase";
import { FunctionComponent, useDeferredValue, useState } from "react";
import { useSearchContext } from "../context/useSearchContext";

interface MenuSearchProps {}

const MenuSearch: FunctionComponent<MenuSearchProps> = () => {
	const { setSearchParams, setIsOpen } = useSearchContext();

	async function searchActionHandler(formData: FormData) {
		setIsOpen(true);
		const search = formData.get("search");
		if (!search) return setSearchParams(undefined);

		const urlSearchParams = new URLSearchParams({
			search: search as string,
		});
		setSearchParams(urlSearchParams);
	}

	return (
		<div className={classes["menu-search"]}>
			<form
				className={classes["menu-search__form"]}
				action={searchActionHandler}
			>
				<button
					type="submit"
					className={classes["menu-search__btn"]}
				>
					<DisplayIcon
						className={classes["menu-search__btn-icon"]}
						iconName={IconsIdList.SEARCH}
					/>
				</button>
				<input
					name="search"
					className={classes["menu-search__input"]}
					type="text"
					placeholder="Search products..."
				/>
			</form>
		</div>
	);
};

export default MenuSearch;
