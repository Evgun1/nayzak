"use client";

import DisplayIcon from "@/components/elemets/icons/displayIcon";
import classes from "./Toolbar.module.scss";
import IconsIdList from "@/components/elemets/icons/IconsIdList";
import Link from "next/link";
import { ButtonClassList } from "@/types/buttonClassList";
import {
  EventHandler,
  FC,
  MouseEventHandler,
  RefObject,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";
import { FilterContext } from "./FilterCtx";
import ButtonCustom from "@/lib/ui/custom-elemets/button-custom/ButtonCustom";
import { PageProps } from "../../../../.next/types/app/layout";
import { Size, Type } from "@/lib/ui/custom-elemets/button-custom/ButtonType";
import LinkCustom from "@/lib/ui/custom-elemets/link-custom/LinkCustom";
import DropDown from "@/lib/ui/drop-down/DropDown";

type ToolbarProps = {};

enum TypeList {
  FIVE = "five_grid",
  FOUR = "four_grid",
  THREE = "three_grid",
  TWO = "two_grid",
  LIST = "list",
}

const SELECTOR = [
  { icon: IconsIdList.FIVE_COLUMS, typeList: TypeList.FIVE },
  { icon: IconsIdList.FOUR_COLUMS, typeList: TypeList.FOUR },
  { icon: IconsIdList.THREE_COLUMS, typeList: TypeList.THREE },
  { icon: IconsIdList.TWO_COLUMS, typeList: TypeList.TWO },
  { icon: IconsIdList.LIST_COLUMS, typeList: TypeList.LIST },
];

const sortData = [
  {
    title: "Price: Ascending",
    valueName: {
      sortBy: "price",
      sort: "asc",
    },
  },
  {
    title: "Price: Descending",
    valueName: {
      sortBy: "price",
      sort: "desc",
    },
  },
  {
    title: "By Review",
    valueName: {
      sortBy: "rating",
      sort: "desc",
    },
  },
];

export default function Toolbar(props: PageProps) {
  const { isActive, setIsActive, count, totalCount } =
    useContext(FilterContext);

  const btnClickFilter: MouseEventHandler = (event) => setIsActive(!isActive);

  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapper__toolbar}>
        <span>{totalCount} products</span>
        <div className={classes["wrapper__toolbar-filter"]}>
          {/* <button
            name="btnFilter"
            className={classes["wrapper__toolbar-filter_item"]}
            onClick={btnClickFilter}
          >
            <span className={ButtonClassList.BUTTON_SMALL}>Filter</span>
            <DisplayIcon
              className={classes["icon-btn"]}
              iconName={IconsIdList.SETTINGS}
            />
          </button> */}
          <ButtonCustom.SiteButton
            onClick={btnClickFilter}
            // size={ButtonCustom.Size.S}
            // type={ButtonCustom.Type.text}
            // icon={IconsIdList.SETTINGS}
            styleSettings={{
              roundess: ButtonCustom.Roundness.sharp,
              size: ButtonCustom.Size.S,
              type: ButtonCustom.Type.text,
              color: { dark: true },
            }}
          >
            Filter
          </ButtonCustom.SiteButton>

          <DropDown
            typeProperty={"click"}
            lable={"Sort by"}
            btnCustomSettingth={{
              roundess: ButtonCustom.Roundness.sharp,
              color: { dark: true },
              size: Size.S,
              type: Type.text,
              // icon_right: IconsIdList.CHEVRONE,
              icon: IconsIdList.CHEVRONE,
            }}
          >
            {sortData.map((value, index) => (
              <DropDown.Item key={index}>
                <LinkCustom.SiteLink
                  href={{ queryParams: value.valueName }}
                  styleSettings={{
                    type: LinkCustom.Type.text,
                    color: { dark: true },
                    roundess: LinkCustom.Roundness.sharp,
                    size: LinkCustom.Size.XL,
                  }}
                >
                  {value.title}
                </LinkCustom.SiteLink>
                {/* <LinkItem
                  searchParams={props.searchParams}
                  urlName={value.valueName}
                  title={value.title}
                /> */}
              </DropDown.Item>
            ))}
          </DropDown>
          <ul className={classes.selector}>
            {SELECTOR.map((value, index) => (
              <li key={index}>
                <ListBtn icon={value.icon} typeList={value.typeList} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={classes.wrapper__filter_button}>
        <div></div>
      </div>
    </div>
  );
}

type ListBtnProps = {
  icon: IconsIdList;
  typeList: string;
};
const ListBtn: FC<ListBtnProps> = ({ typeList, icon }) => {
  const [activeBtn, setActiveBtn] = useState<boolean>(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (
      searchParams.has("list_type") &&
      searchParams.get("list_type") !== null
    ) {
      setActiveBtn(searchParams.get("list_type") === typeList);
    } else {
      setActiveBtn(TypeList.FIVE === typeList);
    }
  }, [searchParams]);

  return (
    <Link
      scroll={false}
      href={`?list_type=${typeList}`}
      className={`${classes.selector__link} ${activeBtn ? classes.active : ""}`}
    >
      <DisplayIcon className={classes["icon-selector"]} iconName={icon} />
    </Link>
  );
};
