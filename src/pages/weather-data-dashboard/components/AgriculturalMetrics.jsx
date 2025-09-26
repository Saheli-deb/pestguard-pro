import React from 'react';
import Icon from '../../../components/AppIcon';

const AgriculturalMetrics = ({ metrics }) => {
  const getMetricIcon = (type) => {
    switch (type) {
      case 'gdd': return 'Thermometer';
      case 'leafWetness': return 'Droplets';
      case 'sprayWindow': return 'Spray';
      case 'soilTemp': return 'Mountain';
      case 'evapotranspiration': return 'Sun';
      default: return 'Activity';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'optimal': return 'text-success bg-success/10';
      case 'caution': return 'text-warning bg-warning/10';
      case 'poor': return 'text-error bg-error/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-agricultural">
      <h3 className="font-heading font-medium text-foreground mb-6">Agricultural Metrics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics?.map((metric) => (
          <div key={metric?.id} className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Icon name={getMetricIcon(metric?.type)} size={16} className="text-primary" />
                <span className="font-medium text-foreground text-sm">{metric?.name}</span>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric?.status)}`}>
                {metric?.status}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-heading font-semibold text-foreground">
                  {metric?.value}
                </span>
                <span className="text-sm text-text-secondary">{metric?.unit}</span>
              </div>
              
              {metric?.threshold && (
                <div className="text-xs text-text-secondary">
                  Threshold: {metric?.threshold}
                </div>
              )}
              
              {metric?.recommendation && (
                <div className="text-xs text-foreground bg-muted rounded p-2 mt-2">
                  <Icon name="Lightbulb" size={12} className="inline mr-1" />
                  {metric?.recommendation}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgriculturalMetrics;