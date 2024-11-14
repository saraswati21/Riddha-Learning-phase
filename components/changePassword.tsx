'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { endpoints } from '@/constant/endpoints';
import { getToken } from '@/utils/utilities';
import * as Yup from 'yup';
const ChangePasswordPage = () => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const initialValues = {
		oldPassword: '',
		newPassword: '',
		confirm_password: '',
	};
	const ChangePasswordSchema = Yup.object().shape({
		oldPassword: Yup.string()
			.min(6, 'Password must be at least 6 characters')
			.required('Current Password is required'),
		newPassword: Yup.string()
			.min(6, 'Password must be at least 6 characters')
			.required('New Password is required'),
		confirm_password: Yup.string()
			.oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
			.required('Confirm Password is required'),
	});

	const formik = useFormik({
		initialValues,
		validationSchema: ChangePasswordSchema,
		onSubmit: async (values) => {
			setLoading(true);

			try {
				const response = await fetch(endpoints.ChangePassword, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${getToken()}`,
					},
					body: JSON.stringify({
						oldPassword: values.oldPassword,
						newPassword: values.newPassword,
					}),
				});

				if (!response.ok) {
					const data = await response.json();
					throw new Error(data.message || 'Password Change failed');
				}

				toast.success('Password changed successfully!');
				router.push('/login');
			} catch (error: any) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		},
	});
	return (
		<div className='inset-0 flex items-center justify-center'>
			<div className='bg-white shadow-md w-full rounded-lg p-6 max-w-md'>
				<h1 className='text-2xl text-black font-bold'>Change Password</h1>

				<form onSubmit={formik.handleSubmit}>
					<div className='mb-4'>
						<label className='block text-gray-700'>Current Password</label>
						<input
							type='password'
							name='oldPassword'
							value={formik.values.oldPassword}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							className='border rounded w-full py-2 px-4'
						/>
						{formik.touched.oldPassword && formik.errors.oldPassword ? (
							<p className='text-red-600'>{formik.errors.oldPassword}</p>
						) : null}
					</div>
					<div className='mb-4'>
						<label className='block text-gray-700'>New Password</label>
						<input
							type='password'
							name='newPassword'
							value={formik.values.newPassword}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							className='border rounded w-full py-2 px-4'
						/>
						{formik.touched.newPassword && formik.errors.newPassword ? (
							<p className='text-red-600'>{formik.errors.newPassword}</p>
						) : null}
					</div>
					<div className='mb-4'>
						<label className='block text-gray-700'>Confirm New Password</label>
						<input
							type='password'
							name='confirm_password'
							value={formik.values.confirm_password}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							className='border rounded w-full py-2 px-4'
						/>
						{formik.touched.confirm_password &&
						formik.errors.confirm_password ? (
							<p className='text-red-600'>{formik.errors.confirm_password}</p>
						) : null}
					</div>
					<button
						type='submit'
						className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded-md ${
							loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
						}`}
						disabled={loading}
					>
						{loading ? 'Changing Password...' : 'Change Password'}
					</button>
				</form>
			</div>
		</div>
	);
};

export default ChangePasswordPage;
