import { FiUser, FiLogOut, FiChevronDown } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const AvatarDropdown = ({ user }) => {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-white focus:outline-none"
      >
        <img
          src={`https://ui-avatars.com/api/?name=${user?.name || "U"}&background=0D8ABC&color=fff`}
          alt="User"
          className="w-8 h-8 rounded-full"
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-800   dark:border-zinc-700 rounded-xl shadow-lg z-50 -shadow-md"> 
          <div className="px-4 py-2 text-sm text-zinc-700 dark:text-zinc-200 border-b dark:border-zinc-600">
            Signed in as <br />
            <span className="font-semibold">{user?.name}</span>
          </div>
          <button
            onClick={logout}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-zinc-700"
          >
            <FiLogOut className="inline mr-2" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
