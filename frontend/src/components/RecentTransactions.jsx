import React from 'react'
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { useUserTransactions } from '../hooks/transaction';
import { useUser } from '../hooks/user';
import { formateDate } from './helper';
import { ColorRing } from 'react-loader-spinner'

const RecentTransactions = () => {

    const [currentUserId, setCurrentUserId] = useState(null);
    const { transactions, loading: transactionsLoading } = useUserTransactions();
// 
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.userId) {
            setCurrentUserId(user.userId);
        }
    }, []);

    if (transactionsLoading) {
        return <div className='w-full flex itmes-center justify-center '><ColorRing
        visible={true}
        height="200"
        width="100"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={['#4287f5', '#4287f5', '#4287f5', '#4287f5', '#4287f5']}
        /></div>;
    }

    if (!currentUserId) {
        return <div>User not found</div>;
    }
    return <>
        <div className='pt-6 w-[95%] flex flex-col items-center'>
            {
                transactions.length > 0 ?
                    <>
                        <div className='flex w-full px-7 py-4 rounded-xl bg-gray-200 items-center justify-between'>
                            <span className='font-semibold text-sm  text-slate-500'>PEOPLE</span>
                            <span className='font-semibold text-sm hidden lg:block md:block text-slate-500' text-slate-500>TRANSACTION ID</span>
                            <span className='font-semibold text-sm relative  text-slate-500'>TYPE</span>
                            <span className='font-semibold text-sm relative  md:left-12 left-6  text-slate-500'>STATUS</span>
                            <span className='font-semibold text-sm relative  text-slate-500'>AMOUNT</span>
                            <span className='font-semibold text-sm text-slate-500'>DATE</span>
                        </div>
                        <div className='h-[25.6vh] overflow-y-hidden w-full pb-3'>

                            { 
                            transactions.map((transaction, index) => <User key={index} transaction={transaction} currentUserId={currentUserId} />) 
                            }

                        </div>
                    </>
                    : <div className='text-center text-xl py-5 font-semibold text-black'>See when funds come in and go out. You can find your recent Cashly activity here.</div>
            }
            <Link to={"/History"}>
                <span className='text-lg  text-blue-700 hover:underline  hover:cursor-pointer'>See full transaction history</span>

            </Link>

        </div>
    </>

}


function User({ transaction, currentUserId }) {
    const { user, loading: userLoading } = useUser(transaction.receiverId);
    if (userLoading) {
        return <div role="status" class="max-w-full pt-3 animate-pulse">
        <div class="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
                
    </div>;
    }
    return (
        <div className="flex w-full border-b-2 pb-4  items-center justify-between pt-4">
            <div className="flex w-1/6">
                <div className="rounded-full  lg:h-12 lg:w-12 h-8 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full lg:text-xl text-base">
                        {user.firstName[0].toUpperCase()}
                    </div>
                </div>
                <div className="flex flex-col justify-center font-semibold overflow-hidden">
                    <div className="truncate w-24">
                        {user.firstName} {user.lastName[0]}.
                    </div>
                </div>
            </div>
            <p className='hidden lg:block md:block w-1/4 truncate'>{transaction._id}</p>
            <div className='w-1/6 text-center'>
                {transaction.receiverId === currentUserId ? (
                    <div className='text-green-700'>
                        <span className='bg-green-300 text-sm px-2 py-1 rounded-2xl border-green-700 border-2'>
                            <i className="fa-solid fa-arrow-down"></i>
                        </span> Received
                    </div>
                ) : (
                    <div className='text-red-700'>
                        <span className='bg-pink-300 text-sm px-2 py-1 rounded-2xl border-red-700 border-2'>
                            <i className="fa-solid fa-arrow-up"></i>
                        </span> Sent
                    </div>
                )}
            </div>
            <div className='w-1/6 text-center'>
                <span className='bg-green-200 font-semibold text-sm px-3 py-1 text-green-700 rounded-xl border-green-700 border-2'>
                    <i className="fa-solid fa-check"></i> Success
                </span>
            </div>
            <span className='w-1/12  font-bold text-right'>₹ {transaction.amount}</span>
            <span className='w-1/5 font-semibold text-right'>{formateDate(transaction.timestamp)}</span>
        </div>
    );
}
export default RecentTransactions




