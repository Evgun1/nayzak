import { TextClassList } from "@/components/types/textClassList";
import classes from "./Feature.module.scss";
import LinkCustom from "@/components/custom-elemets/link-custom/LinkCustom";

export default function Feature() {
  return (
    <div className={`container ${classes.wrapper} `}>
      <div className={classes.wrapper__block}>
        <div className={classes["wrapper__block-title"]}>
          <span className={TextClassList.SEMIBOLD_16}>New Arrivals</span>
          <h3>Made from the finest materials</h3>
        </div>
        <p className={TextClassList.REGULAR_18}>
          Keep your everyday style chic and on-trend with our selection 20+
          styles to choose from.
        </p>

        <LinkCustom.SiteLinkCustom
          href={{ endpoint: "#" }}
          styleSettings={{
            roundess: LinkCustom.Roundness.sharp,
            size: LinkCustom.Size.L,
            type: LinkCustom.Type.text,
            icon: LinkCustom.IconsIdList.ARROW_RIGHT,
            color: { dark: true },
          }}
        >
          See Collection
        </LinkCustom.SiteLinkCustom>
      </div>
    </div>
  );
}
