import { endpoints } from '@/constant/endpoints';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
const ResetPassword = ({
	setIsResetPasswordVisible,
}: {
	setIsResetPasswordVisible: any;
}) => {
	const [email, setEmail] = useState('');
	const [token, setToken] = useState('');
	const [password, setPassword] = useState('');

	const initialValues = {
		email: '',
		token: '',
		password: '',
	};

	const ResetSchema = Yup.object().shape({
		email: Yup.string()
			.email('Invalid email format')
			.required('Email is required'),

		token: Yup.string()
			.matches(/^[A-Za-z0-9]{6,}$/,'Invalid token format')
			.required('Token is required'),
		password: Yup.string()
			.min(6, 'Password must be at least 6 characters')
			.required('Password is required'),
	});
	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: ResetSchema,
		onSubmit: async (values) => {
			try {
				const response = await fetch(endpoints.resetpassword, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(values),
				});

				if (response.ok) {
					const data = await response.json();
					console.log(data);
					toast.success(data.message);
					setIsResetPasswordVisible(false);
				} else {
					const { error } = await response.json();
					toast.error(error || 'Failed to send reset link.');
				}
			} catch (error) {
				toast.error('An error occurred, please try again later.');
			}
		},
	});

	// const showResetPasswordForm = () => {
	// 	setIsResetPasswordVisible(true);
	// };
	return (
		<>
			<div className='card bg-base-100 w-full max-w-lg p-5'>
				<h2 className='text-2xl font-bold mb-4'>Reset Password</h2>
				<form onSubmit={formik.handleSubmit}>
					<div className='form-control'>
						<label className='label'>
							<span className='label-text'>Email</span>
						</label>
						<input
							type='email'
							name='email'
							placeholder='Enter your email'
							className='input input-bordered'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.email && formik.errors.email ? (
							<p className='text-red-600'>{formik.errors.email}</p>
						) : null}
					</div>
					<div className='form-control'>
						<label className='label'>
							<span className='label-text'>Token</span>
						</label>
						<input
							type='text'
							name='token'
							placeholder='Enter your token'
							className='input input-bordered'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.token && formik.errors.token ? (
							<p className='text-red-600'>{formik.errors.token}</p>
						) : null}
					</div>
					<div className='form-control'>
						<label className='label'>
							<span className='label-text'>Password</span>
						</label>
						<input
							type='password'
							name='password'
							placeholder='Enter your password'
							className='input input-bordered'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.password && formik.errors.password ? (
							<p className='text-red-600'>{formik.errors.password}</p>
						) : null}
					</div>
					<div className='form-control mt-4'>
						<button
							type='submit'
							className='btn btn-primary'
						>
							Reset Password
						</button>
					</div>
				</form>
			</div>
		</>
	);
};
export default ResetPassword;
