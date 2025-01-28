import Checkout from '@/components/page-checkout/Checkout';
import PopupLoading from '@/components/popup-loading/PopupLoading';
import dynamic from 'next/dynamic';

export default async function page() {
	const DynamicCheckout = dynamic(
		() => import(`@/components/page-checkout/Checkout`),
		{ loading: () => <PopupLoading /> }
	);

	return <DynamicCheckout />;
}
