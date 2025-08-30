"use client";
import classes from "./AccountDetails.module.scss";
import CustomerInfo from "./customer-info/CustomerInfo";
import ChangePassword from "./change-password/ChangePassword";

const Page = () => {
	return (
		<div className={classes["account-details"]}>
			<CustomerInfo />
			<ChangePassword  />
		</div>
	);
};

export default Page;
