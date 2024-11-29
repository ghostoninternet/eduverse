import { useEffect, useState, useRef } from "react";
import StarIcon from "@mui/icons-material/Star";
import { useParams, useNavigate } from "react-router-dom";
import getCourseDetail from "../../apis/course/getCourseDetail";
import Review from "../../components/Review";
import getCourseReview from "../../apis/review/getCourseReview";
const Learn = () => {
  const [isSection, setIsSection] = useState("");
  const { courseId } = useParams();
  const [reviews, setReviews] = useState({ data: [],rating:{}, pagination: {} });
  const [courseDetail, setCourseDetail] = useState({});
  useEffect(() => {
    const fetchedCourse = async () => {
      try {
        const response = await getCourseDetail(courseId);
        setCourseDetail(response);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchedCourse();
  }, [courseId]);

  useEffect(() => {
    const fetchedReview = async () => {
      try {
        const response = await getCourseReview(courseId);
        setReviews(response);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchedReview();
  }, [courseId]);

  const aboutRef = useRef(null);
  const modulesRef = useRef(null);
  const reviewsRef = useRef(null);
  
  const scrollToAbout = () => {
    window.location.hash = "about"
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    }
    setIsSection("About");
  };
  const scrollToModules = () => {
    window.location.hash = "modules"
    if (modulesRef.current) {
      modulesRef.current.scrollIntoView({ behavior: "smooth" });
    }
    setIsSection("Modules");
  };
  const scrollToReviews = () => {
    window.location.hash = "reviews"
    if (reviewsRef.current) {
      reviewsRef.current.scrollIntoView({ behavior: "smooth" });
    }
    setIsSection("Reviews");
  };
  return (
    <div className="">
      <div className="bg-blue-100 px-16 h-[calc(100vh-3rem)] flex items-center">
        <div className="w-5/12">
          <h2 className="text-5xl font-semibold leading-tight">
            {courseDetail.courseTitle}
          </h2>
          <div className="text-xl font-normal mb-9">instructor</div>
          <button className="px-3 py-5 bg-blue-500 font-semibold text-xl text-white rounded-md w-1/3 mb-7">
            Enroll now!
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
            <img src={courseDetail.courseImgUrl} className="w-3/4" />
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
          <li
            className={`hover:bg-blue-100 p-3 rounded-sm hover:text-blue-600 cursor-pointer ${
              isSection == "About" ? "bg-blue-100 text-blue-600" : ""
            }`}
            onClick={scrollToAbout}
          >
            About
          </li>
          <li
            className={`hover:bg-blue-100 p-3 rounded-sm hover:text-blue-600 cursor-pointer ${
              isSection == "Modules" ? "bg-blue-100 text-blue-600" : ""
            }`}
            onClick={scrollToModules}
          >
            Modules
          </li>
          <li
            className={`hover:bg-blue-100 p-3 rounded-sm hover:text-blue-600 cursor-pointer ${
              isSection == "Reviews" ? "bg-blue-100 text-blue-600" : ""
            }`}
            onClick={scrollToReviews}
          >
            Reviews
          </li>
        </ul>
        <div className="my-4" ref={aboutRef}>
          <h3 className="text-2xl font-semibold">What you'll learn</h3>
          <p className="mt-3">{courseDetail.courseDescription}</p>
        </div>
        <div className="my-4" ref={modulesRef}>
          <h3 className="text-2xl font-semibold">
            There are 5 modules in this course
          </h3>
          <div>modules details</div>
        </div>
        <div className="flex gap-x-14" ref={reviewsRef}>
          <div className="w-1/3">
            <h3 className="text-2xl font-semibold mb-10">Learner reviews</h3>
            <div className="flex items-center mb-10">
              <StarIcon color="primary" fontSize="large" />
              <p className="text-4xl font-semibold">
                {courseDetail.courseRatingAvg}
              </p>
              <p className="text-lg place-self-end ml-3">
                {courseDetail.courseReviewCount} reviews
              </p>
            </div>
            <div className="">
              <div className="flex gap-3 items-center">
                <p className="font-semibold text-xl w-1/6 ">5 stars</p>
                <div className="bg-gray-200 h-2 w-2/3 rounded-full">
                  <div
                    className="bg-blue-700 h-2 rounded-full"
                    style={{ width: `${reviews?.rating?.fiveStar}%` }}
                  ></div>
                </div>
                <p className="font-semibold text-lg w-1/6 text-center">{reviews?.rating?.fiveStar}%</p>
              </div>
              <div className="flex gap-3 items-center">
                <p className="font-semibold text-xl w-1/6 ">4 stars</p>
                <div className="bg-gray-200 h-2 w-2/3 rounded-full">
                  <div
                    className="bg-blue-700 h-2 rounded-full"
                    style={{ width: `${reviews?.rating?.fourStar}%` }}
                  ></div>
                </div>
                <p className="font-semibold text-lg w-1/6 text-center">{reviews?.rating?.fourStar}%</p>
              </div>
              <div className="flex gap-3 items-center">
                <p className="font-semibold text-xl w-1/6 ">3 stars</p>
                <div className="bg-gray-200 h-2 w-2/3 rounded-full">
                  <div
                    className="bg-blue-700 h-2 rounded-full"
                    style={{ width: `${reviews?.rating?.threeStar}%` }}
                  ></div>
                </div>
                <p className="font-semibold text-lg w-1/6 text-center">{reviews?.rating?.threeStar}%</p>
              </div>
              <div className="flex gap-3 items-center">
                <p className="font-semibold text-xl w-1/6 ">2 stars</p>
                <div className="bg-gray-200 h-2 w-2/3 rounded-full">
                  <div
                    className="bg-blue-700 h-2 rounded-full"
                    style={{ width: `${reviews?.rating?.twoStar}%` }}
                  ></div>
                </div>
                <p className="font-semibold text-lg w-1/6 text-center">{reviews?.rating?.twoStar}%</p>
              </div>
              <div className="flex gap-3 items-center">
                <p className="font-semibold text-xl w-1/6 ">1 star</p>
                <div className="bg-gray-200 h-2 w-2/3 rounded-full">
                  <div
                    className="bg-blue-700 h-2 rounded-full"
                    style={{ width: `${reviews?.rating?.oneStar}%` }}
                  ></div>
                </div>
                <p className="font-semibold text-lg w-1/6 text-center">{reviews?.rating?.oneStar}%</p>
              </div>
            </div>
          </div>
          <div className="w-2/3 flex flex-col gap-y-10 mb-10">
            {reviews?.data?.map((review) => (
              <Review
                key={review._id}
                avatarUrl={review.userId.avatarUrl}
                username={review.userId.username}
                reviewContent={review.reviewContent}
                createdAt={review.createdAt}
                star={review.ratingStar}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
