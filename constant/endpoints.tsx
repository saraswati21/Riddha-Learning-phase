import ChangePasswordPage from '@/components/changePassword';
import { profile } from 'console';

export const BASEURL = process.env.NEXT_PUBLIC_HOST;

// export const endpoints = {
// itemLists: {
//  list: BASEURL + '/api/Config/StoreRoom/List',
//             api: BASEURL + "/api/Config/StoreRoom",
//             delete: (id: string | number) => BASEURL + `/api/Config/StoreRoom?id=${id}`,
// }
// }

export const endpoints = {
	login: BASEURL + '/api/auth/login',
	register: BASEURL + '/api/auth/register',
	forgot: BASEURL + '/api/auth/forgot-password',
	resetpassword: BASEURL + '/api/auth/reset-password',
	users: BASEURL + '/api/users',
	profile: BASEURL + '/api/users/profile',
	ChangePassword: BASEURL + '/api/users/change-password',
};
