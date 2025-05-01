import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { Button } from "./Button"
import axios from 'axios';
import { SendMoney } from "../pages/SendMoney";

export const Users = () => {

    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [recipient, setRecipient] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const currentUserId = JSON.parse(localStorage.getItem("user")).userId;

    useEffect(() => {

        async function fetchdata() {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/bulk?filter=` + filter)

            setUsers(res.data.user)
        }
        fetchdata();
    }, [filter])
    const filteredUsers = users.filter(user => user._id !== currentUserId);
    const handleModal = () => {
        setOpenModal(false);
        setRecipient({});
    }
    return <div className="flex flex-col w-full h-full">


        <div className="bg-gray-100 flex flex-col p-5 md:p-10 rounded-3xl h-[62vh] md:h-[57vh] overflow-y-hidden">
            <div className="font-bold   text-lg ">
                People
            </div>
            <div className="my-2 ">
                <input type="text" onChange={(e) => setFilter(e.target.value)} placeholder="Search users..." className="w-full px-3 py-2 border rounded-3xl border-slate-200"></input>
            </div>
            <div>
                <div className="overflow-y-scroll h-[45vh] md:h-[37vh]  pr-5">{filteredUsers.map((user, index) => <User key={index} user={user} setRecepient={setRecipient} setOpenModal={setOpenModal} />)}
                </div>
            </div>
            {openModal && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                <i onClick={handleModal} className="fa-solid fa-xmark absolute top-10 right-10 text-2xl cursor-pointer"></i>
                <div className="bg-white p-4 rounded-lg shadow-lg lg:w-1/3 w-1/2">
                    <SendMoney people={recipient} />
                </div>
            </div>}
        </div>
    </div>
}


function User({ user, setRecepient, setOpenModal }) {


    const sendRecipient = () => {
        setRecepient(user);
        setOpenModal(true);
    }
    return <div className="flex justify-between pt-5">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full md:text-xl text-sm">
                    {user.firstName[0].toUpperCase()}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col   justify-center ">
            <Button label={"Send Money"} onClick={sendRecipient} />
        </div>
    </div>
}