import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import StoreProvider from './storeProvider';
import IconsSprite from '../components/elements/icons/IconsSprite';
import Footer from '../components/footer/Footer';
import Popup from '../components/elements/popup/popup';
import Header from '@/components/header/Header';
import InitData from '@/components/elements/initData';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<StoreProvider>
			<html lang="en">
				<body className={inter.className}>
					<div id="root">
						<div id="popup"></div>
						<div id="overlay"></div>
						<InitData />
						<Popup />
						<Header />
						<main>{children}</main>
						<Footer />
					</div>
					<IconsSprite />
				</body>
			</html>
		</StoreProvider>
	);
}
