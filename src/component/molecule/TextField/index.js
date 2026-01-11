import React from 'react';
import { ErrorMessage, useField } from 'formik';
import "./textField.css"
import TextField from '@mui/material/TextField';

export const TextFields = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-2">
      {/* <label className="label-input" htmlFor={field.name}>{label}</label>
      <input
        className={` ${meta.touched && meta.error && 'is-invalid'} text-field`}
        {...field} {...props}
        autoComplete="off"
      /> */}
      <input id="input-auth" label={label} className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
        {...field} {...props}
        autoComplete="off"/>
      <ErrorMessage component="div" name={field.name} className="error text-danger errorMessage"/>
    </div>
  )
}