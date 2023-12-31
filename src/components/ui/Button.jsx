import React from "react";

export default function Button({ text, onClick, disabled }) {
  return (
    <button
      disabled={disabled}
      className="bg-brand text-white py-2 px-4 rounded-sm hover:brightness-125"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
