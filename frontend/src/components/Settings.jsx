import React, { useState } from 'react'
import SideBar from './SideBar'
import { UpdateProfile } from './UpdateProfile'
import { useDeleteUser } from '../hooks/user'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { ColorRing } from 'react-loader-spinner'

const Settings = () => {
	const navigate = useNavigate();
	const { deleteUser, loading: userLoading, error } = useDeleteUser();
	//
	const handleDelete = async () => {
		const userId = JSON.parse(localStorage.getItem("user")).userId;
		try {
			await deleteUser(userId);
			localStorage.clear();
			toast.success("Account deleted successfully");
			navigate('/');
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<div className='flex h-screen  py-5 px-5 gap-5 bg-slate-200'>
			<Toaster />
			<SideBar />
			<div className='w-full h-auto overflow-y-scroll  flex flex-col gap-7 bg-white rounded-3xl py-8 px-8'>
				<h2 className="text-3xl py-5 font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-[#ff6b6b] via-[#ffa500] to-[#8b008b] bg-clip-text text-transparent">
					Actions
				</h2>
				<UpdateProfile />
				<div className='flex flex-col items-center gap-4 md:gap-9 bg-red-100 rounded-2xl border-2 border-red-900 w-[100%] lg:w-[43%]  py-4 px-8'>
					<h2 className='text-xl relative right-16 md:right-24 lg:right-36 font-semibold text-red-900'>Danger Zone</h2>
					<span onClick={handleDelete} className='text-base flex items-center justify-around  py-2 w-[55%] lg:w-[40%] cursor-pointer hover:bg-red-600 text-center border-2 border-red-500 rounded-2xl bg-white font-semibold text-red-600 hover:text-white'>  {userLoading == <ColorRing
						visible={true}
						height="40"
						width="40"
						ariaLabel="color-ring-loading"
						wrapperStyle={{}}
						wrapperClass="color-ring-wrapper"
						colors={['#428fy', '#428fy', '#428fy', '#428fy', '#428fy']}
					/>} Delete Account</span>
					<div className='flex  gap-2 font-semibold'>
						<span className='text-red-900'>Note:-</span>
						<div className='flex flex-col items-start gap-1 '>
							<span className='text-red-900'>This action is irreversible</span>
							<span className='text-red-900'>This  will delete all the data associated with your account in our Database</span>
							<span className='text-red-900 hidden md:block'>You will no longer be able to access your account</span>

						</div>
					</div>
				</div>

			</div>
		</div>
	)
}

export default Settings