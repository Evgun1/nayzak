"use client";

import DisplayIcon from "@/app/components/icons/displayIcon";
import classes from "./Toolbar.module.scss";
import IconsIdList from "@/app/components/icons/IconsIdList";
import Link from "next/link";
import { ButtonClassList } from "@/app/components/types/buttonClassList";
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
import DropDown from "@/app/components/dropDown/DropDown";
import ButtonCustom, {
  Size,
  Type,
} from "@/app/components/button-custom/ButtonCustom";

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

const array = ["test1", "test2", "test3"];

export default function Toolbar({}: ToolbarProps) {
  const { isActive, setIsActive, count, totalCount } =
    useContext(FilterContext);

  const btnClickFilter: MouseEventHandler = (event) => setIsActive(!isActive);

  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapper__toolbar}>
        <span>{totalCount} products</span>
        <div className={classes["wrapper__toolbar-filter"]}>
          <ButtonCustom.SiteButton
            element={{ button: btnClickFilter }}
            size={ButtonCustom.Size.S}
            type={ButtonCustom.Type.text}
          ></ButtonCustom.SiteButton>
          <button
            name="btnFilter"
            className={classes["wrapper__toolbar-filter_item"]}
            onClick={btnClickFilter}
          >
            <span className={ButtonClassList.BUTTON_SMALL}>Filter</span>
            <DisplayIcon
              className={classes["icon-btn"]}
              iconName={IconsIdList.SETTINGS}
            />
          </button>
          <div className={classes["wrapper__toolbar-filter_item"]}>
            {/* <span>Sort by (Drop Down)</span> */}
            {/* <DisplayIcon
              className={classes["icon-btn"]}
              iconName={IconsIdList.CHEVRONE}
            /> */}
            <DropDown
              title="Sort by"
              btnCustomSettingth={{
                size: Size.S,
                type: Type.text,
                icon_right: IconsIdList.CHEVRONE,
              }}
            >
              {array.map((value, index) => (
                <DropDown.Item key={index}>
                  <div>{value}</div>
                </DropDown.Item>
              ))}
            </DropDown>
          </div>
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
