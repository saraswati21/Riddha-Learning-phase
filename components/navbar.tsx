import { removeToken } from '@/utils/utilities';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

export const Navbar = () => {
	const router = useRouter();
	const handleLogout = () => {
		removeToken();
		router.push('/login');
	};
	return (
		<>
			<div className='navbar bg-black'>
				<div className='flex-1'>
					<Link
						href={'/'}
						className=' text-xl font-bold'
					>
						LOGO
					</Link>
				</div>
				<div className='flex-none gap-2'>
					<div className='form-control'>
						<input
							type='text'
							placeholder='Search'
							className='input input-bordered  w-24 md:w-auto'
						/>
					</div>
					<div className='dropdown dropdown-end'>
						<div
							tabIndex={0}
							role='button'
							className='btn btn-ghost btn-circle avatar'
						>
							<div className='w-10 rounded-full '>
								<Image
									alt='Tailwind CSS Navbar component'
									src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
									width={10}
									height={15}
								/>
							</div>
						</div>
						<ul
							tabIndex={0}
							className='menu menu-sm dropdown-content text-white bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'
						>
							<li>
								<a
									href='/profile'
									className='justify-between'
								>
									Profile
								</a>
							</li>

							<li>
								<button onClick={handleLogout}>Logout</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};
