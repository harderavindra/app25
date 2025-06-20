import { useEffect, useState } from "react";
import FilterDropdown from "../components/ui/FilterDropdown";
import ListViewToggle from "../components/ui/ListViewToggle";
import SearchPage from "../components/ui/SearchPage";
import NewUserForm from "../components/user/NewUserForm";
import { FiPlus } from "react-icons/fi";
import Button from "../components/ui/Button";
import { roles } from "../utils/constants";
import axios from "../utils/axios";
import UserCard from "../components/user/UserCard";

const AdminUsers = () => {
    const [showCreateUser, setShowCreateUser] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch users from backend based on search and role filters
    const fetchUsers = async (search = "", roles = []) => {
        try {
            const query = new URLSearchParams();
            if (search) query.append("search", search);
            if (roles.length > 0) {
                roles.forEach((role) => query.append("roles", role)); // repeat for multi-select
            }

            const res = await axios.get(`/users?${query.toString()}`);
            setUsers(res.data.users);
        } catch (err) {
            console.error("Error fetching users:", err);
        }
    };

    useEffect(() => {
        const roleValues = selectedRoles.map((r) => r.value);
        fetchUsers(searchQuery, roleValues);
    }, [selectedRoles, searchQuery]);

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold text-neutral-800 dark:text-white">Admin Users</h1>
                <div className="flex items-center gap-2">
                    <Button variant="secondary" onClick={() => setShowCreateUser(true)}><FiPlus /></Button>
                    <SearchPage
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search users..."
                    />
                </div>
            </div>

            <div className="mb-4 flex items-center justify-between">
                <FilterDropdown
                    options={roles}
                    selected={selectedRoles}
                    onChange={setSelectedRoles}
                    multiSelect={true}
                    clearable={true}
                    placeholder="Select roles..."
                />
                <ListViewToggle />
            </div>

            <div className="grid grid-cols-4 gap-10">
                {users.length > 0 ? (
                    users.map((user) => (
                        <UserCard key={user._id} user={user} />
                    ))
                ) : (
                    <p className="text-neutral-500 dark:text-neutral-300">No users found.</p>
                )}
            </div>

            {showCreateUser && (
                <div className="pb-5 fixed bottom-0 right-5 z-10 w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-2xl dark:bg-zinc-800 dark:border-zinc-700">
                    <div className="max-h-[calc(100vh-120px)] overflow-y-auto w-full">
                        <NewUserForm handleClose={() => setShowCreateUser(false)} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUsers;
