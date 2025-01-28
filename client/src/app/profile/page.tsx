import Profile from '@/components/page-profile/Profile';
import PopupLoading from '@/components/popup-loading/PopupLoading';
import dynamic from 'next/dynamic';
export default async function page() {
	const DynamicProfile = dynamic(
		() => import('@/components/page-profile/Profile'),
		{ loading: () => <PopupLoading />, ssr: true }
	);

	return <DynamicProfile />;
}
