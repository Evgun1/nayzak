"use client";

import ChangePassword from "./account-detail-forms/ChangePassword";

import classes from "./AccountDetails.module.scss";
import DetailInfo from "@/components/page-profile/account-details/account-detail-forms/DetailInfo";

export default function AccountDetails() {
    return (
        <div className={classes["account-details"]}>
            <DetailInfo />
            <ChangePassword />
        </div>
    );
}
