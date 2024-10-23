import React from "react";

const Button = ({ text, handler }) => {
  return (
    <button className="bg-slate-500 border-2 border-black hover:bg-slate-50 rounded-md" onClick={handler}>
      {text}
    </button>
  );
};

export default Button;
