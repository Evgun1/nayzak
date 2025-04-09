import Profile from "@/components/page-profile/Profile";
import PopupLoading from "@/components/popup-loading/PopupLoading";
import dynamic from "next/dynamic";

const ProfileDynamic = dynamic(
    () => import("@/components/page-profile/Profile"),
    { ssr: false, loading: () => <PopupLoading /> }
);

export default async function Page() {
    return <ProfileDynamic />;
}
