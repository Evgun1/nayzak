import classes from "./Checkout.module.scss";

export default function RootLayout({
	forms,
	order,
}: {
	children: React.ReactNode;
	forms: React.ReactNode;
	order: React.ReactNode;
}) {
	return (
		<section>
			<div className={`container`}>
				<div className={classes.checkout}>
					<h3 className={classes["checkout__header"]}>Checkout</h3>

					<div className={classes["checkout__main"]}>
						{forms}
						{order}
					</div>
				</div>
			</div>
		</section>
	);
}
