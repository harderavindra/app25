import React from 'react';
import { FiEdit, FiEdit2 } from 'react-icons/fi';

const colorMap = {
  'bg-red-500/80': 'shadow-[0_20px_20px_3px_rgba(239,68,68,0.5)] ',
  'bg-blue-500/80': 'shadow-[0_20px_20px_3px_rgba(59,130,246,0.5)]',
  'bg-green-500/80': 'shadow-[0_20px_20px_3px_rgba(34,197,94,0.5)]',
  'bg-yellow-500/80': 'shadow-[0_20px_20px_3px_rgba(234,179,8,0.5)]',
  'bg-purple-500/80': 'shadow-[0_20px_20px_3px_rgba(168,85,247,0.5)]',
  'bg-pink-500/80': 'shadow-[0_20px_20px_3px_rgba(236,72,153,0.5)]',
  'bg-indigo-500/80': 'shadow-[0_0_12px_rgba(99,102,241,0.5)]',
  'bg-emerald-500/80': 'shadow-[0_0_12px_rgba(16,185,129,0.5)]',
};

const bgColors = Object.keys(colorMap);

const getInitials = (user) => {
  const first = user?.firstName?.charAt(0).toUpperCase() || '';
  const last = user?.lastName?.charAt(0).toUpperCase() || '';
  return first + last;
};

const getColorClass = (user) => {
  const char = user?.firstName?.charAt(0) || 'A';
  const index = char.toUpperCase().charCodeAt(0) % bgColors.length;
  return bgColors[index];
};

const UserCard = ({ user, handleEdit, active=false }) => {
  const initials = getInitials(user);
  const colorClass = getColorClass(user);
  const shadowClass = colorMap[colorClass];
    const activeShadow = colorMap[colorClass];


  return (
    <div className={`w-full h-full  bg-white border border-neutral-200 shadow-0 rounded-xl hover:shadow-blue-800/20 overflow-hidden hover:border-blue-300 hover:shadow-2xl transition-all group ${active ? 'shadow-blue-800/20 border-blue-300 shadow-2xl' : ''}`}>
      <div className=" text-center relative">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
          onClick={() => handleEdit?.(user)}
        >
          <FiEdit2 />
        </button>
        {active && (
          <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
            Editing
          </div>
        )}
       <div
  className={`w-16 h-16 mx-auto my-4 rounded-full ${colorClass} text-white text-xl font-bold flex items-center justify-center
    transition-transform duration-300 scale-100
    group-hover:scale-110
    ${active ? 'scale-110 ' + shadowClass : 'group-hover:' + shadowClass}`}
>
  {initials}
</div>
        <h2 className="text-xl font-medium text-gray-900 capitalize">
          {user?.firstName} {user?.lastName}
        </h2>
        <p className="text-gray-700  mt-2">{user?.email}</p>
        <div className='flex gap-2  mt-4 border-t border-neutral-200 text-sm capitalize '>
          <p className="w-full  text-gray-500 mt-1 border-r border-neutral-200 px-3 py-2">{user?.role}</p>
          <p className="w-full text-gray-500 mt-1 px-3 py-2">{user?.team}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
