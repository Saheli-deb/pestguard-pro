import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import AlertCard from './components/AlertCard';
import WeatherWidget from './components/WeatherWidget';
import InteractiveMap from './components/InteractiveMap';
import SummaryPanel from './components/SummaryPanel';
import PestRiskTimeline from './components/PestRiskTimeline';
import QuickActions from './components/QuickActions';

const DashboardOverview = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock data
  const criticalAlerts = [
    {
      id: 1,
      title: 'Critical Pest Infestation Detected',
      description: 'High concentration of corn rootworm larvae found in Field A-North section. Immediate treatment recommended.',
      location: 'Field A-North',
      timestamp: '5 minutes ago',
      affectedAcres: 15,
      severity: 'critical'
    },
    {
      id: 2,
      title: 'Aphid Population Surge',
      description: 'Rapid increase in aphid population detected via drone surveillance. Economic threshold exceeded.',
      location: 'Field B-South',
      timestamp: '12 minutes ago',
      affectedAcres: 8,
      severity: 'high'
    },
    {
      id: 3,
      title: 'Weather Alert - Treatment Window',
      description: 'Optimal spray conditions forecasted for tomorrow morning. Wind speeds favorable for application.',
      location: 'All Fields',
      timestamp: '25 minutes ago',
      affectedAcres: 120,
      severity: 'medium'
    }
  ];

  const weatherData = {
    temperature: 78,
    condition: 'Partly Cloudy',
    humidity: 72,
    windSpeed: 5,
    windDirection: 225,
    pressure: 30.15,
    visibility: 10,
    uvIndex: 6,
    uvLevel: 'High',
    lastUpdated: '2 minutes ago'
  };

  const mapData = {
    lastUpdated: '5 minutes ago',
    activeLayers: ['satellite', 'pest'],
    pestHotspots: 4,
    totalCoverage: '245 acres'
  };

  const summaryData = {
    totalAcres: 245,
    activeFields: 4,
    alertsCount: 3,
    treatmentEfficiency: 87
  };

  const timelineData = {
    forecastDays: 7,
    highRiskDays: 2,
    optimalTreatmentWindows: 3
  };

  // Event handlers
  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleMobileSidebarToggle = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleMobileSidebarClose = () => {
    setIsMobileSidebarOpen(false);
  };

  const handleAlertView = (alert) => {
    setSelectedAlert(alert);
    // Navigate to detailed alert view or open modal
    console.log('Viewing alert:', alert);
  };

  const handleAlertDismiss = (alertId) => {
    console.log('Dismissing alert:', alertId);
    // Remove alert from list
  };

  const handleMapLayerToggle = (layerId) => {
    console.log('Toggling map layer:', layerId);
  };

  const handleLocationSelect = (location) => {
    console.log('Selected location:', location);
    // Show location details or navigate to detailed view
  };

  const handleSummaryAction = (action) => {
    console.log('Summary action:', action);
    switch (action) {
      case 'spray-schedule': navigate('/weather-data-dashboard');
        break;
      case 'drone-data': navigate('/interactive-pest-map');
        break;
      case 'generate-report':
        // Open report generation modal
        break;
      case 'schedule-treatment':
        // Open treatment scheduling modal
        break;
      case 'refresh-data':
        setLastUpdated(new Date());
        break;
      default:
        break;
    }
  };

  const handleTimelineSelect = (dateData) => {
    console.log('Selected timeline date:', dateData);
    // Show detailed forecast for selected date
  };

  const handleQuickAction = (actionId) => {
    console.log('Quick action:', actionId);
    switch (actionId) {
      case 'alerts':
        // Open alerts management
        break;
      case 'reports':
        // Open report generation
        break;
      case 'schedule':
        // Open treatment scheduling
        break;
      case 'data-refresh-complete':
        setLastUpdated(new Date());
        break;
      default:
        break;
    }
  };

  // Auto-refresh data every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onMenuToggle={handleMobileSidebarToggle}
        isMenuOpen={isMobileSidebarOpen}
      />
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={handleSidebarToggle}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={handleMobileSidebarClose}
      />
      <main className={`pt-16 transition-all duration-300 ease-agricultural ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
      }`}>
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-heading font-semibold text-foreground">
                Dashboard Overview
              </h1>
              <p className="text-text-secondary mt-1">
                Monitor pest threats and manage your farm operations
              </p>
            </div>
            <div className="text-sm text-text-secondary">
              Last updated: {lastUpdated?.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>

          {/* Critical Alerts Row */}
          <div className="space-y-4">
            <h2 className="text-lg font-heading font-medium text-foreground">
              Critical Alerts
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {criticalAlerts?.map((alert) => (
                <AlertCard
                  key={alert?.id}
                  alert={alert}
                  onViewDetails={handleAlertView}
                  onDismiss={handleAlertDismiss}
                />
              ))}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Map and Timeline Section */}
            <div className="xl:col-span-2 space-y-6">
              {/* Interactive Map */}
              <InteractiveMap
                mapData={mapData}
                onLayerToggle={handleMapLayerToggle}
                onLocationSelect={handleLocationSelect}
              />

              {/* Pest Risk Timeline */}
              <PestRiskTimeline
                timelineData={timelineData}
                onDateSelect={handleTimelineSelect}
              />
            </div>

            {/* Sidebar Content */}
            <div className="space-y-6">
              {/* Weather Widget */}
              <WeatherWidget weatherData={weatherData} />

              {/* Summary Panel */}
              <SummaryPanel
                summaryData={summaryData}
                onActionClick={handleSummaryAction}
              />

              {/* Quick Actions */}
              <QuickActions onActionClick={handleQuickAction} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardOverview;