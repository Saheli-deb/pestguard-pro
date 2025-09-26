import React from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const LayerControls = ({ selectedLayers, onLayerToggle, onDrawingModeToggle, isDrawingMode }) => {
  const layerOptions = [
    {
      id: 'satellite',
      label: 'Satellite Imagery',
      icon: 'Satellite',
      description: 'High-resolution satellite view',
      color: 'text-blue-600'
    },
    {
      id: 'weather',
      label: 'Weather Radar',
      icon: 'Cloud',
      description: 'Real-time weather conditions',
      color: 'text-sky-600'
    },
    {
      id: 'pestPrediction',
      label: 'Pest Predictions',
      icon: 'Bug',
      description: 'AI-powered infestation forecasts',
      color: 'text-red-600'
    },
    {
      id: 'historical',
      label: 'Historical Data',
      icon: 'History',
      description: 'Past infestation records',
      color: 'text-gray-600'
    },
    {
      id: 'farmBoundaries',
      label: 'Farm Boundaries',
      icon: 'MapPin',
      description: 'Field and property lines',
      color: 'text-green-600'
    }
  ];

  const handleLayerChange = (layerId, checked) => {
    onLayerToggle(layerId, checked);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-agricultural p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-medium text-foreground">Map Layers</h3>
        <Icon name="Layers" size={18} className="text-text-secondary" />
      </div>
      <div className="space-y-3">
        {layerOptions?.map((layer) => (
          <div key={layer?.id} className="flex items-start space-x-3">
            <Checkbox
              checked={selectedLayers?.[layer?.id] || false}
              onChange={(e) => handleLayerChange(layer?.id, e?.target?.checked)}
              className="mt-0.5"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <Icon name={layer?.icon} size={16} className={layer?.color} />
                <label className="text-sm font-medium text-foreground cursor-pointer">
                  {layer?.label}
                </label>
              </div>
              <p className="text-xs text-text-secondary mt-1">{layer?.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-border mt-4 pt-4">
        <h4 className="font-heading font-medium text-foreground mb-3">Drawing Tools</h4>
        <div className="flex items-center space-x-3">
          <Checkbox
            checked={isDrawingMode}
            onChange={(e) => onDrawingModeToggle(e?.target?.checked)}
          />
          <div className="flex items-center space-x-2">
            <Icon name="Edit3" size={16} className="text-accent" />
            <label className="text-sm font-medium text-foreground cursor-pointer">
              Mark Treatment Areas
            </label>
          </div>
        </div>
        <p className="text-xs text-text-secondary mt-1 ml-6">
          Click on map to add treatment markers
        </p>
      </div>
      <div className="border-t border-border mt-4 pt-4">
        <h4 className="font-heading font-medium text-foreground mb-3">Legend</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-xs text-text-secondary">High Risk</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-xs text-text-secondary">Medium Risk</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-xs text-text-secondary">Low Risk</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span className="text-xs text-text-secondary">Treatment Areas</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayerControls;