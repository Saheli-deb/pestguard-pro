import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertCard = ({ alert, onViewDetails, onDismiss }) => {
  const getSeverityConfig = (severity) => {
    switch (severity) {
      case 'critical':
        return {
          bgColor: 'bg-error/10',
          borderColor: 'border-error',
          textColor: 'text-error',
          icon: 'AlertTriangle'
        };
      case 'high':
        return {
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning',
          textColor: 'text-warning',
          icon: 'AlertCircle'
        };
      case 'medium':
        return {
          bgColor: 'bg-accent/10',
          borderColor: 'border-accent',
          textColor: 'text-accent',
          icon: 'Info'
        };
      default:
        return {
          bgColor: 'bg-success/10',
          borderColor: 'border-success',
          textColor: 'text-success',
          icon: 'CheckCircle'
        };
    }
  };

  const config = getSeverityConfig(alert?.severity);

  return (
    <div className={`${config?.bgColor} ${config?.borderColor} border rounded-lg p-4 transition-agricultural hover:shadow-agricultural`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className={`${config?.textColor} mt-0.5`}>
            <Icon name={config?.icon} size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-medium text-foreground text-sm">
              {alert?.title}
            </h3>
            <p className="text-text-secondary text-sm mt-1">
              {alert?.description}
            </p>
            <div className="flex items-center space-x-4 mt-2 text-xs text-text-secondary">
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={12} />
                <span>{alert?.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={12} />
                <span>{alert?.timestamp}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Crop" size={12} />
                <span>{alert?.affectedAcres} acres</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <Button
            variant="ghost"
            size="xs"
            onClick={() => onViewDetails(alert)}
            iconName="Eye"
            iconSize={14}
          >
            View
          </Button>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => onDismiss(alert?.id)}
            iconName="X"
            iconSize={14}
            className="text-text-secondary hover:text-foreground"
          />
        </div>
      </div>
    </div>
  );
};

export default AlertCard;