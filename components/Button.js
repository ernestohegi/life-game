import React from 'react';

/**
 * Button Component for Game of Life
 *
 * @param {Object} props - Component props
 * @param {Function} props.onClick - Click handler function
 * @param {string} props.color - Button color variant ('green', 'amber', 'blue', 'red')
 * @param {React.ReactNode} props.children - Button text or content
 * @param {string} [props.className] - Additional CSS classes to apply
 */
const Button = ({ onClick, color = 'blue', children, className = '' }) => {
  // Define color classes based on the color prop
  const colorClasses = {
    green: 'bg-gradient-to-r from-green-400 to-emerald-500',
    amber: 'bg-gradient-to-r from-amber-400 to-orange-500',
    blue: 'bg-gradient-to-r from-blue-400 to-indigo-500',
    red: 'bg-gradient-to-r from-red-400 to-rose-500',
  };

  // Base classes that all buttons share
  const baseClasses =
    'px-5 py-2 font-[gaegu] text-lg font-bold rounded-full shadow-md ' +
    'text-white transform transition-all duration-200 hover:-translate-y-0.5 ' +
    'hover:shadow-lg hover:scale-105';

  return (
    <button onClick={onClick} className={`${baseClasses} ${colorClasses[color]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
