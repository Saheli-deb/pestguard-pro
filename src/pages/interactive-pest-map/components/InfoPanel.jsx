import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InfoPanel = ({ selectedArea, weatherData, onClose }) => {
  if (!selectedArea) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-agricultural p-4">
        <div className="text-center py-8">
          <Icon name="MapPin" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="font-heading font-medium text-foreground mb-2">
            Select an Area
          </h3>
          <p className="text-sm text-text-secondary">
            Click on the map to view detailed information about pest risks, weather conditions, and recommendations.
          </p>
        </div>
      </div>
    );
  }

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getRiskIcon = (riskLevel) => {
    switch (riskLevel) {
      case 'high': return 'AlertTriangle';
      case 'medium': return 'AlertCircle';
      case 'low': return 'CheckCircle';
      default: return 'Circle';
    }
  };

  const getRecommendations = (pestData) => {
    if (!pestData) return [];
    
    switch (pestData?.riskLevel) {
      case 'high':
        return [
          'Immediate treatment recommended',
          'Apply targeted pesticide within 24-48 hours',
          'Increase monitoring frequency to daily',
          'Consider biological control agents'
        ];
      case 'medium':
        return [
          'Monitor closely for 3-5 days',
          'Prepare treatment equipment',
          'Check neighboring fields',
          'Consider preventive measures'
        ];
      case 'low':
        return [
          'Continue regular monitoring',
          'Maintain current practices',
          'Monitor weather conditions',
          'Document current status'
        ];
      default:
        return ['No specific recommendations'];
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-agricultural">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-heading font-medium text-foreground">Area Details</h3>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="w-6 h-6">
            <Icon name="X" size={14} />
          </Button>
        )}
      </div>
      <div className="p-4 space-y-6">
        {/* Location Info */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">Location</h4>
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="MapPin" size={16} className="text-primary" />
              <span className="text-sm font-data">
                {selectedArea?.lat?.toFixed(4)}, {selectedArea?.lng?.toFixed(4)}
              </span>
            </div>
            {selectedArea?.fieldName && (
              <div className="text-sm text-text-secondary">
                Field: {selectedArea?.fieldName}
              </div>
            )}
          </div>
        </div>

        {/* Pest Information */}
        {selectedArea?.pestData && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Pest Information</h4>
            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Bug" size={16} className="text-red-600" />
                  <span className="text-sm font-medium text-foreground">
                    {selectedArea?.pestData?.pestType}
                  </span>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(selectedArea?.pestData?.riskLevel)}`}>
                  <Icon 
                    name={getRiskIcon(selectedArea?.pestData?.riskLevel)} 
                    size={12} 
                    className="inline mr-1" 
                  />
                  {selectedArea?.pestData?.riskLevel?.toUpperCase()} RISK
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-text-secondary">Severity</div>
                  <div className="font-medium text-foreground">
                    {selectedArea?.pestData?.severity}%
                  </div>
                </div>
                <div>
                  <div className="text-text-secondary">Affected Area</div>
                  <div className="font-medium text-foreground">
                    {selectedArea?.pestData?.affectedArea}
                  </div>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-border">
                <div className="text-text-secondary text-xs">
                  Last Updated: {new Date(selectedArea.pestData.lastUpdated)?.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Weather Information */}
        {weatherData && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Weather Conditions</h4>
            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-3">
                <Icon name="Cloud" size={16} className="text-sky-600" />
                <span className="text-sm font-medium text-foreground">
                  {weatherData?.conditions}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-text-secondary">Temperature</div>
                  <div className="font-medium text-foreground">
                    {weatherData?.temperature}°F
                  </div>
                </div>
                <div>
                  <div className="text-text-secondary">Humidity</div>
                  <div className="font-medium text-foreground">
                    {weatherData?.humidity}%
                  </div>
                </div>
                <div>
                  <div className="text-text-secondary">Wind Speed</div>
                  <div className="font-medium text-foreground">
                    {weatherData?.windSpeed} mph
                  </div>
                </div>
                <div>
                  <div className="text-text-secondary">Precipitation</div>
                  <div className="font-medium text-foreground">
                    {weatherData?.precipitation}"
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommendations */}
        {selectedArea?.pestData && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Recommendations</h4>
            <div className="bg-muted rounded-lg p-3">
              <ul className="space-y-2">
                {getRecommendations(selectedArea?.pestData)?.map((recommendation, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <Icon name="CheckCircle2" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-text-secondary">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col space-y-2">
          <Button variant="default" className="w-full">
            <Icon name="FileText" size={16} className="mr-2" />
            Generate Report
          </Button>
          <Button variant="outline" className="w-full">
            <Icon name="Calendar" size={16} className="mr-2" />
            Schedule Treatment
          </Button>
          <Button variant="outline" className="w-full">
            <Icon name="Share2" size={16} className="mr-2" />
            Share Location
          </Button>
        </div>

        {/* Historical Data Link */}
        <div className="pt-4 border-t border-border">
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Icon name="History" size={16} className="mr-2" />
            View Historical Data for This Area
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;