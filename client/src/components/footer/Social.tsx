import IconsIdList from "@/components/elements/icons/IconsIdList";

import classes from "./Social.module.scss";
import { FC } from "react";
import LinkCustom from "@/lib/ui/custom-elements/link-custom/LinkCustom";

const SOCIAL_ARRAY = [
    {
        icon: "FACEBOOK",
        link: "https://facebook.com/",
    },
    {
        icon: "INSTAGRAM",
        link: "https://www.instagram.com/",
    },
    {
        icon: "TWITTER",
        link: "https://x.com/",
    },
    {
        icon: "EMAIL",
        link: "https://www.google.com/intl/us/gmail/about/",
    },
];

const Social: FC = () => {
    return (
        <div className={classes[`social`]}>
            {SOCIAL_ARRAY &&
                SOCIAL_ARRAY.length > 0 &&
                SOCIAL_ARRAY.map((value, index) => (
                    <LinkCustom
                        key={index}
                        styleSettings={{
                            type: "SQUARE",
                            color: "LIGHT",
                            size: "SMALL",
                            roundness: "PILL",
                            fill: "SOLID",
                            icon: {
                                left: value.icon as
                                    | "FACEBOOK"
                                    | "INSTAGRAM"
                                    | "TWITTER"
                                    | "EMAIL",
                            },
                        }}
                        className={classes["social__link"]}
                        href={{ endpoint: value.link }}
                        target
                    />
                ))}
        </div>
    );
};

export default Social;
