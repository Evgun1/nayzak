import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import classes from "./Checkout.module.scss";
import CheckoutForm from "./components/CheckoutForm";

export default function RootLayout({
	// forms,
	address,
	contact,
	order,
}: {
	children: React.ReactNode;
	// forms: React.ReactNode;
	address: React.ReactNode;
	contact: React.ReactNode;
	order: React.ReactNode;
}) {
	return (
		<section>
			<div className={`container`}>
				<div className={classes.checkout}>
					<h3 className={classes["checkout__header"]}>Checkout</h3>

					<div className={classes["checkout__main"]}>
						<CheckoutForm>
							{contact}
							{address}
							{order}
							<ButtonCustom
								className={classes["checkout__main-btn"]}
								typeProperty="submit"
								styleSettings={{
									fill: "SOLID",
									type: "DEFAULT",
									color: "DARK",
									size: "MEDIUM",
									roundness: "ROUNDED",
								}}
							>
								Place order
							</ButtonCustom>
						</CheckoutForm>
					</div>
				</div>
			</div>
		</section>
	);
}
