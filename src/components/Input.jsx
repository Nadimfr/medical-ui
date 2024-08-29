import React from 'react';

const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  name,
  className = '',
  ...props
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      className={`w-full border-[1px] border-[#E0E0E0] rounded-[14px] pl-5 py-4 bg-transparent focus:outline-none text-red-500 placeholder:text-red-500 ${className}`}
      {...props}
    />
  );
};

export default Input;
