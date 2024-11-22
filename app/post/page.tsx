'use client';
import { endpoints } from '@/constant/endpoints';
import { timeAgoOrAfter } from '@/utils/prettyDate';
import { getToken } from '@/utils/utilities';
import Image from 'next/image';
import { title } from 'process';
import React, { useEffect, useState } from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import { LuMessageCircle } from 'react-icons/lu';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
interface PostData {
	_id: string;
	title: string;
	author: Author;
	image: string;
	created_at: string;
	comment_count: number;
	reaction_count: number;
	likes: number;
	comments: Comment[];
}

interface Author {
	_id: string;
	first_name: string;
	last_name: string;
}

const Post = () => {
	const [posts, setPosts] = useState<PostData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const initialValues = {
		title: '',
		content: '',
		image: '',
	};
	const CreatePostSchema = Yup.object().shape({
		title: Yup.string()
			.matches(
				/^[a-zA-Z\s]+$/,
				'Title should only contain alphabets and spaces'
			)
			.required('Title is required'),

		content: Yup.string()
			.min(20, 'Content should be at least 20 characters long')
			.required('Content is required'),

		image: Yup.string()
			.url('Image should be a valid URL')
			.required('Image is required'),
		// image: Yup.mixed()
		// 	.required('Image is required')
		// 	.test(
		// 		'fileType',
		// 		'Unsupported file format. Only PNG and JPG are allowed.',
		// 		(value) => {
		// 			if (!value) return false; // If no file is uploaded
		// 			return ['image/png', 'image/jpeg', 'image/jpg'].includes(value.type); // Validate file type
		// 		}
		// 	)
		// 	.test('fileSize', 'File size too large. Max 2MB allowed.', (value) => {
		// 		if (!value) return false; // If no file is uploaded
		// 		return value.size <= 2 * 1024 * 1024; // Check file size (2MB limit)
		// 	}),
	});

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: CreatePostSchema,
		onSubmit: async (values) => {
			try {
				const response = await fetch(endpoints.Post, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + getToken(),
					},
					body: JSON.stringify(values),
				});

				if (response.ok) {
					const data = await response.json();
					formik.resetForm();
					toast.success(data.message);
					fetchPost();
				} else {
					console.error('Failed to fetch posts:');
				}
			} catch (error: any) {
				console.error('Failed to fetch posts:', error);
			} finally {
				setLoading(false);
			}
		},
	});
	const fetchPost = async () => {
		try {
			const response = await fetch(endpoints.Post, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer' + getToken(),
				},
			});
			const data = await response.json();
			console.log(data);
			if (response.ok) {
				setPosts(data);
			} else {
				console.error('Failed to fetch posts:', data.message);
			}
		} catch (error: any) {
			console.error('Failed to fetch posts:', error);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchPost();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	// if (!posts) {
	// 	return <div>No posts data available.</div>;
	// }

	

	const handleLike = (postId: string) => {
		setPosts((prevPosts) =>
			prevPosts.map((post) =>
				post._id === postId ? { ...post, likes: post.likes + 1 } : post
			)
		);
	};

	const handleComments = () => { }
	
	return (
		<>
			<form onSubmit={formik.handleSubmit}>
				<div className='p-6 bg-gray-100 rounded shadow-md max-w-lg mx-auto my-2'>
					<div>
						<h3 className='font-bold text-black justify-start'>Create Post</h3>
					</div>
					<input
						type='text'
						name='title'
						value={formik.values?.title}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						placeholder='Type here'
						className='input input-bordered w-full  my-2'
					/>
					{formik.touched.title && formik.errors.title ? (
						<p className='text-red-600'>{formik.errors.title}</p>
					) : null}
					<textarea
						name='content'
						value={formik.values?.content}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						className='textarea textarea-bordered w-full my-2'
						placeholder='Bio'
					></textarea>
					{formik.touched.content && formik.errors.content ? (
						<p className='text-red-600'>{formik.errors.content}</p>
					) : null}
					<input
						type='text'
						name='image'
						value={formik.values?.image}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						placeholder='Type here'
						className='input input-bordered w-full  my-2'
					/>
					{formik.touched.image && formik.errors.image ? (
						<p className='text-red-600'>{formik.errors.image}</p>
					) : null}
					<button
						type='submit'
						className='btn btn-primary w-full'
					>
						Submit
					</button>
				</div>
			</form>
			{posts.map((post, index) => (
				<div
					key={index}
					className='p-6 bg-gray-100 rounded shadow-md max-w-lg mx-auto my-2'
				>
					<h3 className='text-lg text-black font-semibold'>
						{post.author.first_name + ' ' + post.author.last_name}
					</h3>
					<span className='text-sm text-black '>
						{timeAgoOrAfter(post.created_at)}
					</span>
					<p className='mt-2 text-xl text-black'>{post.title}</p>
					<Image
						src={post.image}
						alt='Post image'
						className='w-full h-auto mt-4 rounded'
						width={600}
						height={400}
					/>
					<div className='flex mt-4 justify-between w-100'>
						<span className='text-sm text-gray-700'>
							<span>❤️</span> {post.reaction_count}
						</span>
						<span className='text-sm text-gray-700'>
							{post.comment_count} comments
						</span>
					</div>
					<div className='flex justify-around mt-4'>
						<button
							className='text-center text-black w-1/2 hover:bg-slate-200 py-2'
							onClick={() => handleLike(post._id)}
						>
							<h4 className='inline-flex gap-2 font-medium text-black'>
								<AiOutlineLike className='h-5 w-5' />
								Like
							</h4>
							<span>{post.likes}</span>
						</button>
						<button
							className='text-center text-black w-1/2 hover:bg-slate-200 py-2'
							//onClick={() => handleComment(post._id, 'Nice post!')}
						>
							<h4 className='inline-flex gap-2 font-medium text-black'>
								<LuMessageCircle className='scale-x-[-1] h-5 w-5' />
								Comment
							</h4>
							{/* <span>{post.comments}</span> */}
						</button>
					</div>
				</div>
			))}
		</>
	);
};

export default Post;
