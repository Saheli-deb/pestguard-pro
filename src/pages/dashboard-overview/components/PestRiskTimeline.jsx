import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PestRiskTimeline = ({ timelineData, onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const riskLevels = [
    { id: 1, date: '2025-08-28', day: 'Today', risk: 'high', pests: ['Corn Rootworm', 'Aphids'], temperature: 78, humidity: 72 },
    { id: 2, date: '2025-08-29', day: 'Tomorrow', risk: 'critical', pests: ['Cutworm', 'Thrips'], temperature: 82, humidity: 68 },
    { id: 3, date: '2025-08-30', day: 'Fri', risk: 'medium', pests: ['Aphids'], temperature: 75, humidity: 65 },
    { id: 4, date: '2025-08-31', day: 'Sat', risk: 'high', pests: ['Corn Rootworm'], temperature: 79, humidity: 70 },
    { id: 5, date: '2025-09-01', day: 'Sun', risk: 'low', pests: [], temperature: 73, humidity: 58 },
    { id: 6, date: '2025-09-02', day: 'Mon', risk: 'medium', pests: ['Thrips'], temperature: 76, humidity: 62 },
    { id: 7, date: '2025-09-03', day: 'Tue', risk: 'low', pests: [], temperature: 71, humidity: 55 }
  ];

  const getRiskConfig = (risk) => {
    switch (risk) {
      case 'critical':
        return {
          color: 'bg-error',
          textColor: 'text-error',
          borderColor: 'border-error',
          label: 'Critical'
        };
      case 'high':
        return {
          color: 'bg-warning',
          textColor: 'text-warning',
          borderColor: 'border-warning',
          label: 'High'
        };
      case 'medium':
        return {
          color: 'bg-accent',
          textColor: 'text-accent',
          borderColor: 'border-accent',
          label: 'Medium'
        };
      case 'low':
        return {
          color: 'bg-success',
          textColor: 'text-success',
          borderColor: 'border-success',
          label: 'Low'
        };
      default:
        return {
          color: 'bg-text-secondary',
          textColor: 'text-text-secondary',
          borderColor: 'border-border',
          label: 'Unknown'
        };
    }
  };

  const handleDateClick = (dateData) => {
    setSelectedDate(selectedDate?.id === dateData?.id ? null : dateData);
    onDateSelect && onDateSelect(dateData);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-medium text-foreground">7-Day Pest Risk Forecast</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="xs"
            iconName="TrendingUp"
            iconSize={14}
          >
            Trends
          </Button>
          <Button
            variant="ghost"
            size="xs"
            iconName="Settings"
            iconSize={14}
          >
            Configure
          </Button>
        </div>
      </div>
      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute top-8 left-0 right-0 h-0.5 bg-border" />
        
        {/* Timeline Items */}
        <div className="flex justify-between relative">
          {riskLevels?.map((item, index) => {
            const config = getRiskConfig(item?.risk);
            const isSelected = selectedDate?.id === item?.id;
            
            return (
              <div key={item?.id} className="flex flex-col items-center">
                {/* Risk Indicator */}
                <button
                  onClick={() => handleDateClick(item)}
                  className={`w-4 h-4 ${config?.color} rounded-full border-2 border-white shadow-agricultural hover:scale-110 transition-agricultural cursor-pointer relative z-10 ${
                    isSelected ? 'ring-2 ring-primary ring-offset-2' : ''
                  }`}
                  title={`${config?.label} risk - ${item?.pests?.length} pest types`}
                />
                {/* Date Label */}
                <div className="mt-3 text-center">
                  <div className="text-xs font-medium text-foreground">
                    {item?.day}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {new Date(item.date)?.getDate()}
                  </div>
                </div>
                {/* Risk Level */}
                <div className={`mt-2 text-xs font-medium ${config?.textColor}`}>
                  {config?.label}
                </div>
                {/* Weather Info */}
                <div className="mt-1 text-xs text-text-secondary text-center">
                  <div>{item?.temperature}°F</div>
                  <div>{item?.humidity}% RH</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Selected Date Details */}
      {selectedDate && (
        <div className="mt-6 p-4 bg-muted rounded-lg border-l-4 border-primary">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-heading font-medium text-foreground">
              {selectedDate?.day} - {new Date(selectedDate.date)?.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h4>
            <div className={`text-sm font-medium ${getRiskConfig(selectedDate?.risk)?.textColor}`}>
              {getRiskConfig(selectedDate?.risk)?.label} Risk
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Environmental Conditions */}
            <div>
              <h5 className="text-sm font-medium text-foreground mb-2">Environmental Conditions</h5>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-text-secondary">
                    <Icon name="Thermometer" size={14} />
                    <span>Temperature</span>
                  </div>
                  <span className="text-foreground">{selectedDate?.temperature}°F</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-text-secondary">
                    <Icon name="Droplets" size={14} />
                    <span>Humidity</span>
                  </div>
                  <span className="text-foreground">{selectedDate?.humidity}%</span>
                </div>
              </div>
            </div>

            {/* Pest Threats */}
            <div>
              <h5 className="text-sm font-medium text-foreground mb-2">Expected Pest Activity</h5>
              {selectedDate?.pests?.length > 0 ? (
                <div className="space-y-1">
                  {selectedDate?.pests?.map((pest, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <Icon name="Bug" size={14} className="text-warning" />
                      <span className="text-foreground">{pest}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-sm text-success">
                  <Icon name="CheckCircle" size={14} />
                  <span>No significant pest activity expected</span>
                </div>
              )}
            </div>
          </div>

          {/* Recommendations */}
          <div className="mt-4 p-3 bg-card rounded border border-border">
            <h5 className="text-sm font-medium text-foreground mb-2">Recommendations</h5>
            <div className="text-sm text-text-secondary">
              {selectedDate?.risk === 'critical' && "Immediate action required. Consider emergency treatment protocols."}
              {selectedDate?.risk === 'high' && "Monitor closely and prepare treatment options. Schedule scouting activities."}
              {selectedDate?.risk === 'medium' && "Regular monitoring recommended. Review treatment thresholds."}
              {selectedDate?.risk === 'low' && "Continue routine monitoring. Good conditions for beneficial insects."}
            </div>
          </div>
        </div>
      )}
      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-foreground">Risk Levels:</div>
          <div className="flex items-center space-x-4">
            {['low', 'medium', 'high', 'critical']?.map((risk) => {
              const config = getRiskConfig(risk);
              return (
                <div key={risk} className="flex items-center space-x-1">
                  <div className={`w-3 h-3 ${config?.color} rounded-full`} />
                  <span className="text-xs text-text-secondary capitalize">{risk}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PestRiskTimeline;