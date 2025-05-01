import { ColorRing } from "react-loader-spinner"

export function Button({ label, onClick, loading }) {
    return <button type="button" onClick={onClick} className="text-white w-full flex items-center gap-3 justify-center bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xs md:text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
        {loading == true && <ColorRing
						visible={true}
						height="40"
						width="40"
						ariaLabel="color-ring-loading"
						wrapperStyle={{}}
						wrapperClass="color-ring-wrapper"
						colors={['#428fy', '#428fy', '#428fy', '#428fy', '#428fy']}
					/>}
        {label}
        </button>

}