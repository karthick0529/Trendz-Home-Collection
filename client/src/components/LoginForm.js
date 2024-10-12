import React, { useContext, useState } from "react";
import { signInWithEmailAndPassword, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";
import { AppContext } from "../context/AppContext";
import { IoEye, IoEyeOff } from "react-icons/io5"; // Import icons

export const LoginForm = () => {
    const { setIsLoggedIn } = useContext(AppContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const provider = new GithubAuthProvider();

    const submitHandler = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const loguser = await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in Successfully", loguser);
            setIsLoggedIn(true);
            alert("User logged in Successfully");
            window.location.href = "/";
        } catch (error) {
            console.log(error.message);
            setError(error.message);
        }
    };

    const handleGitHubSignIn = async () => {
        setError('');
        try {
            const result = await signInWithPopup(auth, provider);
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log("GitHub User:", user);
            setIsLoggedIn(true);
            alert("User logged in with GitHub");
            window.location.href = "/";
        } catch (error) {
            // Improved error handling
            if (error.code === 'auth/popup-closed-by-user') {
                setError("The authentication popup was closed before completing the login.");
            } else if (error.code === 'auth/cancelled-popup-request') {
                setError("Popup request was cancelled. Please try again.");
            } else {
                console.error("GitHub Sign-In Error:", error);
                setError("GitHub Sign-In Error: " + error.message);
            }
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen p-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
            <form onSubmit={submitHandler} className="flex flex-col bg-white p-8 shadow-lg w-full max-w-md rounded-lg space-y-6">
                <h2 className="text-3xl font-bold text-center text-purple-500">Log In</h2>
                <div className="flex flex-col space-y-2">
                    <label className="text-lg font-semibold text-gray-700">Email</label>
                    <input
                        className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full text-gray-900" // Ensure text color is visible
                        type="email"
                        placeholder="Enter Your Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-lg font-semibold text-gray-700">Password</label>
                    <div className="relative">
                        <input
                            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full pr-10 text-gray-900" // Ensure text color is visible
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                        </button>
                    </div>
                </div>

                {error && <p className="text-red-600 text-sm">{error}</p>}
                
                <div className="flex flex-col">
                    <button
                        type="submit"
                        className="w-full py-3 bg-purple-600 text-white rounded-md font-bold hover:bg-purple-500 transition duration-300"
                    >
                        Login
                    </button>
                </div>

                <button
                    onClick={handleGitHubSignIn}
                    className="w-full py-3 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-500 transition duration-300"
                >
                    Login with GitHub
                </button>
            </form>
        </div>
    );
};
