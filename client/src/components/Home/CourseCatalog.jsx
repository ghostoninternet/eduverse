import React, {useState} from "react";
import PropTypes from "prop-types";
import Course from "../Course";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import Pagination from "../pagination";
const optionsFilterBy = [
  {
    id: "1",
    title: "Web Development",
  },
  {
    id: "2",
    title: "Entrepreneurship",
  },
  {
    id: "3",
    title: "Data Analysis",
  },
  {
    id: "4",
    title: "Cryptography",
  },
  {
    id: "5",
    title: "Blockchain",
  },
  {
    id: "6",
    title: "Cloud Applications",
  },
];
let PageSize = 8;
const Filter = ({ name, handleClickOption }) => (
  <div className="flex gap-x-2 items-center">
    <input
      onClick={handleClickOption}
      type="checkbox"
      style={{ width: "30px", height: "30px" }}
      className="cursor-pointer"
    ></input>
    <span className="text-xl">{name}</span>
  </div>
);
Filter.propTypes = {
  name: PropTypes.string,
  handleClickOption: PropTypes.func,
};

const CourseCatalog = ({ allCourses }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return allCourses.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, allCourses]);
  
  const navigate = useNavigate();
  const location = useLocation();
  const handleCourseClick = (course) => {
    navigate(`/learn/${course.courseSlug}`, {
        state: { courseId: course._id },
    });
  };

  const handleClickOption = (option, e) => {
    const checked = e.target.checked;
    const queryParams = new URLSearchParams(location.search);

    // Get current category values as an array
    let categories = queryParams.getAll("categoryName");

    if (checked) {
      if (!categories.includes(option)) {
        categories.push(option);
      }
    } else {
      categories = categories.filter((category) => category !== option);
    }

    queryParams.delete("categoryName");
    categories.forEach((category) =>
      queryParams.append("categoryName", category)
    );

    // Update the URL
    navigate(`/?${queryParams.toString()}`);
  };
  return (
    <div className="flex">
      <div className="w-1/6 ml-16 flex flex-col py-20 gap-y-3">
        <h3 className="text-2xl font-medium mb-10">Filter by</h3>
        {optionsFilterBy.map((option) => (
          <Filter
            key={option.id}
            name={option.title}
            handleClickOption={(e) => handleClickOption(option.title, e)}
          />
        ))}
      </div>
      <div className="sm:flex sm:flex-col sm:gap-y-11 sm:px-10 sm:my-4 max-sm:m-3 gap-y-5 w-5/6">
        <div className="mb-4">
          <h2 className="sm:text-2xl text-3xl font-semibold my-3">
            Course catalog
          </h2>
          <div className="sm:grid grid-cols-4 sm:gap-6 flex flex-col gap-y-4 mb-10">
            {currentTableData?.map((course) => (
              <Course
                onClick={() => handleCourseClick(course)}
                key={course._id}
                title={course.courseTitle}
                description={course.courseDescription}
                imgUrl={course.courseImgUrl}
                avgRating={course.courseRatingAvg}
                price={course.coursePrice}
                reviewers={course.courseLearnerCount}
              />
            ))}
          </div>
          <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={allCourses.length}
              pageSize={PageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
      </div>
    </div>
  );
};

CourseCatalog.propTypes = {
  allCourses: PropTypes.array.isRequired,
};

export default CourseCatalog;
