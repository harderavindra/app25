import { useEffect, useState } from "react";
import FilterDropdown from "../components/ui/FilterDropdown";
import ListViewToggle from "../components/ui/ListViewToggle";
import SearchPage from "../components/ui/SearchPage";
import NewUserForm from "../components/user/NewUserForm";
import { FiGrid, FiList, FiPlus } from "react-icons/fi";
import Button from "../components/ui/Button";
import { roles, teams } from "../utils/constants";
import axios from "../utils/axios";
import UserCard from "../components/user/UserCard";
import UserInitialsAvatar from "../components/ui/UserInitialsAvatar";

const AdminUsers = () => {
    const [showCreateUser, setShowCreateUser] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [listStyle, setListStyle] = useState("grid");
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(false)

    // Fetch users from backend based on search and role filters
    const fetchUsers = async (search = "", roles = [], teams = []) => {
        setLoading(true)
        try {
            const query = new URLSearchParams();
            if (search) query.append("search", search);
            if (roles.length > 0) {
                roles.forEach((role) => query.append("roles", role)); // repeat for multi-select
            }
            if (teams.length > 0) {
                teams.forEach((team) => query.append("teams", team)); // repeat for multi-select    
            }

            const res = await axios.get(`/users?${query.toString()}`);
            setUsers(res.data.users);
            
        } catch (err) {
            console.error("Error fetching users:", err);
        }finally{
            setLoading(false)
        }
    };

    useEffect(() => {
        const roleValues = selectedRoles.map((r) => r.value);
        const teamValues = selectedTeams.map((r) => r.value);
        console.log("Fetching users with:", teamValues)
        fetchUsers(searchQuery, roleValues, teamValues);
    }, [selectedRoles, selectedTeams, searchQuery]);

    const handleEdit = (user) => {
        setSelectedUser(user);
        console.log("Editing user:", user);
        // Open edit modal or navigate to edit page
        setShowCreateUser(true);
        // You can also pass the user data to the form if needed


    };
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
                <div className="flex gap-8">
                    <FilterDropdown
                        options={roles}
                        selected={selectedRoles}
                        onChange={setSelectedRoles}
                        multiSelect={true}
                        clearable={true}
                        placeholder="Select roles..."
                    />
                    <FilterDropdown
                        options={teams}
                        selected={selectedTeams}
                        onChange={setSelectedTeams}
                        multiSelect={true}
                        clearable={true}
                        placeholder="Select roles..."
                    />
                </div>
                <div className="flex items-center space-x-4">
                    <button className={`p-2 rounded-md border  ${listStyle === "grid" ? "bg-white dark:bg-white border-neutral-200" : "bg-neutral-50 hover:bg-gray-300 hover:*:text-neutral-600 dark:bg-zinc-800 dark:hover:bg-zinc-700 border-neutral-200 text-neutral-300"}`}
                        onClick={() => setListStyle("grid")}
                    >
                        <FiGrid className="h-6 w-6 " />
                    </button>
                    <button className={`p-2 rounded-md border  ${listStyle === "list" ? "bg-white dark:bg-white border-neutral-200" : "bg-neutral-50 hover:bg-gray-50 hover:*:text-neutral-600 dark:bg-zinc-800 dark:hover:bg-zinc-700 border-neutral-200 text-neutral-300"}`}
                        onClick={() => setListStyle("list")}
                    >

                        <FiList className="h-6 w-6 " />
                    </button>
                </div>
            </div>

            <div>
  {loading ? (
    <div className="grid grid-cols-4 gap-10 py-5">
      {[...Array(4)].map((_, idx) => (
        <div
          key={idx}
          className="animate-pulse flex flex-col items-center p-6 bg-neutral-100 dark:bg-zinc-700 rounded-lg shadow"
        >
          <div className="w-16 h-16 rounded-full bg-neutral-300 dark:bg-zinc-600 mb-4"></div>
          <div className="h-4 w-24 bg-neutral-300 dark:bg-zinc-600 rounded mb-2"></div>
          <div className="h-3 w-16 bg-neutral-200 dark:bg-zinc-700 rounded mb-2"></div>
          <div className="h-3 w-20 bg-neutral-200 dark:bg-zinc-700 rounded"></div>
        </div>
      ))}
    </div>
  ) : users.length > 0 ? (
    listStyle === 'grid' ? (
      <div className="grid grid-cols-4 gap-10 py-5">
        {users.map((user) => (
          <UserCard
            key={user._id}
            active={selectedUser?._id === user?._id}
            user={user}
            handleEdit={handleEdit}
          />
        ))}
      </div>
    ) : (
      <div className="w-full py-5">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-white dark:bg-zinc-700">
              <th className="py-2 pl-3 px-4 text-left border-b border-neutral-200 dark:border-zinc-700"></th>
              <th className="py-2 text-left border-b border-neutral-200 dark:border-zinc-700">Name</th>
              <th className="py-2 text-left border-b border-neutral-200 dark:border-zinc-700">Email</th>
              <th className="py-2 text-left border-b border-neutral-200 dark:border-zinc-700">Role</th>
              <th className="py-2 text-left border-b border-neutral-200 dark:border-zinc-700">Team</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-neutral-50 transition">
                <td className="py-2 pl-3 border-b border-neutral-200 dark:border-zinc-700">
                  <UserInitialsAvatar size="sm" user={user} />
                </td>
                <td className="py-2 border-b border-neutral-200 dark:border-zinc-700 font-semibold capitalize">
                  {user.firstName} {user.lastName}
                </td>
                <td className="py-2 border-b border-neutral-200 dark:border-zinc-700">
                  {user.email}
                </td>
                <td className="py-2 border-b border-neutral-200 dark:border-zinc-700 capitalize">
                  {user.role}
                </td>
                <td className="py-2 border-b border-neutral-200 dark:border-zinc-700 capitalize">
                  {user.team}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  ) : (
    <p className="text-neutral-500 dark:text-neutral-300">No users found.</p>
  )}
</div>


            {showCreateUser && (
                <div className="pb-5 fixed bottom-0 right-5 z-10 w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-2xl dark:bg-zinc-800 dark:border-zinc-700">
                    <div className="max-h-[calc(100vh-120px)] overflow-y-auto w-full">
                        <NewUserForm
                            isEdit={!!selectedUser}
                            userData={selectedUser}
                            handleClose={() => {
                                setSelectedUser(null);
                                setShowCreateUser(false);
                            }}
                            onSuccess={() => {
                                // ✅ Refetch user list after successful update or delete
                                const roleValues = selectedRoles.map((r) => r.value);
                                const teamValues = selectedTeams.map((r) => r.value);
                                fetchUsers(searchQuery, roleValues, teamValues);
                            }}
                        />                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUsers;
