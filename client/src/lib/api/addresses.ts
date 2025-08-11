import { AddressItem } from "@/types/addresses.types";
import { appFetchDelete, appFetchGet, appFetchPost, appFetchPut } from ".";
import { AddressData } from "@/redux/store/address/address";

// let pathname = "addresses";
const tag = "addresses";

type AppAddressesAllGetProps = {
	searchParams: URLSearchParams;
};
export const appAddressesInitGet = async (token: string) => {
	// const { searchParams } = props;

	const nginxPathname = "user/addresses/init";

	const { result, totalCount } = await appFetchGet<AddressItem[]>({
		pathname: nginxPathname,
		authorization: token,
		cache: { request: "no-cache" },
	});

	return { result, totalCount };
};

type appAddressesOneGetProps = {
	addressesParams: number;
};
export const appAddressesOneGet = async (props: appAddressesOneGetProps) => {
	const { addressesParams } = props;
	const nginxPathname = "user/addresses";

	const { result } = await appFetchGet<AddressItem>({
		pathname: `${nginxPathname}/${addressesParams}`,
		cache: { request: "no-cache" },
	});
	return result;
};

type AppAddressesPostProps = {
	sendData: AddressData;
	token: string;
};
export const appAddressesPost = async (props: AppAddressesPostProps) => {
	const { sendData } = props;
	const nginxPathname = "user/addresses";

	console.log(sendData);

	const { result, totalCount } = await appFetchPost<AddressItem>({
		authorization: props.token,
		pathname: nginxPathname,
		sendData: sendData,
	});

	return result;
};

type AppAddressesPutProps = {
	sendData: AddressData & { id: number };
	token: string;
};
export const appAddressesPut = async (props: AppAddressesPutProps) => {
	const { sendData } = props;
	const nginxPathname = "user/addresses";

	const { result, totalCount } = await appFetchPut<AddressItem>({
		authorization: props.token,

		pathname: nginxPathname,
		putData: sendData,
	});

	return result;
};

type AppAddressesDelete = {
	deleteData: { addressId: number | number[] } | FormData;
	token: string;
};
export const appAddressesDelete = async (props: AppAddressesDelete) => {
	const { deleteData } = props;
	const nginxPathname = "user/addresses";

	const { result } = await appFetchDelete<AddressItem>({
		pathname: nginxPathname,
		deleteData,
	});

	return result;
};
