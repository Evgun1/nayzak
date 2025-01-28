import classes from "./Header.module.scss";

const Header = () => {
	return (
		<div className={classes["header"]}>
			<div>Notifications</div>
			<div>
				<div>
					<div></div>
				</div>
			</div>
			<div>Messages</div>
			<div>Admin</div>
		</div>
	);
};

export default Header;
