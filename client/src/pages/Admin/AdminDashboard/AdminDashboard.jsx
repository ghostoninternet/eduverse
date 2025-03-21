import { useEffect, useRef, useState } from "react";
import { Chart, BarController, LineController, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend, Title } from "chart.js";
import getAdminStats from "../../../apis/dashboard/getAdminStats";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Chart.register(BarController, LineController, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend, Title);

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchError, setIsFetchError] = useState(false);
  const userChartRef = useRef(null);
  const topCoursesChartRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchStats() {
      try {
        const response = await getAdminStats();
        if (!response || !response.data) {
          throw new Error("No data returned from API");
        }
        if (isMounted) {
          setStats(response.data);
          toast("Successfully fetched admin stats!", { type: "success", autoClose: 1000 });
          setIsFetchError(false);
        }
      } catch (error) {
        console.error("Error fetching admin stats:", error);
        if (isMounted) {
          setStats(null);
          setIsFetchError(true);
          toast("Failed to fetch admin stats", { type: "error", autoClose: 2000 });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (userChartRef.current) {
      userChartRef.current.destroy();
    }
    if (topCoursesChartRef.current) {
      topCoursesChartRef.current.destroy();
    }

    if (stats) {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const usersData = Array(12).fill(0);
      const instructorsData = Array(12).fill(0);

      stats.monthlyStats.forEach((item) => {
        if (item._id.role === "user") {
          usersData[item._id.month - 1] = item.count;
        } else if (item._id.role === "instructor") {
          instructorsData[item._id.month - 1] = item.count;
        }
      });

      const userCtx = document.getElementById("userChart").getContext("2d");
      userChartRef.current = new Chart(userCtx, {
        type: "line",
        data: {
          labels: months,
          datasets: [
            {
              label: "Users",
              data: usersData,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 1,
            },
            {
              label: "Instructors",
              data: instructorsData,
              borderColor: "rgba(255, 159, 64, 1)",
              backgroundColor: "rgba(255, 159, 64, 0.2)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: { enabled: true },
            legend: { display: true },
            title: {
              display: true,
              text: "Monthly User Growth by Role",
            },
          },
        },
      });

      const coursesCtx = document.getElementById("topCoursesChart").getContext("2d");
      topCoursesChartRef.current = new Chart(coursesCtx, {
        type: "bar",
        data: {
          labels: stats.topCoursesByRating.map((course) => course.courseTitle),
          datasets: [
            {
              label: "Average Rating",
              data: stats.topCoursesByRating.map((course) => course.courseRatingAvg),
              backgroundColor: "rgba(255, 159, 64, 0.6)",
            },
            {
              label: "Learners",
              data: stats.topCoursesByLearners.map((course) => course.courseLearnerCount),
              backgroundColor: "rgba(153, 102, 255, 0.6)",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: { enabled: true },
            legend: { display: true },
            title: {
              display: true,
              text: "Top Courses Overview",
            },
          },
          scales: {
            x: {
              ticks: { maxRotation: 75, minRotation: 50 },
              title: {
                display: true,
                text: "Courses",
              },
            },
            y: {
              title: {
                display: true,
                text: "Counts",
              },
            },
          },
        },
      });
    }
  }, [stats]);

  if (isLoading) return <div>Loading...</div>;
  if (isFetchError || !stats) return <div>Oops. Something went wrong.</div>;

  return (
    <div className="dashboard-container min-h-screen p-4 flex flex-col items-center justify-center">
      <div className="stats grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 w-full max-w-4xl">
        <div className="stat-item bg-white shadow-md rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Users</h3>
          <p className="text-2xl font-bold text-gray-900">{stats.userStats.users}</p>
        </div>
        <div className="stat-item bg-white shadow-md rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Instructors</h3>
          <p className="text-2xl font-bold text-gray-900">{stats.userStats.instructors}</p>
        </div>
      </div>

      <div className="charts flex flex-col items-center gap-10 max-w-7xl w-full">
        <div className="chart bg-white shadow-md rounded-lg p-6 w-full">
          <h3 className="text-lg font-semibold text-gray-600 mb-4">Monthly Users</h3>
          <canvas id="userChart"></canvas>
        </div>
        <div className="chart bg-white shadow-md rounded-lg p-6 w-full">
          <h3 className="text-lg font-semibold text-gray-600 mb-4">Top Courses</h3>
          <canvas id="topCoursesChart"></canvas>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
