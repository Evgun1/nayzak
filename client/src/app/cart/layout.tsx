import classes from "./Cart.module.scss";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section>
			<div className="container">
				<h3 className={classes["cart__title"]}>Cart</h3>
				{children}
			</div>
		</section>
	);
}
