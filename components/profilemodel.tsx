import React from 'react';
import { endpoints } from '@/constant/endpoints';
import { getToken } from '@/utils/utilities';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
interface UserInterface {
	_id: string;
	first_name: string;
	last_name: string;
	password: string;
	address: string;
	contact_number: string;
	email: string;
}
const ProfileModel = ({
	user,
	setIsEditModalOpen,
	onSave,
}: {
	user: UserInterface;
	setIsEditModalOpen: any;
	onSave: any;
}) => {
	const router = useRouter();

	const initialValues = user;
	const [isLoading, setLoading] = useState(false);
	//const [user, setUser] = useState<UserInterface[]>([]);

	const EditProfileSchema = Yup.object().shape({
		first_name: Yup.string()
			.matches(/^[a-zA-Z\s]+$/, 'Invalid first name format')
			.required('First name is required'),

		last_name: Yup.string()
			.matches(/^[a-zA-Z\s.]+$/, 'Invalid last name format')
			.required('Last name is required'),

		address: Yup.string()
			.min(10, 'Address should be at least 10 characters')
			.required('Address is required'),

		contact_number: Yup.string()
			.matches(/^\d{10}$/, 'Invalid contact number format')
			.required('Contact number is required'),

		email: Yup.string()
			.email('Invalid email format')
			.required('Email is required'),
	});

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: EditProfileSchema,
		onSubmit: async (values) => {
			try {
				const response = await fetch(endpoints.profile, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + getToken(),
					},
					body: JSON.stringify(values),
				});

				if (response.ok) {
					const data = await response.json();
					console.log(data);
					toast.success(data.message);
					setIsEditModalOpen(false);
					onSave();
				} else {
					console.error('Failed to fetch users:');
				}
				toast.success('Edit Profile successfully!');
			} catch (error) {
				console.error('Error fetching users:', error);
			}

			setIsEditModalOpen(false);
			//setLoading(true);
			// await page(values);
		},
	});
	return (
		<>
			<div className='bg-white shadow-md rounded-lg p-6'>
				<h1 className='text-2xl text-black font-semibold mb-6'>Edit Profile</h1>
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
						{formik.touched.first_name && formik.errors.first_name ? (
							<p className='text-red-600'>{formik.errors.first_name}</p>
						) : null}
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
						{formik.touched.last_name && formik.errors.last_name ? (
							<p className='text-red-600'>{formik.errors.last_name}</p>
						) : null}
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
						{formik.touched.address && formik.errors.address ? (
							<p className='text-red-600'>{formik.errors.address}</p>
						) : null}
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
						{formik.touched.contact_number && formik.errors.contact_number ? (
							<p className='text-red-600'>{formik.errors.contact_number}</p>
						) : null}
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
						{formik.touched.email && formik.errors.email ? (
							<p className='text-red-600'>{formik.errors.email}</p>
						) : null}
					</div>

					<button
						type='submit'
						className={`w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 mt-5 text-white font-bold rounded ${
							isLoading ? 'opacity-50 cursor-not-allowed' : ''
						}`}
						disabled={isLoading}
					>
						{isLoading ? 'Updating...' : 'Update'}
					</button>
				</form>
			</div>
		</>
	);
};
export default ProfileModel;
