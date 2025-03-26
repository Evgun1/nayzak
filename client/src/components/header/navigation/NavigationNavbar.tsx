"use client";
import LinkCustom from "@/lib/ui/custom-elements/link-custom/LinkCustom";
import DropDown from "@/lib/ui/drop-down/DropDown";
import Navbar from "@/lib/ui/navbar/Navbar";
import { CategoryItem } from "@/types/categories.types";
import React, { Suspense } from "react";
import NavigationNavbarBody from "./NavigationNavbarBody";
import dynamic from "next/dynamic";

interface NavigationNavbarProps {
    navigationData: CategoryItem[];
}

interface NavigationItem {
    label: string;
    url: string;
    active?: boolean;
    children?: NavigationItem[];
}
export type AppNavigation = NavigationItem[];

const NavigationNavbarBodyDynamic = dynamic(() => import("./NavigationNavbarBody"), {
    ssr: false,
});

const NavigationNavbar: React.FC<NavigationNavbarProps> = ({
    navigationData,
}) => {
    if (!navigationData || navigationData.length === 0) {
        return;
    }

    return (
        <Navbar>
            {navigationData.map((category, i) => (
                <Navbar.Content key={i}>
                    <Navbar.Trigger
                        href={{
                            endpoint: `/category/${category.title.toLowerCase()}`,
                        }}
                    >
                        {category.title}
                    </Navbar.Trigger>
                    <NavigationNavbarBodyDynamic category={category} />
                </Navbar.Content>
            ))}
        </Navbar>
    );
};

export default NavigationNavbar;
