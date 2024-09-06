import React from 'react'
import { Balance } from '../components/Balance.jsx'
import { useCurrentUser } from '../hooks/user.js'
import SideBar from '../components/SideBar.jsx'
import RecentTransactions from '../components/RecentTransactions.jsx'

const Dashboard = () => {

	const { account } = useCurrentUser();
	const balance = account?.balance ? parseFloat(account.balance) : 0;

	const formattedBalance = balance.toFixed(2);

	return (
		<div className='flex h-screen py-10 px-5 gap-5 bg-slate-200'>
			<SideBar />
			<div className='w-full  bg-white rounded-3xl py-8 px-8'>

				<Balance value={formattedBalance} />
				<RecentTransactions />
			</div>
		</div>
	)
}

export default Dashboard