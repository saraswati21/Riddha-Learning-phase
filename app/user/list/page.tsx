'use client';

import React, { useEffect, useState } from 'react';

import { AddEditModal } from '@/components/addeditmodal';
import { FaEdit, FaTrash } from 'react-icons/fa';

import { endpoints } from '@/constant/endpoints';
import { getToken } from '@/utils/utilities';
import EditModal from '@/components/editmodal';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
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
const UserList = () => {
	const [users, setUsers] = useState<UserInterface[]>([]);
	const [loading, setLoading] = useState(true);

	const [selectedUser, setSelectedUser] = useState<UserInterface | null>(null);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);

	const router = useRouter();

	useEffect(() => {
		const token = getToken();
		if (!token) {
			router.push('/login');
		} else {
			fetchUsers();
		}
	}, [router]);
	const fetchUsers = async () => {
		try {
			const response = await fetch(endpoints.users, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + getToken(),
				},
			});
			const data = await response.json();
			if (response.ok) {
				setUsers(data.data);
			} else {
				console.error('Failed to fetch users:', data.message);
			}
		} catch (error) {
			console.error('Error fetching users:', error);
		} finally {
			setLoading(false);
		}
	};
	const handleEdit = (user: UserInterface) => {
		setSelectedUser(user);
		setIsEditModalOpen(true);
	};

	const deleteUser = async (id: string) => {
		try {
			const response = await fetch(`${endpoints.users}/${id}`, {
				method: 'DELETE',
				headers: {
					Authorization: 'Bearer ' + getToken(),
				},
			});
			if (response.ok) {
				const data = await response.json();
				console.log(data);
				toast.success(data.message);
				setUsers(users.filter((user) => user._id !== id));
			} else {
				console.error('Failed to delete user');
			}
		} catch (error) {
			console.error('Error deleting user:', error);
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Navbar />
			<AddEditModal />

			<div className='overflow-x-auto bg-white text-black mt-5 rounded-2xl shadow-2xl'>
				<table className='table'>
					<thead>
						<tr className='text-black '>
							<th>SN</th>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Address</th>
							<th>Email</th>
							<th>Contact Number</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user: UserInterface, index: number) => (
							<tr
								className='bg-off-white rounded-2xl shadow-2xl text-black'
								key={user._id}
							>
								<td>{index + 1}</td>
								<td>{user.first_name}</td>
								<td>{user.last_name}</td>
								<td>{user.address}</td>
								<td>{user.email}</td>
								<td>{user.contact_number}</td>
								<td className=' '>
									<button
										type='button'
										onClick={() => handleEdit(user)}
									>
										<FaEdit className='text-blue-500  '></FaEdit>
									</button>
									<button
										type='button'
										onClick={() => deleteUser(user._id)}
										className='ml-4'
									>
										<FaTrash className='text-red-500'></FaTrash>
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{isEditModalOpen && selectedUser && (
				<EditModal
					user={selectedUser}
					setIsEditModalOpen={setIsEditModalOpen}
					onSave={fetchUsers}
				/>
			)}
		</>
	);
};
export default UserList;
