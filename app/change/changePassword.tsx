// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useFormik } from 'formik';
// import { toast } from 'react-toastify';
// import { endpoints } from '@/constant/endpoints';
// import { getToken } from '@/utils/utilities';

// const ChangePasswordPage = () => {
// 	const [loading, setLoading] = useState(false);
// 	const router = useRouter();

// 	const formik = useFormik({
// 		initialValues: {
// 			current_password: '',
// 			new_password: '',
// 			confirm_password: '',
// 		},
// 		onSubmit: async (values) => {
// 			if (values.new_password !== values.confirm_password) {
// 				toast.error("New passwords don't match.");
// 				return;
// 			}

// 			setLoading(true);
// 			try {
// 				const response = await fetch(endpoints.ChangePassword, {
// 					method: 'POST',
// 					headers: {
// 						'Content-Type': 'application/json',
// 						Authorization: `Bearer ` + getToken(),
// 					},
// 					body: JSON.stringify({
// 						current_password: values.current_password,
// 						new_password: values.new_password,
// 					}),
// 				});

// 				if (!response.ok) {
// 					const data = await response.json();
// 					throw new Error(data.message || 'Password change failed');
// 				}

// 				toast.success('Password changed successfully!');
// 				router.push('/profile');
// 			} catch (error: any) {
// 				toast.error(error.message);
// 			} finally {
// 				setLoading(false);
// 			}
// 		},
// 	});

// 	return (
// 		<div className='container w-1/3 mx-auto p-4'>
// 			<div className='bg-white shadow-md rounded-lg p-6'>
// 				<h1 className='text-2xl text-black font-semibold mb-6'>
// 					Change Password
// 				</h1>
// 				<form onSubmit={formik.handleSubmit}>
// 					<div className='mb-4'>
// 						<label className='block text-gray-700'>Current Password</label>
// 						<input
// 							type='password'
// 							name='current_password'
// 							value={formik.values?.current_password}
// 							onChange={formik.handleChange}
// 							className='border rounded w-full py-2 px-4'
// 						/>
// 					</div>
// 					<div className='mb-4'>
// 						<label className='block text-gray-700'>New Password</label>
// 						<input
// 							type='password'
// 							name='new_password'
// 							value={formik.values?.new_password}
// 							onChange={formik.handleChange}
// 							className='border rounded w-full py-2 px-4'
// 						/>
// 					</div>
// 					<div className='mb-4'>
// 						<label className='block text-gray-700'>Confirm New Password</label>
// 						<input
// 							type='password'
// 							name='confirm_password'
// 							value={formik.values?.confirm_password}
// 							onChange={formik.handleChange}
// 							className='border rounded w-full py-2 px-4'
// 						/>
// 					</div>
// 					<button
// 						type='submit'
// 						className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded-md ${
// 							loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
// 						}`}
// 						disabled={loading}
// 					>
// 						{loading ? 'Changing Password...' : 'Change Password'}
// 					</button>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };

// export default ChangePasswordPage;
