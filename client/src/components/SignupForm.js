import googleIcon from "../assets/googleIcon.png";
import facebookIcon from "../assets/facebookIcon.png";
import githubIcon from "../assets/githubIcon.png";

import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const SignupForm = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Providers initialization
  const providers = {
    google: new GoogleAuthProvider(),
    facebook: new FacebookAuthProvider(),
    github: new GithubAuthProvider(),
  };

  // Handle input change
  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  // Save user to Firestore
  const saveUserToFirestore = async (user, additionalData = {}) => {
    if (user) {
      const userData = {
        email: user.email,
        firstName:
          user.displayName?.split(" ")[0] || additionalData.fname || "",
        lastName: user.displayName?.split(" ")[1] || additionalData.lname || "",
        photo: user.photoURL || "",
      };

      // Add user document to Firestore with UID
      await setDoc(doc(db, "Users", user.uid), userData);
    }
  };

  // Submit handler for email/password sign-up
  const submitHandler = async (e) => {
    e.preventDefault();
    const { fname, lname, email, password, confirmPassword } = userDetails;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Sign up user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save user data to Firestore
      await saveUserToFirestore(user, { fname, lname });

      alert("User Registered Successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Error during email sign-up:", error.message);
      alert(error.message);
    }
  };

  // Handle social sign-in (Google, Facebook, GitHub)
  const handleSocialSignIn = async (provider) => {
    try {
      const result = await signInWithPopup(auth, providers[provider]);
      const user = result.user;

      // Save social user data to Firestore
      await saveUserToFirestore(user);

      alert(
        `Signed in with ${
          provider.charAt(0).toUpperCase() + provider.slice(1)
        } successfully!`
      );
      navigate("/");
    } catch (error) {
      console.error("Error during social sign-in:", error.message);

      if (error.code === "auth/account-exists-with-different-credential") {
        alert(
          "An account with the same email exists with a different provider."
        );
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-6 bg-gradient-to-br from-gray-100 to-gray-400">
      {/* Sign Up Heading */}

      <form
        onSubmit={submitHandler}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg space-y-6"
      >
        <h1 className="text-3xl font-bold mb-6 text-gray-700">Sign Up</h1>
        {/* First Name & Last Name */}
        <div className="flex space-x-4">
          {["First Name", "Last Name"].map((label, index) => (
            <div key={index} className="w-1/2 text-start">
              <label className="text-lg font-semibold text-gray-700 mb-2">
                {label}
              </label>
              <input
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 w-full"
                type="text"
                name={index === 0 ? "fname" : "lname"}
                placeholder={`Enter ${label}`}
                onChange={handleChange}
                required
              />
            </div>
          ))}
        </div>

        {/* Email */}
        <div className="text-start">
          <label className="text-lg font-semibold text-gray-700 mb-2">
            Email
          </label>
          <input
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            type="email"
            name="email"
            placeholder="Enter Your Email"
            onChange={handleChange}
            required
          />
        </div>

        {/* Password & Confirm Password */}
        <div className="flex space-x-4">
          {["Create Password", "Confirm Password"].map((label, index) => (
            <div key={index} className="w-1/2 text-start">
              <label className="text-lg font-semibold text-gray-700 mb-2">
                {label}
              </label>
              <input
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 w-full"
                type="password"
                name={index === 0 ? "password" : "confirmPassword"}
                placeholder={`Enter ${label}`}
                onChange={handleChange}
                required
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full py-3 bg-gray-700 text-white rounded-md font-bold hover:bg-gray-600 transition duration-300"
          >
            Submit
          </button>
        </div>

        {/* Social Sign-in Icons */}
        <div className="flex justify-center space-x-4 mt-6">
          {/* Import images from local */}
          {[
            { img: googleIcon || "defaultGoogleIcon.png", provider: "google" },
            { img: facebookIcon || "defaultFacebookIcon.png", provider: "facebook" },
            { img: githubIcon || "defaultGithubIcon.png", provider: "github" },
          ].map((item, index) => (
            <img
              key={index}
              onClick={() => handleSocialSignIn(item.provider)}
              src={item.img}
              alt={`${item.provider} icon`}
              className="w-10 h-10 cursor-pointer hover:opacity-80 transition duration-300"
              title={`Sign in with ${
                item.provider.charAt(0).toUpperCase() + item.provider.slice(1)
              }`}
              onError={(e) => { e.target.src = "/fallbackIcon.png"; }}
            />
          ))}
        </div>
      </form>
    </div>
  );
};
