
import { useEffect, useState } from "react";
import axios from "axios";

export default function VerifyEmail() {
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      axios
        .get(`http://localhost:5000/auth/verify-email?token=${token}`)
        .then((res) => setMessage(res.data.message))
        .catch(() => setMessage("Invalid or expired token"));
    }
  }, []);

  return <h2>{message}</h2>;
}

