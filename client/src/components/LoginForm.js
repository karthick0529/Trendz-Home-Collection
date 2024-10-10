import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { auth } from "./firebase";
import { AppContext } from "../context/AppContext";

export const LoginForm = () => {
    // const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
    const {  setIsLoggedIn } = useContext(AppContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const loguser = await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in Successfully", loguser);
            setIsLoggedIn(true);
            alert("User logged in Successfully");
            window.location.href = "/";
        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen p-6 bg-gradient-to-br  text-white">
            <form onSubmit={submitHandler} className="flex flex-col bg-transparent p-8 shadow-lg w-full max-w-md rounded-lg space-y-6">
                <div className="flex flex-col space-y-2">
                    <label className="text-lg font-semibold text-start">Email</label>
                    <input
                        className="border text-gray-900 border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        type="email"
                        placeholder="Enter Your Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-lg font-semibold text-start">Password</label>
                    <input
                        className="border text-gray-900 border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        type="password"
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-br from-gray-900 to-black text-white rounded-md font-bold hover:opacity-80 transition duration-300"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
