import StatisticsANimation from "../assets/animation/StatisticsAnimation.json";
import Lottie from "lottie-react";
import StatisticsCard from "./StatisticsCard";
import { useEffect, useState } from "react";
import { userAPIService } from "../apis/UserAPI";

const Statistics = () => {
  // State to store stats
  const [stats, setStats] = useState({
    count: {
      user_count: 0,
      request_count: 0,
      response_count: 0,
    },
  });

  // State of Stats

  const fetchStats = async () => {
    const cacheKey = "statsData";
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);

      // Check if the cache is still valid, e.g., cache for 30 hour
      if (new Date().getTime() - timestamp < 1800000) {
        setStats(data);
        return;
      }
    }

    // If no valid cache, proceed to fetch from API
    await updateStatsFromAPI(cacheKey);
  };

  const updateStatsFromAPI = async (cacheKey) => {
    try {
      const response = await userAPIService.get("api/user/");
      if (response && response.data) {
        const dataToCache = {
          data: response.data,
          timestamp: new Date().getTime(),
        };
        localStorage.setItem(cacheKey, JSON.stringify(dataToCache));
        setStats(response.data);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <section className="w-full bg-backgroundLight text-textWhite">
      <div className="max-w-[1280px] mx-auto p-4 h-fit flex flex-row justify-between items-center py-10">
        <div className="flex-1 flex flex-col gap-10">
          <h1 className="text-3xl md:text-4xl text-textWhite font-quantico">
            Some Numbers <span className="text-textLight">...</span>
          </h1>
          <div className="grid grid-cols-1 w-[300px] md:w-full mx-auto md:grid-cols-2 gap-10">
            <StatisticsCard
              number={stats.count.user_count ? stats.count.user_count : 0}
              title={"Users"}
            />
            <StatisticsCard
              number={stats.count.request_count ? stats.count.request_count : 0}
              title={"Requests"}
            />
            <StatisticsCard
              number={
                stats.count.response_count ? stats.count.response_count : 0
              }
              title={"Reviews"}
            />
            <StatisticsCard
              number={stats.count.request_count ? stats.count.request_count : 0}
              title={"Resumes"}
            />
          </div>
        </div>
        <div className="flex-1 hidden lg:block">
          <Lottie animationData={StatisticsANimation} loop={true} />
        </div>
      </div>
    </section>
  );
};

export default Statistics;
