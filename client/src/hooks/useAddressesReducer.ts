// import { addressAction } from "./../lib/redux/store/address/address";
// import { useAppSelector } from "@/lib/redux/redux";
// import { AddressData } from "@/lib/redux/store/address/address";
// import { tree } from "next/dist/build/templates/app-page";
// import { useCallback, useReducer, Reducer, useEffect } from "react";

// enum ActionType {
//     INIT,
//     FILTER_BY_ID,
// }

// type AddressesAction = {
//     type: ActionType;
//     payload?: Partial<AddressesState> | null;
// };

// interface AddressesState {
//     address: AddressData | null;
//     addresses: AddressData[];
// }

// const addressesReducer: Reducer<AddressesState, AddressesAction> = (
//     state,
//     action
// ) => {
//     switch (action.type) {
//         case ActionType.INIT:
//             return { ...action.payload };

//         case ActionType.FILTER_BY_ID: {
//             return {
//                 ...state,
//                 address: state.addresses.find(
//                     (add) => add.id === action.payload?.address?.id
//                 ),
//             };
//         }
//         default:
//             return state;
//     }
// };

// export const useAddressesReducer = () => {
//     const addresses = useAppSelector((state) => state.address.address);

//     const [state, dispatch] = useReducer(addressesReducer, {
//         address: null,
//         addresses: addresses,
//     } as AddressesState);

//     (() => {
//         return useCallback(() => {
//             return dispatch({ type: ActionType.INIT, payload: { addresses } });
//         }, [addresses]);
//     })();
//     // const initData = useCallback(() => {
//     // 	const address = addresses[0];

//     // 	dispatch({
//     // 		type: ActionType.INIT,
//     // 		payload: {
//     // 			address,
//     // 			addresses,
//     // 		},
//     // 	});
//     // }, [state.addresses]);

//     const filterById = useCallback(
//         (addressId: number) => {
//             for (const element of state.addresses) {
//                 if (element.id === addressId) {
//                     dispatch({
//                         type: ActionType.FILTER_BY_ID,
//                         payload: { address: element },
//                     });
//                 }
//             }
//         },
//         [state.addresses]
//     );

//     return { state, filterById };
// };
