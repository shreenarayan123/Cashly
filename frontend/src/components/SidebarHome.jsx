import React, { useState } from 'react'
import SideBar from '../components/SideBar'
import { Users } from './Users'
import { SendMoney } from '../pages/SendMoney'
import toast, { Toaster } from 'react-hot-toast'

const SidebarHome = () => {
	const [recipient, setRecipient] = useState({});
	const [openModal, setOpenModal] = useState(false);

	const user = JSON.parse(localStorage.getItem("user"));

	const handleModal = () => {
		setOpenModal(false);
		setRecipient({});
	}
	const handleCopyId = () => {
		navigator.clipboard.writeText(user.userId);
		toast.success("Copied to clipboard");
	}

	return (
		<div className='flex h-screen py-5 px-5 gap-5 bg-slate-200'>
			<Toaster />
			<SideBar />
			<div className='w-full bg-white rounded-3xl  p-5 md:p-8 flex flex-col md:gap-24'>

				<div className="flex items-center gap-24  lg:gap-48 ">
					<div className="flex flex-col md:flex-row items-center justify-between w-full">
						<div className='flex items-center gap-5'>
							<div className="rounded-full h-12 w-12 lg:w-16 lg:h-16  bg-slate-200 flex justify-center mt-1 mr-2">
								<div className="flex flex-col justify-center h-full text-xl lg:text-3xl">
									{user && user.firstname[0].toUpperCase()}
								</div>
							</div>
							<div className='flex flex-col'>
								<div className="flex flex-row items-center gap-4 justify-center ">

									<h2 className="text-3xl pb-5 pr-2 font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-[#ff6b6b] via-[#ffa500] to-[#8b008b] bg-clip-text text-transparent">
										Hey
									</h2>
									<span className='md:text-5xl text-3xl pb-5 font-bold'> {user.firstname[0].toUpperCase()}{user.firstname.substring(1)} </span>

								</div>
								<div onClick={handleCopyId} className='bg-gray-200 cursor-pointer  text-sm h-8 py-1 px-2 w-max rounded-xl'><span className='text-black font-semibold'>A/C id : </span>{user.userId.substring(0, 6)}.........{user.userId.substring(14)}</div>
							</div>
						</div>
						<div className="flex flex-row  items-center  justify-between  lg:bg-gradient-to-r from-gray-100 to-gray-200 w-full lg:w-[65%] px-6 py-4 rounded-3xl lg:shadow-md">
							<div className='hidden lg:block'>
								<p className="text-sm text-gray-700 italic">
									To initiate a transaction: Search recipient by name or enter account ID here
								</p>
							</div>
							<button
								onClick={() => setOpenModal(true)}
								className='flex items-center justify-center gap-2 py-3 px-6 w-auto lg:w-48 cursor-pointer bg-white hover:bg-blue-600 text-blue-600 hover:text-white font-semibold border-2 border-blue-500 rounded-2xl transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
							>
								<i className="fa-regular fa-paper-plane"></i>
								<span>Transfer funds</span>
							</button>

						</div>
						{openModal && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
							<i onClick={handleModal} className="fa-solid fa-xmark absolute top-10 right-10 text-2xl cursor-pointer"></i>
							<div className="bg-white p-4 rounded-lg shadow-lg w-1/2">
								<SendMoney people={recipient} />
							</div>
						</div>}

					</div>

				</div>
				<Users />

			</div>
		</div>
	)
}

export default SidebarHome