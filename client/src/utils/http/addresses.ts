import { AddressItem } from '@/types/addresses.types';
import { appFetchDelete, appFetchGet, appFetchPost, appFetchPut } from '.';
import { AddressData } from '@/lib/redux/store/address/address';

type AppAddressesAllGetProps = {
	searchParams: URLSearchParams;
};

let pathname = 'addresses';

export const appAddressesAllGet = async (props: AppAddressesAllGetProps) => {
	const { searchParams } = props;

	const { response, totalCount } = await appFetchGet<AddressItem[]>({
		pathname,
		searchParams,
	});
	return { response, totalCount };
};

type AppAddressesPostProps = {
	sendData: AddressData | FormData;
};

export const appAddressesPost = async (props: AppAddressesPostProps) => {
	const { sendData } = props;

	const { response, totalCount } = await appFetchPost<AddressItem>({
		pathname,
		sendData: sendData,
	});

	return response;
};

type AppAddressesPutProps = {
	sendData: (AddressData & { id: number }) | FormData;
	id: number;
};

export const appAddressesPut = async (props: AppAddressesPutProps) => {
	const { sendData, id } = props;

	pathname += `/${id}`;

	const { response, totalCount } = await appFetchPut<AddressItem>({
		pathname,
		putData: sendData,
	});

	return response;
};

type AppAddressesDelete = {
	deleteData: { addressId: number | number[] } | FormData;
};

export const appAddressesDelete = async (props: AppAddressesDelete) => {
	const { deleteData } = props;

	const { response } = await appFetchDelete<AddressItem>({
		pathname,
		deleteData,
	});

	return response;
};
