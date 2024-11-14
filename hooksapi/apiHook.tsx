/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useCallback, useReducer } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { getToken } from '@/utils/utilities';

/**
 * Use API Hook Props
 */
interface UseApiProps {
	method: 'get' | 'post';
	apiEndpoint: string;
	axiosConfig?: AxiosRequestConfig;
	payload?: any;
}

/**
 * Use API Hook Return Props
 */
export interface UseApiReturnProps {
	data: any;
	isLoading: boolean;
	error: any;
	refetch: () => void;
}

type State = { data: any; isLoading: boolean; error: any };

type Action =
	| { type: 'FETCH_START' }
	| { type: 'FETCH_SUCCESS'; payload: any }
	| { type: 'FETCH_ERROR'; payload: any }
	| { type: 'RESET' };

const initialState: State = { data: null, isLoading: true, error: null };

/**
 * Description
 * @param {State} state
 * @param {Action} action
 * @returns {any}
 */
const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'FETCH_START':
			return { ...state, isLoading: true, error: null };
		case 'FETCH_SUCCESS':
			return { ...state, isLoading: false, data: action.payload };
		case 'FETCH_ERROR':
			return { ...state, isLoading: false, error: action.payload };
		case 'RESET':
			return { ...initialState };
		default:
			throw new Error(`Unhandled action type`);
	}
};

const useApi = ({
	method,
	apiEndpoint,
	axiosConfig,
	payload,
}: UseApiProps): UseApiReturnProps => {
	const memoizedAxiosConfig = useMemo(() => axiosConfig, [axiosConfig]);
	const [state, dispatch] = useReducer(reducer, initialState);
	const token = typeof localStorage !== 'undefined' ? getToken() : null;
	const tokenValue: any = token;

	/**
	 * Fetch Intial Data
	 * @param {any} async
	 * @returns {any}
	 **/
	const fetchData = useCallback(async () => {
		dispatch({ type: 'FETCH_START' });
		try {
			const response = await axios.get(apiEndpoint, {
				headers: { Authorization: `Bearer ${tokenValue}` },
			});
			if (response.data.status === 1) {
				dispatch({ type: 'FETCH_SUCCESS', payload: response.data.data });
			} else {
				dispatch({ type: 'FETCH_ERROR', payload: response.data.message });
			}
		} catch (error: any) {
			// dispatch({ type: "FETCH_ERROR", payload: error });
		}
	}, [apiEndpoint]);

	/**
	 * Post Data
	 * @param {any} async(postdata
	 * @returns {any}
	 **/

	/**
	 * Refetch Data
	 * @param {any} (
	 * @returns {any}
	 **/
	const refetch = useCallback(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (
			method === 'get' &&
			!apiEndpoint.includes('undefined') &&
			!apiEndpoint.includes('null')
		) {
			fetchData();
		}
	}, [fetchData, method]);

	return { ...state, refetch };
};

export default useApi;

/**
 * Use ost Data returns Data and error objects from api post requests
 * @date 2023-04-10
 * @param {any} postdata:any
 * @param {any} apiEndpoint:string
 * @param {any} axiosConfig?:any
 * @returns {any}
 */
// create garni bela just json data matra xa bhani yo use - yesma photo video kei jadaina
export const usePostData = async (
	postdata: any,
	apiEndpoint: string,
	axiosConfig?: any
): Promise<any> => {
	const token = typeof localStorage !== 'undefined' ? getToken() : null;
	const tokenValue: any = token;
	try {
		const response = await axios.post(apiEndpoint, postdata, {
			headers: { Authorization: `Bearer ${tokenValue}` },
		});

		if (response.data.status === 1) {
			return {
				data: response.data.data,
				error: null,
				message: response.data.message,
			};
		}
		return { data: null, error: response.data.message };
	} catch (error) {
		return { data: null, error: error };
	}
};
// create garni bela  data with file xa bhani yo use - yesma photo video pani pathauna milxa
export const usePostFile = async (
	postdata: any,
	apiEndpoint: string
): Promise<any> => {
	const token = getToken();
	const tokenValue: any = token;
	try {
		const response = await axios.post(apiEndpoint, postdata, {
			headers: {
				Accept: 'application/json', // if you expect JSON response
				'Content-Type': 'multipart/form-data', // Make sure to set the content type for FormData
				Authorization: `Bearer ${tokenValue}`,
			},
		});
		if (response.data.status === 1) {
			return { data: response.data, error: null };
		}
		return { data: null, error: response.data.message };
	} catch (error: any) {
		return { data: null, error: error.message };
	}
};

// update garni bela with file(image, video) data update garnu xa bhani yo use
export const usePutFile = async (
	postdata: any,
	apiEndpoint: string
): Promise<any> => {
	const token = getToken();
	const tokenValue: any = token;
	try {
		const response = await axios.put(apiEndpoint, postdata, {
			headers: {
				Accept: 'application/json', // if you expect JSON response
				'Content-Type': 'multipart/form-data', // Make sure to set the content type for FormData
				Authorization: `Bearer ${tokenValue}`,
			},
		});
		if (response.data.status === 1) {
			return { data: response.data, error: null };
		}
		return { data: null, error: response.data.message };
	} catch (error: any) {
		return { data: null, error: error.message };
	}
};
// update garni bela without file(image, video) data update garnu xa bhani yo use

export const usePutData = async (
	postdata: any,
	apiEndpoint: string,
	axiosConfig?: any
): Promise<any> => {
	const token = typeof localStorage !== 'undefined' ? getToken() : null;
	const tokenValue: any = token;
	try {
		const response = await axios.put(apiEndpoint, postdata, {
			headers: { Authorization: `Bearer ${tokenValue}` },
		});
		if (response.data.status === 1) {
			return {
				data: response.data.data,
				error: null,
				message: response.data.message,
			};
		}
		return { data: null, error: response.data.message };
	} catch (error) {
		return { data: null, error: error };
	}
};
// delete garna yo use
export const useDeleteData = async (
	apiEndpoint: string,
	axiosConfig?: any
): Promise<any> => {
	const token = typeof localStorage !== 'undefined' ? getToken() : null;
	const tokenValue: any = token;
	try {
		const response = await axios.delete(apiEndpoint, {
			headers: { Authorization: `Bearer ${tokenValue}` },
		});
		if (response.data.status === 1) {
			if (response.data.data > 0) {
				return { data: true, error: null, message: response.data.message };
			} else {
				return { data: false, error: response.data.message };
			}
		}
		return { data: null, error: response.data.message };
	} catch (error) {
		return { data: null, error: error };
	}
};
// data get garna
export const useGetData = async (
	apiEndpoint: string,
	axiosConfig?: any
): Promise<any> => {
	const token = typeof localStorage !== 'undefined' ? getToken() : null;
	const tokenValue: any = token;
	try {
		const response = await axios.get(apiEndpoint, {
			headers: { Authorization: `Bearer ${tokenValue}` },
		});
		if (response.data.status === 1) {
			return {
				data: response.data.data,
				error: null,
				message: response.data.message,
			};
		}
		return { data: null, error: response.data.message };
	} catch (error: any) {
		return { data: null, error: error };
	}
};
