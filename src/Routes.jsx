import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import DashboardOverview from './pages/dashboard-overview';
import LoginPage from './pages/login';
import WeatherDataDashboard from './pages/weather-data-dashboard';
import PestPredictionAnalytics from './pages/pest-prediction-analytics';
import InteractivePestMap from './pages/interactive-pest-map';
import Register from './pages/register';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<DashboardOverview />} />
        <Route path="/dashboard-overview" element={<DashboardOverview />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/weather-data-dashboard" element={<WeatherDataDashboard />} />
        <Route path="/pest-prediction-analytics" element={<PestPredictionAnalytics />} />
        <Route path="/interactive-pest-map" element={<InteractivePestMap />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
