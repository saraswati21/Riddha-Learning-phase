'use client';
import React from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Formik, useFormik } from 'formik';
import { endpoints } from '@/constant/endpoints';
import { getToken } from '@/utils/utilities';
const AddPost = () => {
	const initialValues = {
		title: '',
		author: '',
		image: '',
	};
	const AddSchema = Yup.object({
		title: Yup.string().required('Title is required'),
		author: Yup.string().required('Author is required'),
		image: Yup.string().url('Invalid URL').required('Image URL is required'),
	});
	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: AddSchema,
		onSubmit: async (values) => {
			try {
				console.log('Endpoint:', endpoints.Post);
				const response = await fetch(endpoints.Post, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + getToken(),
					},
					body: JSON.stringify(values),
				});

				if (response.ok) {
					toast.success('Post added successfully!');
					
				} else {
					const errorData = await response.json();
					toast.error(errorData.message || 'Failed to add post');
				}
			} catch (error) {
				toast.error('An error occurred while adding the post');
			}
		},
	});

	return (
		<div className='max-w-md mx-auto mt-10'>
			<h1 className='text-2xl font-bold mb-4'>Add New Post</h1>

			<form
				onSubmit={formik.handleSubmit}
				className='space-y-4'
			>
				<div className='mb-4'>
					<input
						type='text'
						name='title'
						value={formik.values?.title}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						className='border rounded w-full py-2 px-3 text-white'
						placeholder='Enter User first name'
					/>
					{formik.touched.title && formik.errors.title ? (
						<p className='text-red-600'>{formik.errors.title}</p>
					) : null}
				</div>
				<div className='mb-4'>
					<input
						type='text'
						name='author'
						value={formik.values?.author}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						className='border rounded w-full py-2 px-3 text-white'
						placeholder='Enter User first name'
					/>
					{formik.touched.author && formik.errors.author ? (
						<p className='text-red-600'>{formik.errors.author}</p>
					) : null}
				</div>
				<div className='mb-4'>
					<input
						type='url'
						name='image'
						value={formik.values?.image}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						className='border rounded w-full py-2 px-3 text-white'
						placeholder='Enter User first name'
					/>
					{formik.touched.image && formik.errors.image ? (
						<p className='text-red-600'>{formik.errors.image}</p>
					) : null}
				</div>
				<button
					type='submit'
					className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
				>
					Add Post
				</button>
			</form>
		</div>
	);
};
export default AddPost;
