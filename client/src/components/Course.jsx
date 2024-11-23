
import PropTypes from 'prop-types';
const Course = ({onClick, imgUrl, description, title}) => {

  return (
    <div onClick={onClick}
    className="border rounded-md p-4 shadow-md hover:scale-105 flex flex-col cursor-pointer">
      <img src={`${imgUrl}`} className="w-full h-full"/>
      <div className="mt-4">
        <h3 className="break-words font-bold">{title}</h3>
        <p>{description}</p>
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
