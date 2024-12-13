import React from "react";
import PropTypes from "prop-types";
const Choice = ({ label, content, handleSelectChoice, isSelected }) => {
  return (
    <div className={`hover:bg-blue-300 rounded-md px-6 py-4 flex items-center text-xl border-2 cursor-pointer shadow-md ${isSelected && "bg-blue-300"}`} onClick={handleSelectChoice}>
      {label}. {content}
    </div>
  );
};
Choice.propTypes = {
  label: PropTypes.string,
  content: PropTypes.string,
};
export default Choice;
