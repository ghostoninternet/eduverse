import CourseRating from "./CourseRating";
import PropTypes from "prop-types";
const Course = ({
  onClick,
  imgUrl,
  description,
  title,
  avgRating,
  reviewers,
  progress,
}) => {
  return (
    <div
      onClick={onClick}
      className="border rounded-md p-4 shadow-md hover:scale-105 flex flex-col cursor-pointer"
    >
      <img src={`${imgUrl}`} className="w-full h-full" />
      <div className="mt-4">
        <h3 className="break-words font-bold">{title}</h3>
        <p>{description}</p>
        <div className="flex items-center mt-2">
          <CourseRating rating={avgRating} />
          <span>({reviewers})</span>
        </div>
        {progress !== undefined && progress !== null && (
          <div className="mt-2 flex items-center gap-x-2">
            <div className="bg-gray-200 h-2 rounded-full w-10/12">
              <div
                className="bg-blue-700 h-2 rounded-full "
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="">{progress}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

Course.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  avgRating: PropTypes.number,
  price: PropTypes.number,
  reviewers: PropTypes.number,
  progress: PropTypes.number,
};

export default Course;
