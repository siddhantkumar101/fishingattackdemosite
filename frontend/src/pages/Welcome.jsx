import { useLocation } from "react-router-dom";

export default function Welcome() {
    const location = useLocation();
    const { username } = location.state || {};

    return (
        <div className="min-h-screen bg-[#202124] flex items-center justify-center text-white">
            <h1 className="text-3xl sm:text-4xl font-semibold">
                Welcome <span className="text-blue-400">{username}</span>
            </h1>
        </div>
    );
}