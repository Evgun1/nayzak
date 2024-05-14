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

type ToolbarProps = {
  counts: number;
};

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

export default function Toolbar({ counts }: ToolbarProps) {
  const {isActive, setIsActive } = useContext(FilterContext);

  const btnClickFilter: MouseEventHandler = (event) => setIsActive(!isActive);

  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapper__toolbar}>
        <span>{counts} products</span>
        <div className={classes["wrapper__toolbar-filter"]}>
          <button
            name="btnFilter"
            className={classes["wrapper__toolbar-filter_item"]}
            onClick={btnClickFilter}
          >
            <span className={ButtonClassList.BUTTON_SMALL}>Filter</span>
            <DisplayIcon
              iconName={IconsIdList.SETTINGS}
              height="20"
              width="20"
            />
          </button>
          <div className={classes["wrapper__toolbar-filter_item"]}>
            <span>Sort by (Drop Down)</span>
            <DisplayIcon
              iconName={IconsIdList.CHEVRONE}
              height="20"
              width="20"
            />
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
      className={`${classes.selector__link} ${activeBtn ? "active" : ""}`}
    >
      <DisplayIcon iconName={icon} height="24" width="24" />
    </Link>
  );
};
