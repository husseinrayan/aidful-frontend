import React from "react";
import "./text-field.css";

function TextField(props) {
  return (
    <label htmlFor={props.for}>
      {props.label}
      <input
        className="global-text-field"
        type={props.type}
        placeholder={props.placeholder}
        required={props.required ? props.required : false}
        style={props.style}
        onChange={props.onChange}
        name={props.name}
        id={props.id}
        autoFocus={props.autoFocus}
        value={props.value}
        disabled={props.disabled}
        defaultValue={props.defaultValue}
      />
    </label>
  );
}

export default TextField;
