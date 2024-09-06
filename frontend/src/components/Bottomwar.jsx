import { Link } from 'react-router-dom'


export function BottomWarning({ label, buttonText, to }) {
    return <div className="text-sm flex justify-center py-5">
        <div>
            {label}
        </div>
        <Link to={to} className="cursor-pointer pl-1 underline">
            {buttonText}
        </Link>
    </div>
}