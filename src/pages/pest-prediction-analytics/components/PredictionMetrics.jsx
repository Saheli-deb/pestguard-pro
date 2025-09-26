import React from 'react';
import Icon from '../../../components/AppIcon';

const PredictionMetrics = () => {
  const metrics = [
    {
      id: 1,
      title: "Overall Risk Score",
      value: "7.2",
      scale: "/10",
      trend: "up",
      trendValue: "+0.8",
      severity: "high",
      description: "Elevated pest activity expected",
      icon: "AlertTriangle"
    },
    {
      id: 2,
      title: "Most Threatened Crop",
      value: "Corn",
      subtitle: "Field 7-A",
      trend: "stable",
      trendValue: "No change",
      severity: "medium",
      description: "Corn rootworm pressure increasing",
      icon: "Wheat"
    },
    {
      id: 3,
      title: "Action Timeline",
      value: "3-5",
      scale: "days",
      trend: "down",
      trendValue: "-2 days",
      severity: "high",
      description: "Treatment window narrowing",
      icon: "Clock"
    },
    {
      id: 4,
      title: "Prediction Confidence",
      value: "89%",
      subtitle: "High Accuracy",
      trend: "up",
      trendValue: "+5%",
      severity: "low",
      description: "Model reliability excellent",
      icon: "Target"
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'high': return 'bg-error/10 border-error/20';
      case 'medium': return 'bg-warning/10 border-warning/20';
      case 'low': return 'bg-success/10 border-success/20';
      default: return 'bg-muted border-border';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      case 'stable': return 'Minus';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-error';
      case 'down': return 'text-success';
      case 'stable': return 'text-text-secondary';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {metrics?.map((metric) => (
        <div
          key={metric?.id}
          className={`p-6 rounded-lg border-2 transition-agricultural ${getSeverityBg(metric?.severity)}`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`p-2 rounded-lg ${getSeverityColor(metric?.severity)} bg-current/10`}>
              <Icon name={metric?.icon} size={24} className={getSeverityColor(metric?.severity)} />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${getTrendColor(metric?.trend)}`}>
              <Icon name={getTrendIcon(metric?.trend)} size={16} />
              <span className="font-medium">{metric?.trendValue}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-text-secondary">{metric?.title}</h3>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-bold text-foreground">{metric?.value}</span>
              {metric?.scale && (
                <span className="text-sm text-text-secondary">{metric?.scale}</span>
              )}
            </div>
            {metric?.subtitle && (
              <p className="text-sm font-medium text-foreground">{metric?.subtitle}</p>
            )}
            <p className="text-xs text-text-secondary">{metric?.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PredictionMetrics;