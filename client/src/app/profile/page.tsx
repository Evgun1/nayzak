import Profile from "@/page/profile/Profile";
import PopupLoading from "@/popups/popup-loading/PopupLoading";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const ProfileDynamic = dynamic(() => import("@/page/profile/Profile"), {
	ssr: false,
	loading: () => <PopupLoading />,
});

export default async function Page() {
	return null;
}
