import Image from "next/image";
import Link from "next/link";
import classes from "./Banner.module.scss";
import DisplayIcon from "@/components/elemets/icons/displayIcon";
import IconsIdList from "@/components/elemets/icons/IconsIdList";
import { TextClassList } from "@/types/textClassList";
import { ButtonClassList } from "@/types/buttonClassList";
import ButtonCustom from "@/lib/ui/custom-elemets/button-custom/ButtonCustom";

const Banner = () => {
  return (
    <div className={classes.banner}>
      <img src="https://placehold.co/700x736" alt="" />
      <div className={classes["banner--content"]}>
        <span
          className={`${classes["banner--content-span"]} ${TextClassList.SEMIBOLD_16}`}
        >
          New Arrivals
        </span>
        <h3 className={classes["banner--content-title"]}>
          Your dream shop is a click away.
        </h3>
        <p
          className={`${classes["banner--content-paragraph"]} ${TextClassList.REGULAR_18}`}
        >
          Keep your everyday style chic and on-trend with our selection 20+
          styles to choose from.
        </p>

        <ButtonCustom.SiteButton
          styleSettings={{
            size: ButtonCustom.Size.S,
            type: ButtonCustom.Type.default,
            roundess: ButtonCustom.Roundness.sharp,
            icon: ButtonCustom.IconsIdList.ARROW_RIGHT,
            color: { dark: true },
          }}
        >
          See Collection
        </ButtonCustom.SiteButton>

        {/* <Link href={"/"} className={classes["wrapper__block-link"]}></Link> */}
      </div>
    </div>
  );
};

export default Banner;
