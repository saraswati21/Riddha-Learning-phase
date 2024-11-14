'use client';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CrudForm } from '@/hooksapi/crudHooks';
import { getToken, setToken } from '@/utils/utilities';
import { endpoints } from '@/constant/endpoints';

interface UserInterface {
	id: string;
	first_name: string;
	last_name: string;
	address: string;
	contact_number: string;
	email: string;
	password: string;
}
export const AddEditModal = () => {
	const [users, setUsers] = useState<UserInterface[]>([]);
	const [showModal, setShowModal] = useState(false);
	const [mode, setMode] = useState('add');

	const router = useRouter();

	const toggleModal = () => {
		setShowModal(!showModal);
	};

	const AddUserSchema = Yup.object().shape({
		first_name: Yup.string()
			.matches(/^[a-zA-Z\s]+$/, 'Invalid first name format')
			.required('First name is required'),

		last_name: Yup.string()
			.matches(/^[a-zA-Z\s]+$/, 'Invalid last name format')
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

		password: Yup.string()
			.min(6, 'Password must be at least 6 characters')
			.required('Password is required'),
	});

	const initialValues = {
		id: '',
		first_name: '',
		last_name: '',
		address: '',
		contact_number: '',
		email: '',
		password: '',
	};
	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: AddUserSchema,
		onSubmit: async (values) => {
			try {
				const response = await fetch(endpoints.users, {
					method: 'POST',
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
					setShowModal(false);
				} else {
					console.error('Failed to fetch users:');
				}
			} catch (error) {
				console.error('Error fetching users:', error);
			}

			setShowModal(false);
		},
	});

	return (
		<>
			<div className='text-right'>
				<button
					onClick={() => {
						toggleModal();
						setMode('add');
					}}
					className='btn btn-primary mt-5 text-center '
				>
					{mode === 'add' ? 'Add New User' : 'Edit User'}
				</button>
				{showModal && (
					<div className='fixed inset-0 flex items-center justify-center z-10'>
						<div className='bg-white p-6 rounded-lg shadow-xl w-full max-w-md'>
							<h2 className='text-xl font-bold mb-4 mt-4 text-center text-black'>
								{mode === 'add' ? 'Add New User' : 'Edit User'}
							</h2>
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
									{formik.touched.contact_number &&
									formik.errors.contact_number ? (
										<p className='text-red-600'>
											{formik.errors.contact_number}
										</p>
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
								<div className='mb-4'>
									<input
										type='text'
										name='password'
										className='border rounded w-full py-2 px-3 text-white'
										value={formik.values?.password}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										placeholder='Enter User password'
									/>
									{formik.touched.password && formik.errors.password ? (
										<p className='text-red-600'>{formik.errors.password}</p>
									) : null}
								</div>
								<div className='flex justify-between'>
									<button
										type='button'
										className='btn btn-secondary'
										onClick={toggleModal}
									>
										Cancel
									</button>
									<button
										type='submit'
										className='btn btn-primary'
									>
										{mode === 'add' ? 'Add User' : 'Save Changes'}
									</button>
								</div>
							</form>
						</div>
					</div>
				)}
			</div>
		</>
	);
};
