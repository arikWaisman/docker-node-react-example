import React from 'react';

const Input = ({
  label,
  name,
  type,
  input,
  placeholder,
  wrapperClass,
  meta,
  onChange,
}) => {
  return (
    <div className={`input-field ${wrapperClass}`}>
      <label className="active" htmlFor={name}>
        {label}
      </label>
      <input
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        type={type}
        {...input}
      />
      {meta && meta.touched && meta.error && (
        <p className="error-msg">{meta.error}</p>
      )}
    </div>
  );
};

export default Input;
