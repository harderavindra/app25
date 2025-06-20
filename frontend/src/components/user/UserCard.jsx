import React from 'react';

const colorMap = {
  'bg-red-500': 'group-hover:shadow-[0_20px_20px_3px_rgba(239,68,68,0.5)]',
  'bg-blue-500': 'group-hover:shadow-[0_20px_20px_3px_rgba(59,130,246,0.5)]',
  'bg-green-500': 'group-hover:shadow-[0_20px_20px_3px_rgba(34,197,94,0.5)]',
  'bg-yellow-500': 'group-hover:shadow-[0_20px_20px_3px_rgba(234,179,8,0.5)]',
  'bg-purple-500': 'group-hover:shadow-[0_20px_20px_3px_rgba(168,85,247,0.5)]',
  'bg-pink-500': 'group-hover:shadow-[0_20px_20px_3px_rgba(236,72,153,0.5)]',
  'bg-indigo-500': 'group-hover:shadow-[0_0_12px_rgba(99,102,241,0.5)]',
  'bg-emerald-500': 'group-hover:shadow-[0_0_12px_rgba(16,185,129,0.5)]',
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

const UserCard = ({ user }) => {
  const initials = getInitials(user);
  const colorClass = getColorClass(user);
  const shadowClass = colorMap[colorClass];

  return (
    <div className="max-w-sm h-full mx-auto bg-white shadow-md rounded-3xl shadow-neutral-200 overflow-hidden hover:shadow-2xl transition-all group">
      <div className="p-6 text-center">
        <div
          className={`w-16 h-16 mx-auto mb-4 rounded-full ${colorClass} text-white text-xl font-bold flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${shadowClass}`}
        >
          {initials}
        </div>
        <h2 className="text-xl font-semibold text-gray-900">
          {user?.firstName} {user?.lastName}
        </h2>
        <p className="text-gray-700 mt-2">Email: {user?.email}</p>
        <p className="text-gray-500 mt-1">Role: {user?.role}</p>
      </div>
    </div>
  );
};

export default UserCard;
