import NotificationPreview from "@/lib/ui/notification/NotificationPreview";
import { FC, ReactNode } from "react";
import DisplayIcon from "../elements/icons/displayIcon";
import IconsIdList from "../elements/icons/IconsIdList";
import classes from "./PopupNotifications.module.scss";
import { TextClassList } from "@/types/textClassList.enum";

type PopupNotificationProps = {
    className?: string;
    children?: ReactNode;
    text?: string;
    icon?: "CHECK" | "CLOSE";
};

const PopupNotification: FC<PopupNotificationProps> = ({
    className,
    children,
    icon,
    text,
}) => {
    return (
        <NotificationPreview>
            <div className={classes["notification"]}>
                {icon && (
                    <DisplayIcon
                        iconName={IconsIdList[icon]}
                        className={`${classes["notification__icon"]} ${
                            icon === "CHECK"
                                ? classes["notification__icon--check"]
                                : classes["notification__icon--close"]
                        }`}
                    />
                )}
                {children ? (
                    <div className={className ? className : ""}>{children}</div>
                ) : (
                    <span
                        className={`${TextClassList.REGULAR_16} ${
                            className ? className : ""
                        }`}
                    >
                        {text}
                    </span>
                )}
            </div>
        </NotificationPreview>
    );
};

export default PopupNotification;
