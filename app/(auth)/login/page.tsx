// 'use client';
// import * as Yup from 'yup';

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { CrudForm } from '@/hooksapi/crudHooks';
// import { removeToken, setToken } from '@/utils/utilities';
// import { endpoints } from '@/constant/endpoints';
// import ForgotPassword from '@/components/forgot-password';
// import { toast } from 'react-toastify';
// import ResetPassword from '@/components/reset-password';
// import Link from 'next/link';
// import { Formik, FormikHelpers, FormikValues } from 'formik';

// const Modal = ({
// 	isOpen,
// 	onClose,
// 	children,
// }: {
// 	isOpen: any;
// 	onClose: any;
// 	children: any;
// }) => {
// 	if (!isOpen) return null;

// 	return (
// 		<div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
// 			<div className='bg-white rounded-lg p-5 w-full max-w-lg shadow-lg relative'>
// 				<button
// 					onClick={onClose}
// 					className='absolute top-2 right-2  text-2xl'
// 				>
// 					&times;
// 				</button>
// 				{children}
// 			</div>
// 		</div>
// 	);
// };

// const LoginPage = () => {
// 	const { add } = CrudForm();
// 	const [email, setEmail] = useState('');
// 	const [password, setPassword] = useState('');
// 	const [error, setError] = useState('');
// 	const [isForgotPasswordVisible, setIsForgotPasswordVisible] = useState(false);
// 	const [isResetPasswordVisible, setIsResetPasswordVisible] = useState(false);
// 	const router = useRouter();

// 	const LoginSchema = Yup.object().shape({
// 		email: Yup.string()
// 			.email('Invalid email format')
// 			.required('Email is required'),
// 		password: Yup.string()
// 			.min(6, 'Password must be at least 6 characters')
// 			.required('Password is required'),
// 	});

// 	const initialValues = {
// 		email: '',
// 		password: '',
// 	};
// 	const handleSubmit = async (e: any) => {
// 		e.preventDefault();
// 		try {
// 			const response = await fetch(endpoints.login, {
// 				method: 'POST',
// 				headers: { 'Content-Type': 'application/json' },
// 				body: JSON.stringify({ email, password }),
// 			});

// 			if (response.ok) {
// 				const data = await response.json();
// 				console.log('Login successfully:', data);
// 				toast.success(data.message);
// 				setToken(data.data.token);
// 				router.push('/');
// 			} else {
// 				setError('Invalid login credentials');
// 			}
// 		} catch (error) {
// 			setError('Something went wrong. Please try again.');
// 		}
// 	};

// 	return (
// 		<>
// 			<div className='hero bg-base-1000 min-h-screen'>
// 				<div className='hero-content flex-col lg:flex-row-reverse'>
// 					<div className='text-center lg:text-left'>
// 						<h1 className='text-5xl font-bold'>Login now!</h1>
// 						<p className='py-6'>
// 							Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
// 							excepturi exercitationem quasi. In deleniti eaque aut repudiandae
// 							et a id nisi.
// 						</p>
// 					</div>
// 					<div className='card bg-white w-full max-w-lg shrink-0 '>
// 						<form
// 							className='card-body'
// 							onSubmit={handleSubmit}
// 						>
// 							<div className='form-control text-white'>
// 								<label className='label'>
// 									<span className='label-text text-black'>Email</span>
// 								</label>
// 								<input
// 									type='email'
// 									placeholder='email'
// 									className='input input-bordered'
// 									value={email}
// 									onChange={(e) => setEmail(e.target.value)}
// 									required
// 								/>
// 							</div>
// 							<div className='form-control text-white'>
// 								<label className='label'>
// 									<span className='label-text text-black'>Password</span>
// 								</label>
// 								<input
// 									type='password'
// 									placeholder='password'
// 									className='input input-bordered '
// 									value={password}
// 									onChange={(e) => setPassword(e.target.value)}
// 									required
// 								/>
// 								<div className='card bg-white w-full max-w-lg shrink-0 '>
// 									<a
// 										href='#'
// 										onClick={() => setIsForgotPasswordVisible(true)}
// 										className='label-text-alt link link-hover text-black font-bold mt-5'
// 									>
// 										Forgot password?
// 									</a>
// 								</div>
// 							</div>
// 							{error && <p className='text-red-500'>{error}</p>}
// 							<div className='form-control mt-6'>
// 								<button className='btn btn-primary'>Login</button>
// 							</div>
// 						</form>
// 						<div className='text-center text-black font-bold'>
// 							-----------------OR-----------------
// 						</div>
// 						<div className='card-body'>
// 							<div className='form-control '>
// 								<Link
// 									href={'/register'}
// 									className='btn btn-accent'
// 								>
// 									Register
// 								</Link>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>

