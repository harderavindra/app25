import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const { user, logout } = useAuth();
    useEffect(() => {
        // console.log(user)
    }, [])
    return (
        <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
            <h2>Welcome, {user?.firstName}</h2>
            <p>Email: {user?.email}</p>
            <p>Role: {user?.role}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Dashboard;
