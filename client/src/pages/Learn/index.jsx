import  { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { useParams } from "react-router-dom";
const Learn = () => {
  const {courseId} = useParams();
  console.log("courseId:" + courseId);
  const [courseDetail, setCourseDetail] = useState({});
  useEffect(() => {
    const fetchedCourse = async () => {
      try {
        const url = `http://localhost:8000/api/courses/${courseId}`;
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        setCourseDetail(json);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchedCourse();
  }, [courseId]);
  
  return (
    <div className="">
      <div className="bg-blue-100 px-16 h-[calc(100vh-3rem)] flex items-center">
        <div className="w-5/12">
          <h2 className="text-5xl font-semibold leading-tight">
            {courseDetail.courseTitle}
          </h2>
          <div className="text-xl font-normal mb-9">instructor</div>
          <button className="px-3 py-5 bg-blue-500 font-semibold text-xl text-white rounded-md w-1/3 mb-7">
            Enroll for free
          </button>
          <div className="">
            <p className="text-lg">
              <span className="font-semibold">
                {courseDetail.courseLearnerCount}
              </span>{" "}
              already enrolled
            </p>
          </div>
        </div>
        <div className="w-7/12 flex">
          <div className="w-full h-full flex items-center justify-center">
            <img src={courseDetail.courseImgUrl} className="w-3/4"/>
          </div>
        </div>
      </div>
      <div className="px-16">
        <ul className="-translate-y-10 -bottom-12 bg-white shadow-lg border py-6 w-full flex justify-around px-8">
          <li className=" flex flex-col border-r-2 w-4/12 items-center">
            <h3 className="text-2xl font-semibold">5 modules</h3>
            <p className="">
              Gain insight into a topic and learn the fundamentals.
            </p>
          </li>
          <li className="flex flex-col border-r-2 w-2/12 items-center">
            <div className="flex items-center">
              <h3 className="text-2xl font-semibold ">
                {courseDetail.courseRatingAvg}
              </h3>
              <StarIcon color="primary" />
            </div>
            <p className="">({courseDetail.courseReviewCount} reviews)</p>
          </li>
          <li className="flex flex-col border-r-2 w-3/12 items-center">
            <h3 className="text-2xl font-semibold ">hours to complete</h3>
            <p className=""></p>
          </li>
          <li className="flex flex-col w-3/12 items-center">
            <h3 className="text-2xl font-semibold">Flexible schedule</h3>
            <p className="">Learn at your own pace</p>
          </li>
        </ul>
      </div>
      <div className="px-16">
        <ul className="flex text-xl font-semibold gap-x-6 border-b-2 w-2/5 pb-3">
          <li className="hover:bg-blue-100 p-3 rounded-sm hover:text-blue-600 cursor-pointer">
            About
          </li>
          <li className="hover:bg-blue-100 p-3 rounded-sm hover:text-blue-600 cursor-pointer">
            Modules
          </li>
          <li className="hover:bg-blue-100 p-3 rounded-sm hover:text-blue-600 cursor-pointer">
            Reviews
          </li>
        </ul>
        <div className="my-4">
          <h3 className="text-2xl font-semibold">What you'll learn</h3>
          <p className="mt-3">{courseDetail.courseDescription}</p>
        </div>
        <div className="my-4">
          <h3 className="text-2xl font-semibold">
            There are 5 modules in this course
          </h3>
          <div>modules details</div>
        </div>
        <div className="">
          <h3 className="text-2xl font-semibold">Learner reviews</h3>
          <div className="flex">
            <div className="w-1/3">review</div>
            <div className="w-2/3">feedback</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
