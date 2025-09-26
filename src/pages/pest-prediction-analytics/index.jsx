import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import PredictionMetrics from './components/PredictionMetrics';
import PestPopulationChart from './components/PestPopulationChart';
import EnvironmentalCorrelation from './components/EnvironmentalCorrelation';
import TreatmentEfficacy from './components/TreatmentEfficacy';
import ComparisonSection from './components/ComparisonSection';
import ModelExplanation from './components/ModelExplanation';
import AdvancedFilters from './components/AdvancedFilters';
import ExportReports from './components/ExportReports';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const PestPredictionAnalytics = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [filters, setFilters] = useState({});
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    // Update last updated time every minute
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleMobileSidebarToggle = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const handleMobileSidebarClose = () => {
    setMobileSidebarOpen(false);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // In a real application, this would trigger data refetch
    console.log('Filters updated:', newFilters);
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'LayoutDashboard' },
    { id: 'predictions', name: 'Predictions', icon: 'TrendingUp' },
    { id: 'correlations', name: 'Correlations', icon: 'GitBranch' },
    { id: 'treatments', name: 'Treatments', icon: 'Beaker' },
    { id: 'comparisons', name: 'Comparisons', icon: 'BarChart3' },
    { id: 'model-insights', name: 'Model Insights', icon: 'Brain' },
    { id: 'reports', name: 'Reports', icon: 'FileText' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <PredictionMetrics />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <PestPopulationChart />
              <div className="space-y-6">
                <div className="bg-card rounded-lg border border-border p-6">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                    Quick Insights
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-3 bg-error/10 border border-error/20 rounded-lg">
                      <Icon name="AlertTriangle" size={20} className="text-error mt-0.5" />
                      <div>
                        <div className="font-medium text-error">High Risk Alert</div>
                        <div className="text-sm text-error/80">
                          Corn rootworm activity 40% above threshold in Field 7-A
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                      <Icon name="Clock" size={20} className="text-warning mt-0.5" />
                      <div>
                        <div className="font-medium text-warning">Treatment Window</div>
                        <div className="text-sm text-warning/80">
                          Optimal treatment timing: Next 3-5 days
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-success/10 border border-success/20 rounded-lg">
                      <Icon name="CheckCircle" size={20} className="text-success mt-0.5" />
                      <div>
                        <div className="font-medium text-success">Model Confidence</div>
                        <div className="text-sm text-success/80">
                          Prediction accuracy: 89% based on current data
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'predictions':
        return <PestPopulationChart />;
      case 'correlations':
        return <EnvironmentalCorrelation />;
      case 'treatments':
        return <TreatmentEfficacy />;
      case 'comparisons':
        return <ComparisonSection />;
      case 'model-insights':
        return <ModelExplanation />;
      case 'reports':
        return <ExportReports />;
      default:
        return <PredictionMetrics />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onMenuToggle={handleMobileSidebarToggle}
        isMenuOpen={mobileSidebarOpen}
      />
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={handleSidebarToggle}
        isMobileOpen={mobileSidebarOpen}
        onMobileClose={handleMobileSidebarClose}
      />
      <main 
        className={`pt-16 transition-all duration-300 ease-agricultural ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
        }`}
      >
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
                  Pest Prediction Analytics
                </h1>
                <p className="text-text-secondary">
                  AI-powered forecasts and risk assessments for proactive pest management decisions
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <Icon name="RefreshCw" size={16} />
                  <span>Last updated: {lastUpdated?.toLocaleTimeString()}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="RefreshCw"
                  iconPosition="left"
                  iconSize={16}
                >
                  Refresh Data
                </Button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          <AdvancedFilters
            onFiltersChange={handleFiltersChange}
            isVisible={filtersVisible}
            onToggle={() => setFiltersVisible(!filtersVisible)}
          />

          {/* Navigation Tabs - Mobile Responsive */}
          <div className="mb-6">
            <div className="border-b border-border">
              <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-agricultural ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-foreground hover:border-border'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span className="hidden sm:inline">{tab?.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {renderTabContent()}
          </div>

          {/* Data Status Footer */}
          <div className="mt-8 p-4 bg-muted rounded-lg">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span>Satellite Data: Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span>Weather API: Connected</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-warning rounded-full" />
                  <span>Drone Data: Syncing</span>
                </div>
              </div>
              <div className="text-sm text-text-secondary">
                Next model update: {new Date(Date.now() + 24 * 60 * 60 * 1000)?.toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PestPredictionAnalytics;