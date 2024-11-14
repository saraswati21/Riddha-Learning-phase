import {
	useDeleteData,
	useGetData,
	usePostData,
	usePutData,
} from '@/hooksapi/apiHook';
import { removeToken } from '@/utils/utilities';

export const CrudForm = () => {
	const Add = async ({
		values,
		onSuccess,
		onError,
		endpoints,
	}: {
		values: any;
		onSuccess: any;
		onError?: any;
		endpoints?: any;
	}) => {
		const response = await usePostData(values, endpoints);
		const { data, error } = response;

		if (data) {
			onSuccess(data, response.message);
		} else {
			if (error?.response?.status === 401) {
				removeToken();
				window.location.href = '/login';
			}
			onError ? onError(error) : console.log(error);
		}
	};

	const Edit = async ({
		values,
		onSuccess,
		onError,
		endpoints,
	}: {
		values: any;
		onSuccess: any;
		onError?: any;
		endpoints?: any;
	}) => {
		const response = await usePutData(values, endpoints);
		const { data, error } = response;
		if (data) {
			onSuccess(data, response.message);
		} else {
			if (error?.response?.status === 401) {
				removeToken();
				window.location.href = '/login';
			}
			onError ? onError(error) : console.log(error);
		}
	};

	const Delete = async ({
		onSuccess,
		onError,
		endpoints,
	}: {
		onSuccess: any;
		onError?: any;
		endpoints?: any;
	}) => {
		const response = await useDeleteData(endpoints);
		const { data, error } = response;
		if (data) {
			onSuccess(data, response.message);
		} else {
			if (error?.response?.status === 401) {
				removeToken();
				window.location.href = '/login';
			}
			onError ? onError(error) : console.log(error);
		}
	};

	const Get = async ({
		onSuccess,
		onError,
		endpoints,
	}: {
		onSuccess: any;
		onError?: any;
		endpoints?: any;
	}) => {
		const response = await useGetData(endpoints);
		const { data, error } = response;
		if (data) {
			onSuccess(data);
		} else {
			if (error?.response?.status === 401) {
				removeToken();
				window.location.href = '/login';
			}
			onError ? onError(error) : console.log(error);
		}
	};

	return { add: Add, edit: Edit, deleteData: Delete, get: Get };
};
