
import axios from "axios";
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export const SendMoney = ({ people }) => {
    const [amount, setAmount] = useState('');
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState({});
    const [recipientName, setRecipientName] = useState('');
    const [error, setError] = useState(null);


    useEffect(() => {
        if (people && people.firstName) {
            setRecipientName(people.firstName);
            setUserId(people._id);
        } else {
            setRecipientName("");
        }
    }, [people]);


    useEffect(() => {
        // Check if userId length is 24 before making the backend call
        if (userId.length !== 24) {
            return;
        }

        async function fetchUserData() {

            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/${userId}`);
                setUser(res.data.user);
                setRecipientName(user.firstName);
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError(err);
                toast.error("Error fetching user data");
            }
        }

        fetchUserData();

    }, [userId]);


    const handleuserIdChange = (e) => {
        if (e.target.value.length !== 24) {
            toast.error("Invalid user ID");
            return;
        }
        setUserId(e.target.value);
    };


    const handleAmountChange = (e) => {
        const value = e.target.value;
        // Only allow non-negative numbers and restrict to two decimal places
        if (/^\d*\.?\d{0,2}$/.test(value) || value === '') {
            setAmount(value);
        }
    };
    const handleTransaction = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/account/transfer`, {
                to: userId,
                amount
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            toast.success(res.data.message);
            console.log(res, "response from send money");
        } catch (error) {
            console.log(error)
            toast.error(error.data.message);
        }

    }

    return (
        <div className="h-full mt-5 w-full flex">
            <Toaster />

            <div className="border flex flex-col md:flex-row h-min text-card-foreground p-6 w-full bg-white shadow-lg rounded-3xl">
                <div className="w-full md:w-1/2 pr-0 md:pr-6 mb-6 md:mb-0">
                    <div className='flex justify-between items-center w-full mb-6'>
                        {user.firstName && (
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                    <span className="text-2xl text-white">{user.firstName[0].toUpperCase()}</span>
                                </div>
                                <h3 className="text-2xl font-semibold">{user.firstName}</h3>
                            </div>
                        )}

                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="userId">
                                User ID
                            </label>
                            <input
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                id="userId"
                                type="text"
                                value={userId}
                                onChange={(e) => handleuserIdChange(e)}
                                placeholder="Enter people ID"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="amount">
                                Amount (in Rs)
                            </label>
                            <input
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                id="amount"
                                type="text"
                                inputMode="decimal"
                                value={amount}
                                onChange={handleAmountChange}
                                placeholder="Enter amount"
                            />
                        </div>
                        <button
                            onClick={handleTransaction}
                            className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                            Initiate Transfer
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}