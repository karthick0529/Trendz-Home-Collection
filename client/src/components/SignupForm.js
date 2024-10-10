import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const SignupForm = () => {
    const navigate = useNavigate();
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // const [ setConfirmPassword] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            console.log("User Signup", user);
            if (user) {
                await setDoc(doc(db, "Users", user.uid), {
                    email: user.email,
                    firstName: fname,
                    lastName: lname,
                    photo: ""
                });
            }
            console.log(confirmPassword)
            console.log("User Registered Successfully!!");
            alert("User Registered Successfully!!");
            navigate("/login");
        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen p-6 bg-gradient-to-br ">
            <form onSubmit={submitHandler} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg space-y-6">
                <div className="flex">
                    <div className="text-start">
                        <label className="text-lg font-semibold text-gray-700 mb-2">First Name</label>
                        <input
                            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                            type="text"
                            placeholder="Enter First Name"
                            onChange={(e) => setFname(e.target.value)}
                            required
                        />
                    </div>

                    <div className="text-start">
                        <label className="text-lg font-semibold text-gray-700 mb-2">Last Name</label>
                        <input
                            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                            type="text"
                            placeholder="Enter Last Name"
                            onChange={(e) => setLname(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="text-start">
                    <label className="text-lg font-semibold text-gray-700 mb-2">Email</label>
                    <input
                        className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                        type="email"
                        placeholder="Enter Your Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="flex space-x-5">
                    <div className="text-start">
                        <label className="text-lg font-semibold text-gray-700 mb-2">Create Password</label>
                        <input
                            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                            type="password"
                            placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="text-start">
                        <label className="text-lg font-semibold text-gray-700 mb-2">Confirm Password</label>
                        <input
                            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                            type="password"
                            placeholder="Enter Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="flex justify-center">
                    <button type="submit" className="w-full py-3 bg-gray-700 text-white rounded-md font-bold hover:bg-gray-600 transition duration-300">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
