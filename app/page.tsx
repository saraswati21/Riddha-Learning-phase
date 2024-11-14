// const Home = () => {
// 	return (
// 		<>
// 			<div className='bg-white text-black'>
// 				<h2>Landing Page</h2>
// 			</div>
// 		</>
// 	);
// };
// export default Home;
'use client';
import { Navbar } from '@/components/navbar';
import Link from 'next/link';
import router, { useRouter } from 'next/navigation';
import React from 'react';

const HomePage = () => {
	const router = useRouter();
	return (
		<div>
			<Navbar />
			<section className='bg-white text-black py-16 '>
				<div className='container mx-auto px-4 text-center '>
					<h1 className='text-4xl font-bold'>Welcome to Our Platform</h1>
					<p className='mt-4 mb-5 text-xl'>
						Build amazing experiences with our platform
					</p>
					<Link href={'/user/list'} className=' bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600'>
						Go to User List
					</Link>
				</div>
			</section>

			<section className='py-16 bg-white'>
				<div className='container mx-auto px-4 text-center'>
					<h2 className='text-3xl font-bold text-black'>Our Key Features</h2>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-8'>
						<div className='p-4 bg-gray-100 rounded-lg shadow-md'>
							<h3 className='text-xl font-semibold text-black'>Feature 1</h3>
							<p className='mt-2 text-gray-600'>
								Description of the first feature.
							</p>
						</div>
						<div className='p-4 bg-gray-100 rounded-lg shadow-md'>
							<h3 className='text-xl font-semibold text-black'>Feature 2</h3>
							<p className='mt-2 text-gray-600'>
								Description of the second feature.
							</p>
						</div>
						<div className='p-4 bg-gray-100 rounded-lg shadow-md'>
							<h3 className='text-xl font-semibold text-black'>Feature 3</h3>
							<p className='mt-2 text-gray-600'>
								Description of the third feature.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className='bg-white py-10'>
				<div className='container mx-auto px-4 text-center'>
					<h2 className='text-3xl font-bold text-black'>What Our Users Say</h2>
					<div className='mt-5'>
						<div className='bg-white p-6 '>
							<p className='text-gray-800 italic'>
								"This platform has helped us scale faster and better!"
							</p>
							<p className='mt-4 text-gray-600'>— Happy Customer</p>
						</div>
					</div>
				</div>
			</section>

			<section className='bg-blue-500 text-white py-16'>
				<div className='container mx-auto px-4 text-center'>
					<h2 className='text-3xl font-bold'>Join Us Today</h2>
					<p className='mt-4 text-lg'>
						Sign up now and start building your dream project.
					</p>
					<button
						className='mt-6 bg-white text-blue-500 px-6 py-3 rounded-lg hover:bg-gray-100'
						onClick={() => router.push('/register')}
					>
						Sign Up
					</button>
				</div>
			</section>
		</div>
	);
};

export default HomePage;
