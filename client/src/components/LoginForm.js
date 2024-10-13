import React, { useContext, useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "./firebase";
import { AppContext } from "../context/AppContext";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Eye icon from react-icons

// Icons (assuming you have them stored locally)
import googleIcon from "../assets/googleIcon.png";
import facebookIcon from "../assets/facebookIcon.png";
import githubIcon from "../assets/githubIcon.png";

export const LoginForm = () => {
  const { setIsLoggedIn } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // Providers initialization
  const providers = {
    google: new GoogleAuthProvider(),
    facebook: new FacebookAuthProvider(),
    github: new GithubAuthProvider(),
  };

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

  // Handle social login (Google, Facebook, GitHub)
  const handleSocialSignIn = async (provider) => {
    try {
      const result = await signInWithPopup(auth, providers[provider]);
      const user = result.user;
      console.log(`${provider} user logged in successfully`, user);
      setIsLoggedIn(true);
      alert(`Logged in with ${provider} successfully`);
      window.location.href = "/";
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-6 bg-gradient-to-br from-purple-600 to-indigo-600">
      <form
        onSubmit={submitHandler}
        className="flex flex-col bg-white p-8 shadow-lg w-full max-w-md rounded-lg space-y-6"
      >
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Login to Your Account
        </h1>
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-semibold text-start text-gray-700">
            Email
          </label>
          <input
            className="border text-gray-900 border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            type="email"
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col space-y-2 relative">
          <label className="text-lg font-semibold text-start text-gray-700">
            Password
          </label>
          <input
            className="border text-gray-900 border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            type={showPassword ? "text" : "password"} // Toggle between text and password
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* Eye icon for toggling password visibility */}
          <div
            className="absolute right-3 top-10 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaEyeSlash className="text-gray-500" />
            ) : (
              <FaEye className="text-gray-500" />
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-br from-gray-900 to-black text-white rounded-md font-bold hover:opacity-80 transition duration-300"
          >
            Submit
          </button>
        </div>

        {/* Social login buttons */}
        <div className="flex justify-center space-x-4 mt-6">
          {/* Google Login */}
          <img
            src={googleIcon}
            alt="Google"
            onClick={() => handleSocialSignIn("google")}
            className="w-10 h-10 cursor-pointer hover:opacity-80 transition duration-300"
            title="Sign in with Google"
          />
          {/* Facebook Login */}
          <img
            src={facebookIcon}
            alt="Facebook"
            onClick={() => handleSocialSignIn("facebook")}
            className="w-10 h-10 cursor-pointer hover:opacity-80 transition duration-300"
            title="Sign in with Facebook"
          />
          {/* GitHub Login */}
          <img
            src={githubIcon}
            alt="GitHub"
            onClick={() => handleSocialSignIn("github")}
            className="w-10 h-10 cursor-pointer hover:opacity-80 transition duration-300"
            title="Sign in with GitHub"
          />
        </div>
      </form>
    </div>
  );
};
