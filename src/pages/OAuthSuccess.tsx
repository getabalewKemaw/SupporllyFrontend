import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getCurrentUser } from "../api/auth";

const OAuthSuccess = () => {
  const { setUser } = useContext(AuthContext)!;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        if (data.success) {
          setUser(data.user);
          // Google logins always go to customer dashboard
          navigate("/dashboard/user");
        } else {
          navigate("/login");
        }
      } catch {
        navigate("/login");
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen text-white bg-gray-900">
      <p>Logging you in with Google...</p>
    </div>
  );
};

export default OAuthSuccess;

