import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const [message, setMessage] = useState("Verifying...");
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        setMessage("❌ Token is missing.");
        return;
      }

      try {
        const res = await axios.get<{ success: boolean; message: string }>(
          `http://localhost:5000/auth-local/verify-email?token=${token}`
        );

        if (res.data.success) {
          setMessage("✅ Email verified successfully. Redirecting to login...");
          setTimeout(() => navigate("/login"), 2000); // redirect after 2s
        } else {
          setMessage(res.data.message || "❌ Verification failed.");
        }
      } catch (error: unknown) {
        const err = error as AxiosError<{ message: string }>;
        setMessage(err.response?.data?.message || "❌ Invalid or expired token.");
      }
    };

    verify();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
        <p>{message}</p>
      </div>
    </div>
  );
}
