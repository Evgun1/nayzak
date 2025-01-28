import PopupLoading from '@/components/popup-loading/PopupLoading';
import Cart from '../../components/page-cart/Cart';
import dynamic from 'next/dynamic';

export default function page() {
	const DynamicCart = dynamic(() => import('@/components/page-cart/Cart'), {
		loading: () => <PopupLoading />,
	});

	return <DynamicCart />;
}
