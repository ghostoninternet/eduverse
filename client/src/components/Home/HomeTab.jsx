import Course from "../Course";
import PropTypes from "prop-types";

const HomeTab = ({ handleCourseClick, recommend, free, popular }) => {
  return (
    <div className="">
      <div className="sm:flex sm:flex-col sm:gap-y-11 sm:px-20 sm:my-4 max-sm:m-3 gap-y-5">
        <div>
          <h2 className="sm:text-2xl text-3xl font-semibold my-3">
            Recommended Course
          </h2>
          <div className="sm:grid grid-cols-4 sm:gap-6 flex flex-col gap-y-4">
            {recommend.map((course) => (
              <Course
                onClick={() => handleCourseClick(course)}
                key={course._id}
                title={course.courseTitle}
                description={course.courseDescription}
                imgUrl={course.courseImgUrl}
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-3xl sm:text-2xl font-semibold my-3">
            Free Course
          </h2>
          <div className="sm:grid grid-cols-4 sm:gap-6 flex flex-col gap-y-4">
            {free.map((course) => (
              <Course
                onClick={() => handleCourseClick(course)}
                key={course._id}
                title={course.courseTitle}
                description={course.courseDescription}
                imgUrl={course.courseImgUrl}
              />
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h2 className="sm:text-2xl text-3xl font-semibold my-3">
            Most Popular Course
          </h2>
          <div className="sm:grid grid-cols-4 sm:gap-6 flex flex-col gap-y-4">
            {popular.map((course) => (
              <Course
                onClick={() => handleCourseClick(course)}
                key={course._id}
                title={course.courseTitle}
                description={course.courseDescription}
                imgUrl={course.courseImgUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTab;

HomeTab.propTypes = {
  recommend: PropTypes.array,
  free: PropTypes.array,
  popular: PropTypes.array,
  handleCourseClick: PropTypes.func,
};
