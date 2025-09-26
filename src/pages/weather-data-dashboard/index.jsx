import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import CurrentConditionsCard from './components/CurrentConditionsCard';
import WeatherChart from './components/WeatherChart';
import WeatherAlert from './components/WeatherAlert';
import AgriculturalMetrics from './components/AgriculturalMetrics';
import LocationSelector from './components/LocationSelector';
import DataRefreshIndicator from './components/DataRefreshIndicator';
import IntegrationStatus from './components/IntegrationStatus';

const WeatherDataDashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({ id: 1, name: 'Green Valley Farm', coordinates: '41.5868°N, 93.6250°W' });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [alerts, setAlerts] = useState([]);

  // Mock data for locations
  const locations = [
    { id: 1, name: 'Green Valley Farm', coordinates: '41.5868°N, 93.6250°W' },
    { id: 2, name: 'Sunrise Acres', coordinates: '40.8136°N, 96.7026°W' },
    { id: 3, name: 'Prairie View Ranch', coordinates: '39.0119°N, 95.6890°W' }
  ];

  // Mock data for current conditions
  const currentConditions = [
    {
      id: 1,
      title: 'Temperature',
      value: '72',
      unit: '°F',
      icon: 'Thermometer',
      trend: 'up',
      trendValue: '+3°F',
      severity: null
    },
    {
      id: 2,
      title: 'Humidity',
      value: '85',
      unit: '%',
      icon: 'Droplets',
      trend: 'up',
      trendValue: '+12%',
      severity: 'high'
    },
    {
      id: 3,
      title: 'Wind Speed',
      value: '8',
      unit: 'mph',
      icon: 'Wind',
      trend: 'down',
      trendValue: '-2 mph',
      severity: null
    },
    {
      id: 4,
      title: 'Precipitation',
      value: '0.2',
      unit: 'in',
      icon: 'CloudRain',
      trend: 'up',
      trendValue: '+0.2 in',
      severity: 'medium'
    }
  ];

  // Mock data for weather alerts
  const initialAlerts = [
    {
      id: 1,
      severity: 'severe',
      title: 'Severe Thunderstorm Warning',
      description: 'Severe thunderstorms with damaging winds and hail expected. Delay spray applications and secure equipment.',
      validUntil: 'Aug 28, 8:00 PM',
      issuedAt: '2:30 PM'
    },
    {
      id: 2,
      severity: 'moderate',
      title: 'High Humidity Alert',
      description: 'Extended periods of high humidity create favorable conditions for fungal diseases. Monitor crops closely.',
      validUntil: 'Aug 29, 6:00 AM',
      issuedAt: '12:00 PM'
    }
  ];

  // Mock data for 10-day forecast
  const forecastData = [
    { time: 'Aug 28', temperature: 72, humidity: 85, precipitation: 20 },
    { time: 'Aug 29', temperature: 75, humidity: 78, precipitation: 60 },
    { time: 'Aug 30', temperature: 68, humidity: 82, precipitation: 80 },
    { time: 'Aug 31', temperature: 71, humidity: 75, precipitation: 40 },
    { time: 'Sep 1', temperature: 74, humidity: 70, precipitation: 10 },
    { time: 'Sep 2', temperature: 77, humidity: 68, precipitation: 5 },
    { time: 'Sep 3', temperature: 79, humidity: 72, precipitation: 15 },
    { time: 'Sep 4', temperature: 76, humidity: 76, precipitation: 30 },
    { time: 'Sep 5', temperature: 73, humidity: 80, precipitation: 45 },
    { time: 'Sep 6', temperature: 70, humidity: 83, precipitation: 70 }
  ];

  // Mock data for hourly temperature
  const hourlyData = [
    { time: '6 AM', temperature: 65, humidity: 90 },
    { time: '9 AM', temperature: 68, humidity: 85 },
    { time: '12 PM', temperature: 72, humidity: 80 },
    { time: '3 PM', temperature: 75, humidity: 75 },
    { time: '6 PM', temperature: 73, humidity: 78 },
    { time: '9 PM', temperature: 70, humidity: 82 },
    { time: '12 AM', temperature: 67, humidity: 87 },
    { time: '3 AM', temperature: 64, humidity: 92 }
  ];

  // Mock data for agricultural metrics
  const agriculturalMetrics = [
    {
      id: 1,
      type: 'gdd',
      name: 'Growing Degree Days',
      value: '1,245',
      unit: 'GDD',
      status: 'optimal',
      threshold: '1,200-1,400',
      recommendation: 'Corn development on track for harvest timing'
    },
    {
      id: 2,
      type: 'leafWetness',
      name: 'Leaf Wetness Duration',
      value: '12',
      unit: 'hours',
      status: 'caution',
      threshold: '< 8 hours',
      recommendation: 'Extended wetness increases disease risk'
    },
    {
      id: 3,
      type: 'sprayWindow',
      name: 'Spray Window',
      value: 'Poor',
      unit: '',
      status: 'poor',
      threshold: 'Wind < 10 mph',
      recommendation: 'Wait for calmer conditions before spraying'
    },
    {
      id: 4,
      type: 'soilTemp',
      name: 'Soil Temperature',
      value: '68',
      unit: '°F',
      status: 'optimal',
      threshold: '65-75°F',
      recommendation: 'Ideal for root development'
    },
    {
      id: 5,
      type: 'evapotranspiration',
      name: 'Evapotranspiration',
      value: '0.25',
      unit: 'in/day',
      status: 'optimal',
      threshold: '0.2-0.3 in/day',
      recommendation: 'Normal water usage for current conditions'
    }
  ];

  // Mock data for integration status
  const integrations = [
    {
      id: 1,
      name: 'NOAA Weather Service',
      description: 'National weather data',
      status: 'connected',
      lastSync: '2 min ago'
    },
    {
      id: 2,
      name: 'Weather Underground',
      description: 'Local weather stations',
      status: 'connected',
      lastSync: '5 min ago'
    },
    {
      id: 3,
      name: 'Farm Weather Stations',
      description: 'On-site sensors',
      status: 'warning',
      lastSync: '15 min ago'
    },
    {
      id: 4,
      name: 'Satellite Data',
      description: 'Atmospheric imagery',
      status: 'connected',
      lastSync: '1 min ago'
    }
  ];

  useEffect(() => {
    setAlerts(initialAlerts);
  }, []);

  useEffect(() => {
    let interval;
    if (autoRefresh) {
      interval = setInterval(() => {
        handleRefresh();
      }, 300000); // Refresh every 5 minutes
    }
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleMobileSidebarToggle = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  const handleToggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
  };

  const handleDismissAlert = (alertId) => {
    setAlerts(alerts?.filter(alert => alert?.id !== alertId));
  };

  return (
    <>
      <Helmet>
        <title>Weather Data Dashboard - PestGuard Pro</title>
        <meta name="description" content="Comprehensive weather data dashboard for agricultural pest management and crop protection decisions" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header 
          onMenuToggle={handleMobileSidebarToggle}
          isMenuOpen={isMobileSidebarOpen}
        />
        
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={handleSidebarToggle}
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={() => setIsMobileSidebarOpen(false)}
        />

        <main 
          className={`
            pt-16 transition-all duration-300 ease-agricultural
            ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}
          `}
        >
          <div className="p-6 space-y-6">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-3xl font-heading font-semibold text-foreground">Weather Data Dashboard</h1>
                <p className="text-text-secondary mt-1">
                  Comprehensive meteorological data for informed pest management decisions
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <LocationSelector
                  locations={locations}
                  selectedLocation={selectedLocation}
                  onLocationChange={setSelectedLocation}
                />
              </div>
            </div>

            {/* Data Refresh Indicator */}
            <DataRefreshIndicator
              lastUpdate={new Date(Date.now() - 120000)} // 2 minutes ago
              isRefreshing={isRefreshing}
              onRefresh={handleRefresh}
              autoRefresh={autoRefresh}
              onToggleAutoRefresh={handleToggleAutoRefresh}
            />

            {/* Weather Alerts */}
            {alerts?.length > 0 && (
              <div>
                <h2 className="text-xl font-heading font-medium text-foreground mb-4">Active Weather Alerts</h2>
                <WeatherAlert alerts={alerts} onDismiss={handleDismissAlert} />
              </div>
            )}

            {/* Current Conditions */}
            <div>
              <h2 className="text-xl font-heading font-medium text-foreground mb-4">Current Conditions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentConditions?.map((condition) => (
                  <CurrentConditionsCard
                    key={condition?.id}
                    title={condition?.title}
                    value={condition?.value}
                    unit={condition?.unit}
                    icon={condition?.icon}
                    trend={condition?.trend}
                    trendValue={condition?.trendValue}
                    severity={condition?.severity}
                  />
                ))}
              </div>
            </div>

            {/* Weather Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <WeatherChart
                title="10-Day Temperature Forecast"
                data={forecastData}
                type="line"
                dataKey="temperature"
                color="#2D5016"
                unit="°F"
                height={300}
              />
              
              <WeatherChart
                title="Precipitation Probability"
                data={forecastData}
                type="bar"
                dataKey="precipitation"
                color="#FF6B35"
                unit="%"
                height={300}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <WeatherChart
                title="24-Hour Temperature Trend"
                data={hourlyData}
                type="area"
                dataKey="temperature"
                color="#8B4513"
                unit="°F"
                height={300}
              />
              
              <WeatherChart
                title="24-Hour Humidity Levels"
                data={hourlyData}
                type="line"
                dataKey="humidity"
                color="#059669"
                unit="%"
                height={300}
              />
            </div>

            {/* Agricultural Metrics */}
            <AgriculturalMetrics metrics={agriculturalMetrics} />

            {/* Integration Status */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-card border border-border rounded-lg p-6 shadow-agricultural">
                  <h3 className="font-heading font-medium text-foreground mb-4">Historical Weather Comparison</h3>
                  <div className="text-center py-8 text-text-secondary">
                    <p>Historical weather data comparison tools will be displayed here.</p>
                    <p className="text-sm mt-2">Compare current conditions with previous years and seasonal averages.</p>
                  </div>
                </div>
              </div>
              
              <IntegrationStatus integrations={integrations} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default WeatherDataDashboard;