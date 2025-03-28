"use client";

import { useAppDispatch, useAppSelector } from "@/lib/redux/redux";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import classes from "./Notification.module.scss";
import { notificationAction } from "@/lib/redux/store/notification/notification";
const Notification = () => {
    const notificationContent = useAppSelector(
        (state) => state.notification.notificationContent
    );
    const dispatch = useAppDispatch();
    const [notificationContainer, setNotificationContainer] =
        useState<Element>();

    useEffect(() => {
        const notificationContainer = document.getElementById(
            "notification-container"
        ) as Element;
        setNotificationContainer(notificationContainer);
        document.body.classList.toggle(
            "notification-is-open",
            notificationContent !== null
        );
        const notificationElement = document.getElementById("notification");

        const timeoutShow = showNotification(notificationElement);
        const timeoutHidden = hiddenNotification(notificationElement);

        notificationElement?.addEventListener("mouseenter", (e) => {
            showNotification(e.target as HTMLElement);
            clearTimeout(timeoutHidden);
        });

        notificationElement?.addEventListener("mouseleave", (e) => {
            hiddenNotification(e.target as HTMLElement);
        });

        return () => {
            clearTimeout(timeoutShow);
            clearTimeout(timeoutHidden);
            document.body.classList.remove("notification-is-open");
        };
    }, [notificationContent]);

    useEffect(() => {});

    const showNotification = (element: HTMLElement | null) => {
        const timeShow = setTimeout(() => {
            element?.classList.add(classes["notification--open"]);
        }, 10);
        return timeShow;
    };
    const hiddenNotification = (element: HTMLElement | null) => {
        const timeHide = setTimeout(() => {
            element?.classList.remove(classes["notification--open"]);
            setTimeout(() => {
                dispatch(notificationAction.toggle(null));
            }, 300);
        }, 1500);
        return timeHide;
    };

    if (notificationContent && notificationContainer) {
        return createPortal(
            <div
                onMouseLeave={(e) => showNotification(e.target as HTMLElement)}
                onMouseEnter={(e) =>
                    clearTimeout(hiddenNotification(e.target as HTMLElement))
                }
                id='notification'
                className={classes["notification"]}
            >
                {notificationContent}
            </div>,
            notificationContainer
        );
    }
};

export default Notification;
