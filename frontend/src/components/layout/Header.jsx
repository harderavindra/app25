import { FiUser, FiLogOut, FiChevronDown } from "react-icons/fi";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AvatarDropdown from "../ui/AvatarDropdown";
import Logo from "../../assets/app-work.svg"; // Adjust the path as necessary

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white dark:bg-zinc-900  px-6 py-3 flex items-center justify-between border-b border-neutral-200 dark:border-zinc-700">
      <div className="flex items-center justify-center gap-2    text-xl font-medium uppercase text-neutral-800">
        <img src={Logo} alt="Logo" className="inline h-6 " />
        Appwork
      </div>

      <nav className="hidden md:flex space-x-6 text-sm text-zinc-600 dark:text-zinc-300">
        <a href="/dashboard" className="hover:text-blue-600">Dashboard</a>
        <a href="/users" className="hover:text-blue-600">Users</a>
        <a href="/settings" className="hover:text-blue-600">Settings</a>
      </nav>

      <AvatarDropdown user={user} />
    </header>
  );
};

export default Header;
