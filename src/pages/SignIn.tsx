import React, { useState, useContext } from "react";
import { Icon } from "@iconify/react";
import Button from "../components/Button";
import { validateEmail, validatePassword } from "../utils/validations";
import { login, googleLogin } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useContext(AuthContext)!;
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      email: validateEmail(form.email),
      password: validatePassword(form.password),
    };
    setErrors(newErrors);
    if (!Object.values(newErrors).every((err) => err === "")) return;

    try {
      const data = await login(form);
      if (data.success) {
        setUser(data.user);
        if(data.user.role=='admin'){
          navigate("/dashboard/admin");
        }
        else if (data.user.role=="customer"){
          navigate('/dashboard/user');
        }
        else{
          navigate('/');
        }
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: string } } };
      alert(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      {/* Email */}
      <div className="relative">
        <Icon icon="mdi:email-outline" className="absolute top-3 left-3 text-gray-400 text-xl" />
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
        <Icon icon="mdi:lock-outline" className="absolute top-3 left-3 text-gray-400 text-xl" />
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

      {/* Sign In button */}
      <Button label="Sign In" type="submit" />

      {/* Divider */}
      <div className="flex items-center my-4">
        <hr className="flex-grow border-gray-600" />
        <span className="px-2 text-gray-400 text-sm">or</span>
        <hr className="flex-grow border-gray-600" />
      </div>

      {/* Google Button */}
      <Button label="Continue with Google" onClick={googleLogin} icon="logos:google-icon" variant="secondary" />
    </form>
  );
};
export default SignIn;
