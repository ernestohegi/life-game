import React from 'react';

/**
 * Step Forward icon component for Game of Life
 *
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 */
const StepForwardIcon = ({ className = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 16 16"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M4.5 3.5A.5.5 0 0 0 4 4v8a.5.5 0 0 0 1 0V4a.5.5 0 0 0-.5-.5zm3 0A.5.5 0 0 0 7 4v8a.5.5 0 0 0 1 0V4a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 1 0V4a.5.5 0 0 0-.5-.5z"
      />
      <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
    </svg>
  );
};

export default StepForwardIcon;
