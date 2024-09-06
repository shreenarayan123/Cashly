import { Users } from "./Users"

export const Balance = ({ value }) => {
        return <div className="flex flex-col gap-16  ">
                <div className=" w-full h-full" >
                        <h2 className="text-3xl pb-5 font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-[#ff6b6b] via-[#ffa500] to-[#8b008b] bg-clip-text text-transparent">
                                Your current Balance is
                        </h2>
                        <span className="text-6xl text-left  font-bold">₹ {value}</span>

                </div>
                <div className="flex flex-col">
                        <h2 className="text-3xl pb-5 font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-[#ff6b6b] via-[#ffa500] to-[#8b008b] bg-clip-text text-transparent">
                                Recent Activity
                        </h2>

                </div>
        </div>
}