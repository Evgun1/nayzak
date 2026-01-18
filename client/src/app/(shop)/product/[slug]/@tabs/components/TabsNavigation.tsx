"use client";
import classes from "./TabsNavigation.module.scss";
import Accordion from "@/ui/accordion/Accordion";
import React, { FunctionComponent } from "react";
import { TabsMapType } from "../layout";
import { useAppSelector } from "@/redux/redux";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import Tabs from "@/ui/tabs/Tabs";

type TabsNavigationProps = {
	tabs: TabsMapType;
};

const TabsNavigation: FunctionComponent<TabsNavigationProps> = (props) => {
	const { tabs } = props;

	return (
		<div className={classes["tabs-content"]}>
			<div className={classes["tabs-content__accordion-wrapper"]}>
				{tabs.map((tab, i) => (
					<Accordion
						className={classes["tabs-content__accordion"]}
						key={i}
					>
						<React.Fragment key={i}>
							<Accordion.Header
								className={
									classes["tabs-content__accordion-header"]
								}
							>
								<ButtonCustom
									className={
										classes["tabs-content__accordion-btn"]
									}
									styleSettings={{
										color: "DARK",
										icon: { right: "CHEVRON" },
										size: "MEDIUM",
										fill: "SOLID",
										type: "UNDERLINE",
									}}
								>
									{tab.label}
								</ButtonCustom>
							</Accordion.Header>
							<Accordion.Body
								className={
									classes["tabs-content__accordion-body"]
								}
							>
								{tab.content}
							</Accordion.Body>
						</React.Fragment>
					</Accordion>
				))}
			</div>

			<Tabs className={classes["tabs-content__tabs"]}>
				<Tabs.Header className={classes["tabs-content__tabs-header"]}>
					{tabs.map((item, i) => (
						<Tabs.Toggle
							key={i}
							index={i}
							label={item.label}
						/>
					))}
				</Tabs.Header>
				<Tabs.Body>
					{tabs.map((item, i) => (
						<React.Fragment key={i}>{item.content}</React.Fragment>
					))}
				</Tabs.Body>
			</Tabs>
		</div>
	);
};

export default TabsNavigation;
