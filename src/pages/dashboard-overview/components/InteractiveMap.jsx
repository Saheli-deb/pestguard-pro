import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InteractiveMap = ({ mapData, onLayerToggle, onLocationSelect }) => {
  const [activeLayer, setActiveLayer] = useState('satellite');
  const [showControls, setShowControls] = useState(true);

  const mapLayers = [
    { id: 'satellite', name: 'Satellite', icon: 'Satellite', active: true },
    { id: 'weather', name: 'Weather', icon: 'Cloud', active: false },
    { id: 'pest', name: 'Pest Risk', icon: 'Bug', active: true },
    { id: 'treatment', name: 'Treatments', icon: 'Spray', active: false }
  ];

  const pestHotspots = [
    { id: 1, x: 35, y: 45, severity: 'high', pest: 'Corn Rootworm', acres: 12 },
    { id: 2, x: 60, y: 30, severity: 'medium', pest: 'Aphids', acres: 8 },
    { id: 3, x: 25, y: 70, severity: 'critical', pest: 'Cutworm', acres: 15 },
    { id: 4, x: 75, y: 55, severity: 'low', pest: 'Thrips', acres: 5 }
  ];

  const handleLayerToggle = (layerId) => {
    setActiveLayer(layerId);
    onLayerToggle && onLayerToggle(layerId);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-error';
      case 'high': return 'bg-warning';
      case 'medium': return 'bg-accent';
      case 'low': return 'bg-success';
      default: return 'bg-text-secondary';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Map Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-heading font-medium text-foreground">Field Overview</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="xs"
            onClick={() => setShowControls(!showControls)}
            iconName={showControls ? 'EyeOff' : 'Eye'}
            iconSize={14}
          >
            {showControls ? 'Hide' : 'Show'} Controls
          </Button>
          <Button
            variant="ghost"
            size="xs"
            iconName="Maximize2"
            iconSize={14}
          >
            Fullscreen
          </Button>
        </div>
      </div>
      {/* Map Container */}
      <div className="relative h-96 bg-muted">
        {/* Mock Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200">
          {/* Field Boundaries */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <pattern id="fieldPattern" patternUnits="userSpaceOnUse" width="20" height="20">
                <rect width="20" height="20" fill="rgba(45, 80, 22, 0.1)" />
                <path d="M 0 20 L 20 0" stroke="rgba(45, 80, 22, 0.2)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#fieldPattern)" />
            
            {/* Field Sections */}
            <rect x="10%" y="20%" width="35%" height="60%" fill="rgba(34, 197, 94, 0.3)" stroke="rgba(34, 197, 94, 0.6)" strokeWidth="2" rx="4" />
            <rect x="55%" y="15%" width="35%" height="70%" fill="rgba(34, 197, 94, 0.3)" stroke="rgba(34, 197, 94, 0.6)" strokeWidth="2" rx="4" />
          </svg>

          {/* Pest Hotspots */}
          {pestHotspots?.map((hotspot) => (
            <div
              key={hotspot?.id}
              className={`absolute w-6 h-6 ${getSeverityColor(hotspot?.severity)} rounded-full border-2 border-white shadow-agricultural cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-agricultural`}
              style={{ left: `${hotspot?.x}%`, top: `${hotspot?.y}%` }}
              onClick={() => onLocationSelect && onLocationSelect(hotspot)}
              title={`${hotspot?.pest} - ${hotspot?.severity} risk`}
            >
              <div className="absolute inset-0 rounded-full animate-ping opacity-75" />
            </div>
          ))}

          {/* Weather Overlay (when active) */}
          {activeLayer === 'weather' && (
            <div className="absolute inset-0 bg-blue-500/20 pointer-events-none">
              <div className="absolute top-1/4 left-1/3 text-blue-600">
                <Icon name="CloudRain" size={24} />
              </div>
              <div className="absolute top-1/2 right-1/4 text-yellow-500">
                <Icon name="Sun" size={20} />
              </div>
            </div>
          )}
        </div>

        {/* Map Controls */}
        {showControls && (
          <div className="absolute top-4 right-4 bg-card border border-border rounded-lg shadow-agricultural-lg p-2 space-y-2">
            {mapLayers?.map((layer) => (
              <button
                key={layer?.id}
                onClick={() => handleLayerToggle(layer?.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-agricultural w-full ${
                  activeLayer === layer?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={layer?.icon} size={16} />
                <span>{layer?.name}</span>
              </button>
            ))}
          </div>
        )}

        {/* Zoom Controls */}
        <div className="absolute bottom-4 right-4 bg-card border border-border rounded-lg shadow-agricultural-lg">
          <Button variant="ghost" size="icon" className="rounded-b-none border-b border-border">
            <Icon name="Plus" size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-t-none">
            <Icon name="Minus" size={16} />
          </Button>
        </div>

        {/* Scale */}
        <div className="absolute bottom-4 left-4 bg-card border border-border rounded px-2 py-1 text-xs text-text-secondary">
          1 inch = 100 acres
        </div>
      </div>
      {/* Map Legend */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-sm font-medium text-foreground">Risk Levels:</div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-success rounded-full" />
                <span className="text-xs text-text-secondary">Low</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-accent rounded-full" />
                <span className="text-xs text-text-secondary">Medium</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-warning rounded-full" />
                <span className="text-xs text-text-secondary">High</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-error rounded-full" />
                <span className="text-xs text-text-secondary">Critical</span>
              </div>
            </div>
          </div>
          <div className="text-xs text-text-secondary">
            Last updated: {mapData?.lastUpdated}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;