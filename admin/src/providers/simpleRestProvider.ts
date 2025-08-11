/** @format */

import { fetchUtils, Options } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { DataProvider } from 'ra-core/src/types.ts';

// const productParamsMapper = new Map<string, string>();
// productParamsMapper.set("_end", "limit");
// productParamsMapper.set("_order", "sort");
// productParamsMapper.set("_sort", "sortBy");
// productParamsMapper.set("_start", "offset");
// productParamsMapper.set("search", "search");

const apiURL = 'http://localhost:3030';

const customFetchJson = async (url: string | URL, options: Options = {}) => {
	const newURL = new URL(url);
	// const searchParams = new URLSearchParams(newURL.search);
	// const newSearchParams = new URLSearchParams();

	// for (const [key, value] of searchParams.entries()) {
	// const mappedKey = productParamsMapper.get(key);

	// if (mappedKey) {
	//   newSearchParams.set(mappedKey, value);
	// }
	// }

	// const limit = newSearchParams.get("limit");
	// const offset = newSearchParams.get("offset");
	// const sort = newSearchParams.get("sort");
	//
	// if (limit && offset) {
	//   newSearchParams.set("limit", (+limit - +offset).toString());
	//
	//
	//
	// }
	// if (sort) {
	//   newSearchParams.set("sort", sort.toLowerCase());
	// }

	// newURL.search = newSearchParams.toString();

	return await fetchUtils.fetchJson(newURL.toString(), {
		...options,
		cache: 'no-cache',
	});
};

export const restDataProvider = jsonServerProvider(apiURL, customFetchJson);

export const customDataProvider: DataProvider = {
	async create(resource, params) {
		const { data } = params;

		const options: Options = {};
		options.method = 'POST';

		const headers = new Headers({
			Authorization: `${localStorage.getItem('token')}`,
		});

		options.body = data instanceof FormData ? data : JSON.stringify(data);

		if (!(data instanceof FormData))
			headers.set('Content-Type', 'application/json');

		options.headers = headers;

		return customFetchJson(`${apiURL}/${resource}`, options)
			.then(({ json }) => ({ data: json }))
			.catch((err: Error) => {
				throw new Error(err.message.toString().replace('HttpError2:', ''));
			});
	},

	async update(resource, params) {
		const { data, id } = params;
		const options: Options = {
			method: 'PUT',
		};

		const headers = new Headers({
			Authorization: `${localStorage.getItem('token')}`,
		});

		options.body = data instanceof FormData ? data : JSON.stringify(data);

		if (!(data instanceof FormData)) {
			headers.set('Content-Type', 'application/json');
		}

		options.headers = headers;

		return customFetchJson(`${apiURL}/${resource}/${id}`, options)
			.then(({ json }) => ({ data: json }))
			.catch((err: Error) => {
				throw new Error(err.message.toString().replace('HttpError2:', ''));
			});
	},

	delete: async (resource, params) => {
		const { id } = params;
		const options: Options = {
			method: 'DELETE',
		};

		const headers = new Headers({
			Authorization: `${localStorage.getItem('token')}`,
		});

		options.headers = headers;
		options.body = JSON.stringify(id);

		return customFetchJson(`${apiURL}/${resource}`, options)
			.then(({ json }) => ({ data: json }))
			.catch((err: Error) => {
				throw new Error(err.message.toString().replace('HttpError2:', ''));
			});
	},

	deleteMany: async (resource, params) => {
		const { ids } = params;

		const options: Options = {
			method: 'DELETE',
		};

		const headers = new Headers({
			Authorization: `${localStorage.getItem('token')}`,
		});

		options.headers = headers;
		options.body = JSON.stringify(ids);

		return customFetchJson(`${apiURL}/${resource}`, options)
			.then(({ json }) => {
				json;
				return { data: ids };
			})
			.catch((error: Error) => {
				throw new Error(error.message);
			});
	},
	getList: async (resource, params) => {
		const options: Options = {
			method: 'GET',
		};
		const urlSearchParams = new URLSearchParams();

		const { sort, filter, pagination } = params;

		for (const key in filter) {
			urlSearchParams.set(key, filter[key]);
		}

		// urlSearchParams.set('filter', JSON.stringify(filter));
		// for (const filterKey in filter) {
		// 	console.log(filter);

		// 	// urlSearchParams.append("filterBy", filterKey);
		// 	// urlSearchParams.append("filter", filter[filterKey]);
		// }
		if (sort?.order && sort.field) {
			urlSearchParams.set('sortBy', sort?.field);
			urlSearchParams.set('sort', sort?.order.toLowerCase());
		}

		urlSearchParams.set(
			'limit',
			pagination?.perPage ? pagination?.perPage.toString() : '10'
		);
		urlSearchParams.set(
			'offset',
			pagination?.page && pagination?.perPage
				? ((pagination.page - 1) * pagination.perPage).toString()
				: '0'
		);

		return customFetchJson(`${apiURL}/${resource}?${urlSearchParams}`, options)
			.then(({ json, headers }) => ({
				data: json,
				total: headers.get('X-Total-Count')
					? parseInt(headers.get('X-Total-Count') as string)
					: undefined,
			}))
			.catch((error: Error) => {
				throw new Error(error.message);
			});
	},

	// getMany(resource, params) {
	//     const { ids, meta, signal } = params;

	//     console.log(params, resource);

	//     const options: Options = {};
	//     options.method = 'GET';

	//     const urlSearchParams = new URLSearchParams();

	//     urlSearchParams.set(`${resource}Id`, ids.join(','));

	//     return customFetchJson(
	//         `${apiURL}/${resource}?${urlSearchParams}`,
	//         options
	//     )
	//         .then(({ json, headers }) => ({
	//             data: json,
	//             total: headers.get('X-Total-Count')
	//                 ? parseInt(headers.get('X-Total-Count') as string)
	//                 : undefined,
	//         }))
	//         .catch((error: Error) => {
	//             throw new Error(error.message);
	//         });
	// },
	getMany: restDataProvider.getMany,
	getOne: restDataProvider.getOne,
	getManyReference: restDataProvider.getManyReference,
	updateMany: restDataProvider.updateMany,
	// getList: restDataProvider.getList,
	// delete: restDataProvider.delete,
	// "deleteMany": restDataProvider.deleteMany,
};
