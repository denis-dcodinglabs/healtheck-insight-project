import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BarChart, LineChart } from "./Charts";
import { fetchHealthcareData } from "../services/healthcareApi";
import { Activity, Heart, TrendingUp } from "lucide-react";
import CountrySelector from "./CountrySelector";
import InsightCard from "./InsightCard";

const Dashboard: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("USA");
  const [selectedYear, setSelectedYear] = useState<number>(2021); // Most recent complete data year

  const { data: healthData, isLoading } = useQuery({
    queryKey: ["healthData", selectedCountry, selectedYear],
    queryFn: () => fetchHealthcareData(selectedCountry, selectedYear),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Healthcare Insights Dashboard
        </h1>
        <p className="text-gray-600">
          Analyzing the relationship between healthcare spending and outcomes
        </p>
      </header>

      <div className="flex justify-end mb-6">
        <CountrySelector
          value={selectedCountry}
          onChange={setSelectedCountry}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <InsightCard
          title="Healthcare Spending"
          value={`${healthData?.spending?.toFixed(1) ?? "N/A"}%`}
          description="of GDP"
          icon={<TrendingUp className="h-6 w-6 text-blue-500" />}
        />
        <InsightCard
          title="Life Expectancy"
          value={`${healthData?.lifeExpectancy?.toFixed(1) ?? "N/A"}`}
          description="years"
          icon={<Heart className="h-6 w-6 text-red-500" />}
        />
        <InsightCard
          title="Spending Change"
          value={`${healthData?.diseasePrevalence?.toFixed(1) ?? "N/A"}%`}
          description="over 5 years"
          icon={<Activity className="h-6 w-6 text-green-500" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            Healthcare Spending vs Life Expectancy
          </h2>
          <BarChart data={healthData?.spendingVsLife} />
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            Healthcare Spending Trends
          </h2>
          <LineChart data={healthData?.diseaseTrends} />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Country Analysis</h2>
        </div>
        <div className="prose max-w-none">
          <p className="text-gray-700">
            Based on the World Bank data analysis, we can observe that{" "}
            {healthData?.country}
            spends {healthData?.spending?.toFixed(1)}% of its GDP on healthcare,
            resulting in a life expectancy of{" "}
            {healthData?.lifeExpectancy?.toFixed(1)} years. Over the past 5
            years, healthcare spending has changed by{" "}
            {healthData?.diseasePrevalence?.toFixed(1)}%, indicating{" "}
            {healthData?.diseasePrevalence > 0 ? "an increase" : "a decrease"}{" "}
            in healthcare investment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
