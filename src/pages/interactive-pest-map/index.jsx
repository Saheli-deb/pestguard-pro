import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import MapContainer from './components/MapContainer';
import LayerControls from './components/LayerControls';
import TimelineSlider from './components/TimelineSlider';
import SearchPanel from './components/SearchPanel';
import InfoPanel from './components/InfoPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const InteractivePestMap = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isControlPanelCollapsed, setIsControlPanelCollapsed] = useState(false);
  const [selectedLayers, setSelectedLayers] = useState({
    satellite: true,
    weather: false,
    pestPrediction: true,
    historical: false,
    farmBoundaries: true
  });
  const [selectedArea, setSelectedArea] = useState(null);
  const [timelineValue, setTimelineValue] = useState(0);
  const [isTimelinePlaying, setIsTimelinePlaying] = useState(false);
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [activeTab, setActiveTab] = useState('layers'); // 'layers', 'search', 'info'

  // Mock weather data
  const weatherData = {
    temperature: 72,
    humidity: 68,
    windSpeed: 12,
    precipitation: 0.2,
    conditions: 'Partly Cloudy'
  };

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleMobileSidebarToggle = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleMobileSidebarClose = () => {
    setIsMobileSidebarOpen(false);
  };

  const handleLayerToggle = (layerId, enabled) => {
    setSelectedLayers(prev => ({
      ...prev,
      [layerId]: enabled
    }));
  };

  const handleAreaSelect = (area) => {
    setSelectedArea(area);
    setActiveTab('info');
  };

  const handleTimelineChange = (value) => {
    setTimelineValue(value);
  };

  const handleTimelinePlayToggle = (playing) => {
    setIsTimelinePlaying(playing);
  };

  const handleDrawingModeToggle = (enabled) => {
    setIsDrawingMode(enabled);
  };

  const handleDrawingComplete = (annotation) => {
    console.log('Drawing completed:', annotation);
  };

  const handleLocationSelect = (location) => {
    setSelectedArea(location);
    setActiveTab('info');
  };

  const handleFieldSelect = (field) => {
    setSelectedArea(field);
    setActiveTab('info');
  };

  const handleControlPanelToggle = () => {
    setIsControlPanelCollapsed(!isControlPanelCollapsed);
  };

  // Calculate sidebar width for layout
  const sidebarWidth = isSidebarCollapsed ? 64 : 240;
  const controlPanelWidth = isControlPanelCollapsed ? 0 : 320;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        onMenuToggle={handleMobileSidebarToggle}
        isMenuOpen={isMobileSidebarOpen}
      />

      {/* Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={handleSidebarToggle}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={handleMobileSidebarClose}
      />

      {/* Main Content */}
      <div 
        className="pt-16 transition-all duration-300 ease-agricultural"
        style={{ 
          marginLeft: `${sidebarWidth}px`,
          marginRight: `${controlPanelWidth}px`
        }}
      >
        {/* Map Container */}
        <div className="relative h-[calc(100vh-4rem)]">
          <MapContainer
            selectedLayers={selectedLayers}
            onAreaSelect={handleAreaSelect}
            selectedArea={selectedArea}
            timelineValue={timelineValue}
            isDrawingMode={isDrawingMode}
            onDrawingComplete={handleDrawingComplete}
          />

          {/* Mobile Control Panel Toggle */}
          <div className="lg:hidden absolute top-4 right-4 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={handleControlPanelToggle}
              className="bg-card shadow-agricultural"
            >
              <Icon name={isControlPanelCollapsed ? "ChevronLeft" : "ChevronRight"} size={16} />
            </Button>
          </div>

          {/* Timeline Slider - Bottom */}
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <div className="max-w-2xl mx-auto">
              <TimelineSlider
                onTimeChange={handleTimelineChange}
                isPlaying={isTimelinePlaying}
                onPlayToggle={handleTimelinePlayToggle}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Control Panel */}
      <div 
        className={`fixed top-16 right-0 h-[calc(100vh-4rem)] bg-background border-l border-border transition-all duration-300 ease-agricultural z-[700] ${
          isControlPanelCollapsed ? 'translate-x-full' : 'translate-x-0'
        }`}
        style={{ width: `${controlPanelWidth}px` }}
      >
        <div className="flex flex-col h-full">
          {/* Panel Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-card">
            <div className="flex items-center space-x-1">
              <Button
                variant={activeTab === 'layers' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('layers')}
              >
                <Icon name="Layers" size={16} className="mr-1" />
                Layers
              </Button>
              <Button
                variant={activeTab === 'search' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('search')}
              >
                <Icon name="Search" size={16} className="mr-1" />
                Search
              </Button>
              <Button
                variant={activeTab === 'info' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('info')}
              >
                <Icon name="Info" size={16} className="mr-1" />
                Info
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleControlPanelToggle}
              className="w-6 h-6"
            >
              <Icon name="X" size={14} />
            </Button>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'layers' && (
              <LayerControls
                selectedLayers={selectedLayers}
                onLayerToggle={handleLayerToggle}
                onDrawingModeToggle={handleDrawingModeToggle}
                isDrawingMode={isDrawingMode}
              />
            )}

            {activeTab === 'search' && (
              <SearchPanel
                onLocationSelect={handleLocationSelect}
                onFieldSelect={handleFieldSelect}
              />
            )}

            {activeTab === 'info' && (
              <InfoPanel
                selectedArea={selectedArea}
                weatherData={weatherData}
                onClose={() => setSelectedArea(null)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Control Panel Overlay */}
      {!isControlPanelCollapsed && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-[600]"
          onClick={handleControlPanelToggle}
        />
      )}

      {/* Floating Action Button for Mobile */}
      <div className="lg:hidden fixed bottom-20 right-4 z-[800]">
        <div className="flex flex-col space-y-2">
          <Button
            variant="default"
            size="icon"
            onClick={() => {
              setActiveTab('layers');
              setIsControlPanelCollapsed(false);
            }}
            className="w-12 h-12 rounded-full shadow-agricultural-lg"
          >
            <Icon name="Layers" size={20} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setActiveTab('search');
              setIsControlPanelCollapsed(false);
            }}
            className="w-12 h-12 rounded-full shadow-agricultural-lg bg-card"
          >
            <Icon name="Search" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InteractivePestMap;