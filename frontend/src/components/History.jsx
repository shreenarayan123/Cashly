import React from 'react'
import SideBar from './SideBar'
import AllTransactions from './AllTransactions'

const History = () => {
	return (
		<div className='flex h-screen py-10 px-5 gap-5 bg-slate-200'>
			<SideBar />
			<div className='w-full  bg-white rounded-3xl  p-5 md:p-8'>
				<h2 className="text-3xl pb-5 font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-[#ff6b6b] via-[#ffa500] to-[#8b008b] bg-clip-text text-transparent">
					Activites
				</h2>
				<AllTransactions />
			</div>
		</div>
	)
}

export default History