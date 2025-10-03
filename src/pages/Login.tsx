// src/pages/Login.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Login: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-black rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            {isSignIn ? "Welcome Back 👋" : "Create Your Account 🚀"}
          </h2>

          {/* Animated Switcher */}
          <AnimatePresence mode="wait">
            {isSignIn ? (
              <motion.div
                key="signin"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                <SignIn />
              </motion.div>
            ) : (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <SignUp />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle Section */}
          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">
              {isSignIn ? "Don’t have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => setIsSignIn(!isSignIn)}
                className="text-purple-600 hover:text-pink-500 font-semibold transition"
              >
                {isSignIn ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
