import React from "react";
import PropTypes from "prop-types";
const Choice = ({
  label,
  content,
  handleSelectChoice,
  isSelected,
  isAnswer,
  isSubmitted,
}) => {
  return (
    <button
      className={`${
        !isSubmitted && "hover:bg-blue-300"
      } rounded-md px-6 py-4 flex items-center text-xl border-2 shadow-md ${
        isSelected && "bg-blue-300"
      } ${(isSelected && isAnswer && isSubmitted) && "bg-green-500"} ${
        (isSelected && !isAnswer && isSubmitted) && "bg-red-500"
      }`}
      disabled={isSubmitted}
      onClick={handleSelectChoice}
    >
      {label}. {content}
    </button>
    
  );
};
Choice.propTypes = {
  label: PropTypes.string,
  content: PropTypes.string,
  handleSelectChoice: PropTypes.func,
  isSelected: PropTypes.bool,
  isAnswer: PropTypes.bool,
  isSubmitted: PropTypes.bool,
};
export default Choice;
