import { useEffect, useRef, useState } from "react";
import { Chart, BarController, LineController, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import getAdminStats from "../../../apis/dashboard/getAdminStats";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Chart.register(BarController, LineController, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend);

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
      const userCtx = document.getElementById("userChart").getContext("2d");
      userChartRef.current = new Chart(userCtx, {
        type: "line",
        data: {
          labels: stats.monthlyStats.map((month) => month.month),
          datasets: [
            {
              label: "Users",
              data: stats.monthlyStats.map((data) => data.users),
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: { enabled: true },
            legend: { display: true },
          },
        },
      });

      const coursesCtx = document.getElementById("topCoursesChart").getContext("2d");
      topCoursesChartRef.current = new Chart(coursesCtx, {
        type: "bar",
        data: {
          labels: stats.topCoursesByRating.map((course) => course.title),
          datasets: [
            {
              label: "Average Rating",
              data: stats.topCoursesByRating.map((course) => course.rating),
              backgroundColor: "rgba(255, 159, 64, 0.6)",
            },
            {
              label: "Learners",
              data: stats.topCoursesByLearners.map((course) => course.learners),
              backgroundColor: "rgba(153, 102, 255, 0.6)",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: { enabled: true },
            legend: { display: true },
          },
          scales: {
            x: { ticks: { maxRotation: 75, minRotation: 50 } },
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
          <p className="text-2xl font-bold text-gray-900">{stats.userStats.totalUsers}</p>
        </div>
        <div className="stat-item bg-white shadow-md rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Instructors</h3>
          <p className="text-2xl font-bold text-gray-900">{stats.userStats.totalInstructors}</p>
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
