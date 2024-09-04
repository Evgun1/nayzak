import IconsIdList from "@/components/elemets/icons/IconsIdList";

import classes from "./Social.module.scss";
import { FC } from "react";
import LinkCustom from "@/lib/ui/custom-elemets/link-custom/LinkCustom";

const SOCIAL_ARRAY = [
  {
    icon: IconsIdList.FACEBOOK,
    link: "https://facebook.com/",
  },
  {
    icon: IconsIdList.INSTAGRAM,
    link: "https://www.instagram.com/",
  },
  {
    icon: IconsIdList.TWITTER,
    link: "https://x.com/",
  },
  {
    icon: IconsIdList.EMAIL,
    link: "https://www.google.com/intl/us/gmail/about/",
  },
];

const Social: FC = () => {
  return (
    <div className={classes[`social`]}>
      {SOCIAL_ARRAY &&
        SOCIAL_ARRAY.length > 0 &&
        SOCIAL_ARRAY.map((value, index) => (
          <LinkCustom.SiteLink
            key={index}
            styleSettings={{
              type: LinkCustom.Type.circle,
              color: { dark: true },
              size: LinkCustom.Size.S,
              roundess: LinkCustom.Roundness.pill,
              icon: value.icon,
            }}
            className={classes["social--link"]}
            href={{ endpoint: value.link }}
            target
          />
        ))}
    </div>
  );
};

export default Social;
