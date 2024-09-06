import { useCurrentUser } from "../hooks/user.js"
export const Appbar = () => {
    const { user, loading, error } = useCurrentUser();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const firstName = user?.firstName || '';
    const firstChar = firstName.length > 0 ? firstName[0].toUpperCase() : '';

    return (
        <div className="shadow h-14 flex justify-between">
            <div className="flex flex-col justify-center h-full ml-4">
                PayTM App
            </div>
            <div className="flex">
                <div className="flex flex-col justify-center h-full mr-4">
                    Hello {firstName}
                </div>
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {firstChar}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Appbar;