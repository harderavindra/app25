import { createContext, useContext, useEffect, useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const res = await axios.get("/auth/me");
            setUser(res.data.user);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };
     const login = async (email, password) => {
    try {
      setLoading(true);
      await axios.post("/auth/login", { email, password });
      await fetchUser();
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };
    const logout = async () => {
        try {
                  setLoading(true);

            await axios.post("/auth/logout", {}, { withCredentials: true });
            setUser(null);
            navigate("/login");
        } catch (err) {
                  setError("Logout failed. Please try again.");

            console.error("Logout failed:", err);
        }finally {
      setLoading(false);
    }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, 
        setUser, 
        loading, 
        error,
        setError,
        login,
        logout  }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
