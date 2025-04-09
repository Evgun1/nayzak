import type { Metadata } from "next";

import "./globals.scss";
import StoreProvider from "./storeProvider";
import IconsSprite from "../components/elements/icons/IconsSprite";
import Footer from "../components/footer/Footer";
import Popup from "../components/elements/popup/popup";
import Header from "@/components/header/Header";
import Notification from "@/lib/ui/notification/Notification";
import InitData from "@/components/elements/initData";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default async function RootLayout({
    children,
    test,
}: Readonly<{
    children: React.ReactNode;
    test: React.ReactNode;
}>) {
    return (
        <StoreProvider>
            <html lang='en'>
                <body>
                    <div id='root'>
                        <div id='popup'></div>
                        <div id='overlay'></div>
                        <div id='notification-container'></div>

                        <Header />
                        {children}
                        <Footer />
                    </div>
                    <Popup />
                    <Notification />
                    <IconsSprite />
                    <InitData />
                </body>
            </html>
        </StoreProvider>
    );
}
