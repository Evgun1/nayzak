import PopupLoading from '@/components/popup-loading/PopupLoading';
import Cart from '../../components/page-cart/Cart';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

export default function page() {
	return <Cart />;
}
