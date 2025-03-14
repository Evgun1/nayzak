"use client";
import LinkCustom from "@/lib/ui/custom-elements/link-custom/LinkCustom";
import DropDown from "@/lib/ui/drop-down/DropDown";
import Navbar from "@/lib/ui/navbar/Navbar";
import React from "react";

interface NavigationActionProps {
    navigationData: AppNavigation;
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
                        href={{ endpoint: `/category/${category.url}` }}
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
                                        endpoint: `/category/${category.url}/${subcategory.url}`,
                                    }}
                                >
                                    {subcategory.label}
                                </Navbar.Item>
                            ))}
                    </Navbar.Body>
                </Navbar.Content>
            ))}
        </Navbar>
        // <>
        //     {navigationData.map((category, i) => (
        //         <DropDown key={i}>
        //             <DropDown.Trigger
        //                 elementType='link'
        //                 href={{ endpoint: `category/${category.url}` }}
        //                 typeProperty='mouseenter'
        //                 children={category.label}
        //             />

        //             <DropDown.Body>
        //                 {category.children &&
        //                     category.children.length &&
        //                     category.children.map((subcategory, i) => (
        //                         <DropDown.Item
        //                             key={i}
        //                             elementType='link'
        //                             href={{
        //                                 endpoint: `/category/${category.url}/${subcategory.url}`,
        //                             }}
        //                         >
        //                             {subcategory.label}
        //                         </DropDown.Item>
        //                     ))}
        //             </DropDown.Body>
        //         </DropDown>
        //     ))}
        // </>
    );
};

export default NavigationAction;
