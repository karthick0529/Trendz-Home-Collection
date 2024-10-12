import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5"; // Import icons

export const SignupForm = () => {
    const navigate = useNavigate();
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (user) {
                const userRef = doc(db, "Users", user.uid);
                const userData = {
                    email: user.email,
                    firstName: fname,
                    lastName: lname,
                    photo: user.photoURL || "",
                };

                await setDoc(userRef, userData, { merge: true });
                alert("User Registered Successfully!!");
                navigate("/login");
            }
        } catch (error) {
            console.log("Error:", error.message);
            setError(error.message);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen p-6 bg-gradient-to-br from-purple-500 to-blue-600">
            <form onSubmit={submitHandler} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg space-y-6">
                <h2 className="text-2xl font-bold text-center">Sign Up</h2>
                <div>
                    <label className="block mb-2" htmlFor="fname">First Name</label>
                    <input
                        type="text"
                        id="fname"
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2" htmlFor="lname">Last Name</label>
                    <input
                        type="text"
                        id="lname"
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2" htmlFor="password">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
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
                <div>
                    <label className="block mb-2" htmlFor="confirmPassword">Confirm Password</label>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                        </button>
                    </div>
                </div>
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <div className="flex justify-center">
                    <button type="submit" className="w-full py-3 bg-purple-600 text-white rounded-md font-bold hover:bg-purple-500 transition duration-300">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};
