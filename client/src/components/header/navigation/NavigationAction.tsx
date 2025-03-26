"use client";
import Navbar from "@/lib/ui/navbar/Navbar";
import React from "react";

interface NavigationActionProps {
    navigationData: NavigationItem[];
}

interface NavigationItem {
    label: string;
    url: string;
    active?: boolean;
    children?: NavigationItem[];
}
export type AppNavigation = NavigationItem[];

const NavigationAction: React.FC<NavigationActionProps> = ({
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
                            endpoint: `/category/${category.url.toLowerCase()}`,
                        }}
                    >
                        {category.label}
                    </Navbar.Trigger>

                    <Navbar.Body>
                        {category.children &&
                            category.children.length > 0 &&
                            category.children.map((subcategory, i) => (
                                <Navbar.Item
                                    key={i}
                                    href={{
                                        endpoint: `category/${category.url.toLowerCase()}/${subcategory.url.toLowerCase()}`,
                                    }}
                                >
                                    {subcategory.label}
                                </Navbar.Item>
                            ))}
                    </Navbar.Body>
                </Navbar.Content>
            ))}
        </Navbar>
    );
};

export default NavigationAction;
