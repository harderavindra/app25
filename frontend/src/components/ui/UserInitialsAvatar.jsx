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
  if (typeof user === 'string') {
    const parts = user.trim().split(' ');
    const first = parts[0]?.[0]?.toUpperCase() || '';
    const last = parts[1]?.[0]?.toUpperCase() || '';
    return first + last || first || '?';
  }

  const first = user?.firstName?.[0]?.toUpperCase() || '';
  const last = user?.lastName?.[0]?.toUpperCase() || '';
  return first + last || first || '?';
};

const getColorClass = (user) => {
  const char = typeof user === 'string'
    ? user.trim()[0]?.toUpperCase() || 'A'
    : user?.firstName?.[0]?.toUpperCase() || 'A';
  const index = char.charCodeAt(0) % bgColors.length;
  return bgColors[index];
};

const sizeClasses = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-16 h-16 text-xl',
  lg: 'w-20 h-20 text-2xl',
};

const UserInitialsAvatar = ({ user, size = 'sm', className = '' }) => {
  const initials = getInitials(user);
  const bgColor = getColorClass(user);
  const shadowClass = colorMap[bgColor];
  const fullName = typeof user === 'string'
    ? user
    : `${user?.firstName || ''} ${user?.lastName || ''}`.trim();

  return (
    <div
      title={fullName}
      className={`${sizeClasses[size]} rounded-full ${bgColor} text-white font-bold flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${shadowClass} ${className}`}
    >
      {initials}
    </div>
  );
};

export default UserInitialsAvatar;
