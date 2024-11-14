'use client';
import ChangePasswordPage from '@/components/changePassword';
import { Navbar } from '@/components/navbar';
import ProfieModel from '@/components/profilemodel';
import { endpoints } from '@/constant/endpoints';
import { getToken } from '@/utils/utilities';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface UserInterface {
	_id: string;
	first_name: string;
	last_name: string;
	password: string;
	address: string;
	contact_number: string;
	email: string;
}
const ProfilePage = () => {
	const [isLoading, setLoading] = useState(false);
	const [modalOpen, setModalOpen] = useState(null);

	const [selectedUser, setSelectedUser] = useState<UserInterface | null>(null);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

	const [user, setUser] = useState<UserInterface>({
		_id: '',
		first_name: '',
		last_name: '',
		address: '',
		contact_number: '',
		email: '',
		password: '',
	});

	const formik = useFormik({
		initialValues: user,

		onSubmit: async (values) => {
			setLoading(true);
			try {
				const response = await fetch(endpoints.profile, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + getToken(),
					},
					body: JSON.stringify(values),
				});
				const result = await response.json();
				if (response.ok) {
					setUser(result);
					setModalOpen(null);
					console.log('Profile updated successfully');
				} else {
					console.error('Failed to update profile:', result.message);
				}
			} catch (error) {
				console.error('Error updating profile:', error);
			} finally {
				setLoading(false);
			}
		},
	});

	useEffect(() => {
		fetchUsers();
	}, []);
	const fetchUsers = async () => {
		try {
			const response = await fetch(endpoints.profile, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + getToken(),
				},
			});
			const data = await response.json();
			if (response.ok) {
				setUser(data);
				formik.setValues(data);
			} else {
				console.error('Failed to fetch users:', data.message);
			}
		} catch (error) {
			console.error('Error fetching users:', error);
		} finally {
			setLoading(false);
		}
	};
	console.log(user);

	const handleEdit = (user: UserInterface) => {
		setSelectedUser(user);
		setModalOpen('edit');
		setIsEditModalOpen(true);
	};

	const handleChangePassword = () => {
		setModalOpen('changePassword');
	};
	return (
		<>
			<Navbar />
			<div className='flex bg-black'>
				<div className=' flex-initial w-1/4 mx-auto p-4'>
					<div className='bg-white shadow-md rounded-lg p-6'>
						<div className='flex items-center space-x-4'>
							<div>
								<h1 className='text-2xl text-black font-semibold'>
									{user?.first_name}
								</h1>
								<p className='text-gray-600 font-semibold'>{user?.email}</p>
							</div>
						</div>
						<div className='mt-6'>
							<h2 className='text-xl text-black font-semibold'>
								Profile Details
							</h2>
							<p className='text-gray-800'>First Name: {user?.first_name}</p>
							<p className='text-gray-800'>Last Name: {user?.last_name}</p>
							<p className='text-gray-800'>Address: {user?.address}</p>
							<p className='text-gray-800'>
								Contact No: {user?.contact_number}
							</p>
							<p className='text-gray-800'>Email: {user?.email}</p>
						</div>
						<button
							type='button'
							onClick={() => handleEdit(user)}
							className='mt-4 bg-blue-500 text-white px-4 py-2 mr-5 rounded-md hover:bg-blue-600'
						>
							Edit Profile
						</button>
						<button
							type='button'
							onClick={handleChangePassword}
							className='mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
						>
							Change Password
						</button>
					</div>
				</div>

				{modalOpen === 'edit' && selectedUser && (
					<div className='flex-initial w-1/3 mx-auto p-4'>
						<button onClick={() => setModalOpen(null)}>&times;</button>
						<ProfieModel
							user={user}
							setIsEditModalOpen={() => setModalOpen(null)}
							onSave={fetchUsers}
						/>
					</div>
				)}

				{modalOpen === 'changePassword' && (
					<div className='flex-initial w-1/3 mx-auto p-4'>
						<button onClick={() => setModalOpen(null)}>&times;</button>
						<ChangePasswordPage />
					</div>
				)}
			</div>
		</>
	);
};

export default ProfilePage;
