import React from 'react';
import Icon from '../../../components/AppIcon';

const CurrentConditionsCard = ({ title, value, unit, icon, trend, trendValue, severity }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const getTrendIcon = (trend) => {
    if (trend === 'up') return 'TrendingUp';
    if (trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = (trend) => {
    if (trend === 'up') return 'text-success';
    if (trend === 'down') return 'text-error';
    return 'text-text-secondary';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-agricultural">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={icon} size={20} className="text-primary" />
          </div>
          <h3 className="font-heading font-medium text-foreground">{title}</h3>
        </div>
        {severity && (
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(severity)} bg-current/10`}>
            {severity?.toUpperCase()}
          </div>
        )}
      </div>
      <div className="space-y-2">
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-heading font-semibold text-foreground">{value}</span>
          <span className="text-lg text-text-secondary">{unit}</span>
        </div>
        
        {trend && trendValue && (
          <div className="flex items-center space-x-2">
            <Icon name={getTrendIcon(trend)} size={16} className={getTrendColor(trend)} />
            <span className={`text-sm font-medium ${getTrendColor(trend)}`}>
              {trendValue} from yesterday
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentConditionsCard;