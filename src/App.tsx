import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import DashboardLayout from "./components/DashboardLayout";
import RiskZonesPage from "./pages/risk-zones/RiskZonesPage";
import Dashboard from "./components/Dashboard";

import Home from "./components/Home";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <div className="flex flex-col min-h-screen">
          <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <h1 className="text-xl font-bold text-indigo-600">
                      Health Analytics
                    </h1>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        `${
                          isActive
                            ? "border-indigo-500 text-gray-900"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`
                      }
                    >
                      Home
                    </NavLink>
                    <NavLink
                      to="/dashboard/risk-zones"
                      className={({ isActive }) =>
                        `${
                          isActive
                            ? "border-indigo-500 text-gray-900"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`
                      }
                    >
                      Risk Zones
                    </NavLink>
                    <NavLink
                      to="/dashboard/healthcare-insights"
                      className={({ isActive }) =>
                        `${
                          isActive
                            ? "border-indigo-500 text-gray-900"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`
                      }
                    >
                      Healthcare Insights
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard/risk-zones" element={<RiskZonesPage />} />
              <Route
                path="/dashboard/healthcare-insights"
                element={<Dashboard />}
              />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
