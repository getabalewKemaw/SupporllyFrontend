import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const [message, setMessage] = useState("Verifying...");
  const navigate = useNavigate();
  const API_BASE = (import.meta as unknown as { env: { VITE_API_BASE?: string } }).env.VITE_API_BASE || "https://customer-ai-assistant.onrender.com";

  useEffect(() => {
    const verify = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        setMessage("Please check your email and click on the verification link.");
        return;
      }

      try {
        const res = await axios.get<{
          success: boolean;
          message: string;
          user?: { role: string };
        }>(`${API_BASE}/auth-local/verify-email?token=${token}`, { withCredentials: true });

        if (res.data.success) {
          setMessage("✅ Email verified successfully. Redirecting to login...");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          setMessage(res.data.message || "❌ Verification failed.");
        }
      } catch (error: unknown) {
        const err = error as AxiosError<{ message: string }>;
        setMessage(err.response?.data?.message || "❌ Invalid or expired token.");
      }
    };

    verify();
  }, [navigate, API_BASE]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
        <p>{message}</p>
      </div>
    </div>
  );
}
