import React from "react";
import PropTypes from 'prop-types';
const Course = (props) => {

  return (
    <div className="border rounded-md p-4 shadow-md hover:scale-105 flex flex-col hover:-z-10">
      <img src={`${props.imgUrl}`} className="w-full h-full"/>
      <div className="mt-4">
        <h3 className="break-words font-bold">{props.title}</h3>
        <p>{props.description}</p>
      </div>
    </div>
  );
};

Course.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
}

export default Course;
