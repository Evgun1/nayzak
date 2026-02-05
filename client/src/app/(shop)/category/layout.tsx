"use server";
import classes from "./style.module.scss";
import { FC, ReactNode } from "react";
import Header from "./components/Header";
interface RootLayoutProps {
	children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = async (props) => {
	return (
		<section>
			<div className="container">
				<div className={classes["category"]}>
					<Header />
					{props.children}
				</div>
			</div>
		</section>
	);
};
export default RootLayout;
// export default async function RootLayout(props: { children: ReactNode }) {
// 	return (
// 		<section>
// 			<div className="container">
// 				<div className={classes["category"]}>
// 					<Header />
// 					{props.children}
// 				</div>
// 			</div>
// 		</section>
// 	);
// }