// 			<Modal
// 				isOpen={isForgotPasswordVisible}
// 				onClose={() => setIsForgotPasswordVisible(false)}
// 			>
// 				<ForgotPassword
// 					setIsForgotPasswordVisible={setIsForgotPasswordVisible}
// 					setIsResetPasswordVisible={setIsResetPasswordVisible}
// 				/>
// 			</Modal>
// 			<Modal
// 				isOpen={isResetPasswordVisible}
// 				onClose={() => setIsResetPasswordVisible(false)}
// 			>
// 				<ResetPassword setIsResetPasswordVisible={setIsResetPasswordVisible} />
// 			</Modal>
// 		</>
// 	);
// };

// export default LoginPage;

'use client';
import * as Yup from 'yup';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CrudForm } from '@/hooksapi/crudHooks';
import { removeToken, setToken } from '@/utils/utilities';
import { endpoints } from '@/constant/endpoints';
import ForgotPassword from '@/components/forgot-password';
import { toast } from 'react-toastify';
import ResetPassword from '@/components/reset-password';
import Link from 'next/link';
import { ErrorMessage, Formik, useFormik } from 'formik';

const Modal = ({
	isOpen,
	onClose,
	children,
}: {
	isOpen: any;
	onClose: any;
	children: any;
}) => {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
			<div className='bg-white rounded-lg p-5 w-full max-w-lg shadow-lg relative'>
				<button
					onClick={onClose}
					className='absolute top-2 right-2  text-2xl'
				>
					&times;
				</button>
				{children}
			</div>
		</div>
	);
};

const LoginPage = () => {
	const { add } = CrudForm();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isSubmitting, setSubmitting] = useState(false);
	const [isForgotPasswordVisible, setIsForgotPasswordVisible] = useState(false);
	const [isResetPasswordVisible, setIsResetPasswordVisible] = useState(false);
	const router = useRouter();

	const LoginSchema = Yup.object().shape({
		email: Yup.string()
			.email('Invalid email format')
			.required('Email is required'),
		password: Yup.string()
			.min(6, 'Password must be at least 6 characters')
			.required('Password is required'),
	});

	const initialValues = {
		email: '',
		password: '',
	};

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: LoginSchema,
		onSubmit: async (values) => {
			try {
				const response = await fetch(endpoints.login, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(values),
				});

				if (response.ok) {
					const data = await response.json();
					console.log('Login successfully:', data);
					toast.success(data.message);
					setToken(data.data.token);
					router.push('/');
				} else {
					setError('Invalid login credentials');
				}
			} catch (error) {
				setError('Something went wrong. Please try again.');
			} finally {
				setSubmitting(false);
			}
			
		},
	});
	//console.log(formik.errors);
	return (
		<>
			<div className='hero bg-base-1000 min-h-screen'>
				<div className='hero-content flex-col lg:flex-row-reverse'>
					<div className='text-center lg:text-left'>
						<h1 className='text-5xl font-bold'>Login now!</h1>
						<p className='py-6'>
							Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
							excepturi exercitationem quasi. In deleniti eaque aut repudiandae
							et a id nisi.
						</p>
					</div>
					<div className='card bg-white w-full max-w-lg shrink-0 '>
						<form
							className='card-body'
							onSubmit={formik.handleSubmit}
						>
							<div className='form-control text-white'>
								<label className='label'>
									<span className='label-text text-black'>Email</span>
								</label>
								<input
									type='text'
									name='email'
									placeholder='email'
									className='input input-bordered'
									value={formik.values?.email}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
								{formik.touched.email && formik.errors.email ? (
									<p className='text-red-600'>{formik.errors.email}</p>
								) : null}
							</div>
							<div className='form-control text-white'>
								<label className='label'>
									<span className='label-text text-black'>Password</span>
								</label>
								<input
									type='password'
									name='password'
									placeholder='password'
									className='input input-bordered '
									value={formik.values?.password}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
								{formik.touched.password && formik.errors.password ? (
									<p className='text-red-600'>{formik.errors.password}</p>
								) : null}
								<div className='card bg-white w-full max-w-lg shrink-0 '>
									<a
										href='#'
										onClick={() => setIsForgotPasswordVisible(true)}
										className='label-text-alt link link-hover text-black font-bold mt-5'
									>
										Forgot password?
									</a>
								</div>
							</div>
							{error && <p className='text-red-500'>{error}</p>}
							<div className='form-control mt-6'>
								<button
									type='submit'
									className='btn btn-primary'
								>
									Login
								</button>
							</div>
						</form>

						<div className='text-center text-black font-bold'>
							-----------------OR-----------------
						</div>
						<div className='card-body'>
							<div className='form-control '>
								<Link
									href={'/register'}
									className='btn btn-accent'
								>
									Register
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Modal
				isOpen={isForgotPasswordVisible}
				onClose={() => setIsForgotPasswordVisible(false)}
			>
				<ForgotPassword
					setIsForgotPasswordVisible={setIsForgotPasswordVisible}
					setIsResetPasswordVisible={setIsResetPasswordVisible}
				/>
			</Modal>
			<Modal
				isOpen={isResetPasswordVisible}
				onClose={() => setIsResetPasswordVisible(false)}
			>
				<ResetPassword setIsResetPasswordVisible={setIsResetPasswordVisible} />
			</Modal>
		</>
	);
};

export default LoginPage;
