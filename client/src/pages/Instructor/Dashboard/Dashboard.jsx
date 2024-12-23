import { useEffect, useRef, useState } from "react";
import { Chart, BarController, LineController, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import getInstructorStats from "../../../apis/dashboard/getInstructorStats";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
Chart.register(BarController, LineController, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend);

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchError, setIsFetchError] = useState(false);
  const barChartRef = useRef(null);
  const lineChartRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchStats() {
      try {
        const response = await getInstructorStats();
        if (!response || !response.data) {
          throw new Error("No data returned from API");
        }
        console.log("Fetched stats:", response.data);
        if (isMounted) {
          setStats(response.data);
          toast("Successfully fetched dashboard stats!", { type: "success", autoClose: 1000 });
          setIsFetchError(false);
        }
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        if (isMounted) {
          setStats(null);
          setIsFetchError(true);
          toast("Failed to fetch dashboard stats", { type: "error", autoClose: 2000 });
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
    if (barChartRef.current) {
      barChartRef.current.destroy();
    }
    if (lineChartRef.current) {
      lineChartRef.current.destroy();
    }

    if (stats) {
      const barCtx = document.getElementById("barChart").getContext("2d");
      barChartRef.current = new Chart(barCtx, {
        type: "bar",
        data: {
          labels: stats.coursesByRating.map((course) => course.title),
          datasets: [
            {
              label: "Average Rating",
              data: stats.coursesByRating.map((course) => course.rating),
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
            {
              label: "Learners",
              data: stats.coursesByLearners.map((course) => course.learners),
              backgroundColor: "rgba(153, 102, 255, 0.6)",
            },
          ],
        },
        options: {
          maintainAspectRatio: true, // Đảm bảo biểu đồ giữ tỷ lệ
          responsive: true,
          plugins: {
            tooltip: {
              enabled: true,
            },
            legend: {
              display: true,
            },
          },
          scales: {
            x: {
              ticks: {
                maxRotation: 90,
                minRotation: 75,
              },
            },
          },
        },
      });

      const lineCtx = document.getElementById("lineChart").getContext("2d");
      lineChartRef.current = new Chart(lineCtx, {
        type: "line",
        data: {
          labels: generateMonthlyData(stats.monthlyLearners).map((month) => `${month.month}`),
          datasets: [
            {
              label: "Learners",
              data: generateMonthlyData(stats.monthlyLearners).map((month) => month.count),
              backgroundColor: "rgba(255, 159, 64, 0.6)",
              borderColor: "rgba(255, 159, 64, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          maintainAspectRatio: true,
          responsive: true,
          plugins: {
            tooltip: {
              enabled: true,
            },
            legend: {
              display: true,
            },
          },
        },
      });
    }
  }, [stats]);

  const generateMonthlyData = (monthlyData) => {
    const allMonths = [
      "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];

    const completeData = allMonths.map((month, index) => {
      const existingData = monthlyData.find((data) => data.month === index + 1);
      return {
        month,
        count: existingData ? existingData.count : 0, // Nếu không có dữ liệu thì count = 0
      };
    });

    return completeData;
  };

  if (isLoading) return <div>Loading...</div>;
  if (isFetchError || !stats) return <div>Oops. Something went wrong.</div>;

  return (
    <div className="dashboard-container min-h-screen p-4 flex flex-col items-center justify-center">
      <div className="stats grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 w-full max-w-4xl">
        <div className="stat-item bg-white shadow-md rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Courses</h3>
          <p className="text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
        </div>
        <div className="stat-item bg-white shadow-md rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Learners</h3>
          <p className="text-2xl font-bold text-gray-900">{stats.totalLearners}</p>
        </div>
      </div>
      <div className="charts flex flex-col items-center gap-10 max-w-7xl w-full">
        <div className="chart bg-white shadow-md rounded-lg p-6 w-full">
          <h3 className="text-lg font-semibold text-gray-600 mb-4">Course Rankings</h3>
          <canvas id="barChart"></canvas>
        </div>
        <div className="chart bg-white shadow-md rounded-lg p-6 w-full">
          <h3 className="text-lg font-semibold text-gray-600 mb-4">Monthly Learners</h3>
          <canvas id="lineChart"></canvas>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
