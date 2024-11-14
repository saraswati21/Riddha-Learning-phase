import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CrudForm } from '@/hooksapi/crudHooks';
import { getToken, setToken } from '@/utils/utilities';
import { endpoints } from '@/constant/endpoints';
import { toast } from 'react-toastify';
interface UserInterface {
	_id: string;
	first_name: string;
	last_name: string;
	address: string;
	contact_number: string;
	email: string;
}
const EditModal = ({
	user,
	setIsEditModalOpen,
	onSave,
}: {
	user: UserInterface;
	setIsEditModalOpen: any;
	onSave: any;
}) => {
	const router = useRouter();

	const EditUserSchema = Yup.object().shape({
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

	const initialValues = user;

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: EditUserSchema,
		onSubmit: async (values) => {
			try {
				const response = await fetch(endpoints.users + '/' + user._id, {
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
				toast.success('Edit User successfully');
			} catch (error) {
				console.error('Error fetching users:', error);
			}

			setIsEditModalOpen(false);
		},
	});
	console.log(formik.errors);
	return (
		<>
			<div className='fixed inset-0 flex items-center justify-center z-10'>
				<div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
					<h2 className='text-xl font-bold mb-4 mt-4 text-black'>Edit User</h2>
					<form onSubmit={formik.handleSubmit}>
						<div className='mb-4'>
							<input
								type='text'
								name='first_name'
								value={formik.values?.first_name}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								className='border rounded w-full py-2 px-3 text-white'
								placeholder='Enter User first name'
							/>
							{formik.touched.first_name && formik.errors.first_name ? (
								<p className='text-red-600'>{formik.errors.first_name}</p>
							) : null}
						</div>

						<div className='mb-4'>
							<input
								type='text'
								name='last_name'
								value={formik.values?.last_name}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								className='border rounded w-full py-2 px-3 text-white'
								placeholder='Enter User Last name'
							/>
							{formik.touched.last_name && formik.errors.last_name ? (
								<p className='text-red-600'>{formik.errors.last_name}</p>
							) : null}
						</div>

						<div className='mb-4'>
							<input
								type='text'
								name='address'
								className='border rounded w-full py-2 px-3 text-white'
								value={formik.values?.address}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								placeholder='Enter User Address'
							/>
							{formik.touched.address && formik.errors.address ? (
								<p className='text-red-600'>{formik.errors.address}</p>
							) : null}
						</div>
						<div className='mb-4'>
							<input
								type='text'
								name='contact_number'
								className='border rounded w-full py-2 px-3 text-white'
								value={formik.values?.contact_number}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								placeholder='Enter User contact number'
							/>
							{formik.touched.contact_number && formik.errors.contact_number ? (
								<p className='text-red-600'>{formik.errors.contact_number}</p>
							) : null}
						</div>
						<div className='mb-4'>
							<input
								type='text'
								name='email'
								className='border rounded w-full py-2 px-3 text-white'
								value={formik.values?.email}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								placeholder='Enter User email'
							/>
							{formik.touched.email && formik.errors.email ? (
								<p className='text-red-600'>{formik.errors.email}</p>
							) : null}
						</div>

						<div className='flex justify-between'>
							<button
								type='button'
								className='btn btn-secondary'
								onClick={() => setIsEditModalOpen(false)}
							>
								Cancel
							</button>
							<button
								type='submit'
								className='btn btn-primary'
							>
								Update User
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};
export default EditModal;
