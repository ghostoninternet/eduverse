import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import getEnrolledCourseList from "../apis/enrolled-course/getEnrolledCourseList";
const CourseContext = createContext();

export function useCourse() {
  return useContext(CourseContext);
}

function CourseProvider({ children }) {
  const [completedCourses, setCompletedCourses] = useState([]);
  const [inProgressCourses, setInProgressCourses] = useState([]);

  useEffect(() => {
    const fetchCompletedCourses = async () => {
      try {
        const data = await getEnrolledCourseList.getCompletedEnrolledCourses();
        setCompletedCourses(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setCompletedCourses(null);
      }
    };

    fetchCompletedCourses();
  }, []);

  useEffect(() => {
    const fetchInProgressCourses = async () => {
      try {
        const data = await getEnrolledCourseList.getInProgressEnrolledCourses();
        setInProgressCourses(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setInProgressCourses(null);
      }
    };

    fetchInProgressCourses();
  }, []);
  return (
    <CourseContext.Provider
      value={{
        completedCourses,
        setCompletedCourses,
        inProgressCourses,
        setInProgressCourses,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

CourseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CourseProvider;
