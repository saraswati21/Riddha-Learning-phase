'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { endpoints } from '@/constant/endpoints';
import { useRouter } from 'next/navigation';
import { CrudForm } from '@/hooksapi/crudHooks';

const Register = () => {
	const [isLoading, setLoading] = useState(false);
	const router = useRouter();
	const { add, get } = CrudForm();
	const initialValues = {
		first_name: '',
		last_name: '',
		address: '',
		contact_number: '',
		email: '',
		password: '',
	};

	const formik = useFormik({
		initialValues: initialValues,
		onSubmit: async (values) => {
			setLoading(true);
			await registerUser(values);
		},
	});
	const registerUser = async (values: any) => {
		try {
			const response = await fetch(endpoints.register, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			});

			if (response.ok) {
				const data = await response.json();
				console.log(data);
				toast.success(data.message);
				router.push('/login');
			} else {
				toast.error('Register Failed');
			}
		} catch (error) {
			toast.error('Something went wrong');
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-black'>
			<div className='w-full max-w-md p-8 bg-white rounded-xl shadow-xl'>
				<h1 className='text-3xl font-bold text-center text-black mb-6'>
					Create an Account
				</h1>
				<form onSubmit={formik.handleSubmit}>
					<div className='mb-4'>
						<input
							type='text'
							name='first_name'
							value={formik.values.first_name}
							onChange={formik.handleChange}
							className='border rounded w-full py-2 text-white px-4 text-gray-900'
							placeholder='First Name'
							disabled={isLoading}
						/>
					</div>
					<div className='mb-4'>
						<input
							type='text'
							name='last_name'
							value={formik.values.last_name}
							onChange={formik.handleChange}
							className='border rounded w-full py-2 text-white px-4 text-gray-900'
							placeholder='Last Name'
							disabled={isLoading}
						/>
					</div>
					<div className='mb-4'>
						<input
							type='text'
							name='address'
							value={formik.values.address}
							onChange={formik.handleChange}
							className='border rounded w-full py-2 text-white px-4 text-gray-900'
							placeholder='Address'
							disabled={isLoading}
						/>
					</div>
					<div className='mb-4'>
						<input
							type='text'
							name='contact_number'
							value={formik.values.contact_number}
							onChange={formik.handleChange}
							className='border rounded w-full py-2 text-white px-4 text-gray-900'
							placeholder='Contact Number'
							disabled={isLoading}
						/>
					</div>
					<div className='mb-4'>
						<input
							type='email'
							name='email'
							value={formik.values.email}
							onChange={formik.handleChange}
							className='border rounded w-full py-2 text-white px-4 text-gray-900'
							placeholder='Email'
							disabled={isLoading}
						/>
					</div>
					<div className='mb-4'>
						<input
							type='password'
							name='password'
							value={formik.values.password}
							onChange={formik.handleChange}
							className='border rounded w-full py-2 text-white px-4 text-gray-900'
							placeholder='Password'
							disabled={isLoading}
						/>
					</div>
					<button
						type='submit'
						className={`w-full py-2 px-4 bg-accent hover:bg-blue-400 mt-5 text-white font-bold rounded ${
							isLoading ? 'opacity-50 cursor-not-allowed' : ''
						}`}
						disabled={isLoading}
					>
						{isLoading ? 'Registering...' : 'Register'}
					</button>
				</form>
			</div>
		</div>
	);
};

export default Register;
