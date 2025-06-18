import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const { user, logout } = useAuth();
    useEffect(() => {
        console.log(user)
    }, [])
    return (
        <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
            <h1 className="text-3xl font-bold underline">
                Welcome, {user?.name}
            </h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Dashboard;
