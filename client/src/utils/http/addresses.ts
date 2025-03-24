import { AddressItem } from "@/types/addresses.types";
import { appFetchDelete, appFetchGet, appFetchPost, appFetchPut } from ".";
import { AddressData } from "@/lib/redux/store/address/address";

let pathname = "addresses";

type AppAddressesAllGetProps = {
    searchParams: URLSearchParams;
};
export const appAddressesAllGet = async (props: AppAddressesAllGetProps) => {
    const { searchParams } = props;

    const { response, totalCount } = await appFetchGet<AddressItem[]>({
        tag: "addresses",
        pathname,
        searchParams,
    });

    return { response, totalCount };
};

type appAddressesOneGetProps = {
    addressesParams: number;
};
export const appAddressesOneGet = async (props: appAddressesOneGetProps) => {
    const { addressesParams } = props;

    const { response } = await appFetchGet<AddressItem>({
        tag: "addresses",
        pathname: `${pathname}/${addressesParams}`,
    });
    return response;
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
};
export const appAddressesPut = async (props: AppAddressesPutProps) => {
    const { sendData } = props;

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
