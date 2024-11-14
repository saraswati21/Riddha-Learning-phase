import { endpoints } from '@/constant/endpoints';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
const ForgotPassword = ({
	setIsForgotPasswordVisible,
	setIsResetPasswordVisible,
}: {
	setIsForgotPasswordVisible: any;
	setIsResetPasswordVisible: any;
}) => {
	const [email, setEmail] = useState('');

	const initialValues = {
		email: '',
	};

	const ForgotSchema = Yup.object().shape({
		email: Yup.string()
			.email('Invalid email format')
			.required('Email is required'),
	});

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: ForgotSchema,
		onSubmit: async (values) => {
			try {
				const response = await fetch(endpoints.forgot, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(values),
				});

				if (response.ok) {
					const data = await response.json();
					console.log(data);
					toast.success(data.message);
					setIsForgotPasswordVisible(false);
					setIsResetPasswordVisible(true);
				} else {
					const { error } = await response.json();
					toast.error(error || 'Failed to send reset link.');
				}
			} catch (error) {
				toast.error('An error occurred, please try again later.');
			}
		},
	});

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
					<div className='form-control mt-4'>
						<button
							type='submit'
							className='btn btn-primary'
						>
							Send Reset Link
						</button>
					</div>
				</form>
			</div>
		</>
	);
};
export default ForgotPassword;
