import React, { useState ,useContext} from "react";
import { Icon } from "@iconify/react";
import Button from "../components/Button";
import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../utils/validations";
import { signup, googleLogin } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


const SignUp: React.FC = () => {
  const { setUser } = useContext(AuthContext)!;
  const navigate = useNavigate();


  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: validateName(form.name),
      email: validateEmail(form.email),
      password: validatePassword(form.password),
      confirmPassword: validateConfirmPassword(form.password, form.confirmPassword),
    };
    setErrors(newErrors);

    if (Object.values(newErrors).every((err) => err === "")) {
      try {
        const data = await signup({ name: form.name, email: form.email, password: form.password });
        if (data.success) {
          setUser(data.user); // update auth context
          navigate("/verify-email"); 
   
        }
        
      } catch (err: unknown) {
        console.error(err);
      }
    }
  };
  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      {/* Name */}
      <div className="relative">
        <Icon
          icon="mdi:account-outline"
          className="absolute top-3 left-3 text-gray-400 text-xl"
        />
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 outline-none"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <Icon icon="mdi:alert-circle" className="text-red-500" />
            {errors.name}
          </p>
        )}
      </div>
      <div className="relative">
        <Icon
          icon="mdi:email-outline"
          className="absolute top-3 left-3 text-gray-400 text-xl"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 outline-none"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <Icon icon="mdi:alert-circle" className="text-red-500" />
            {errors.email}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="relative">
        <Icon
          icon="mdi:lock-outline"
          className="absolute top-3 left-3 text-gray-400 text-xl"
        />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full pl-10 pr-10 py-3 rounded-lg bg-gray-900 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 outline-none"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-3 right-3 text-gray-400"
        >
          <Icon icon={showPassword ? "mdi:eye-off" : "mdi:eye"} className="text-3xl" />
        </button>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <Icon icon="mdi:alert-circle" className="text-red-500" />
            {errors.password}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="relative">
        <Icon
          icon="mdi:lock-check-outline"
          className="absolute top-3 left-3 text-gray-400 text-xl"
        />
        <input
          type={showConfirm ? "text" : "password"}
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          className="w-full pl-10 pr-10 py-3 rounded-lg bg-gray-900 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 outline-none"
        />
        <button
          type="button"
          onClick={() => setShowConfirm(!showConfirm)}
          className="absolute top-3 right-3 text-gray-400"
        >
          <Icon icon={showConfirm ? "mdi:eye-off" : "mdi:eye"} className="text-3xl" />
        </button>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <Icon icon="mdi:alert-circle" className="text-red-500" />
            {errors.confirmPassword}
          </p>
        )}
      </div>

      {/* Sign Up button */}
      <Button label="Sign Up" type="submit" />

      {/* Divider */}
      <div className="flex items-center my-4">
        <hr className="flex-grow border-gray-600" />
        <span className="px-2 text-gray-400 text-sm">or</span>
        <hr className="flex-grow border-gray-600" />
      </div>

      {/* Google Button */}
      <Button
        label="Continue with Google"
        icon="logos:google-icon"
        variant="secondary"
        onClick={googleLogin}
      />
    </form>
  );
};

export default SignUp;
