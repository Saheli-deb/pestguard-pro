import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WeatherAlert = ({ alerts, onDismiss }) => {
  if (!alerts || alerts?.length === 0) return null;

  const getSeverityConfig = (severity) => {
    switch (severity) {
      case 'severe':
        return {
          bgColor: 'bg-error/10',
          borderColor: 'border-error',
          textColor: 'text-error',
          icon: 'AlertTriangle'
        };
      case 'moderate':
        return {
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning',
          textColor: 'text-warning',
          icon: 'AlertCircle'
        };
      case 'watch':
        return {
          bgColor: 'bg-accent/10',
          borderColor: 'border-accent',
          textColor: 'text-accent',
          icon: 'Info'
        };
      default:
        return {
          bgColor: 'bg-muted',
          borderColor: 'border-border',
          textColor: 'text-text-secondary',
          icon: 'Bell'
        };
    }
  };

  return (
    <div className="space-y-3">
      {alerts?.map((alert) => {
        const config = getSeverityConfig(alert?.severity);
        
        return (
          <div
            key={alert?.id}
            className={`${config?.bgColor} ${config?.borderColor} border rounded-lg p-4`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className={`mt-1 ${config?.textColor}`}>
                  <Icon name={config?.icon} size={20} />
                </div>
                <div className="flex-1">
                  <h4 className={`font-heading font-medium ${config?.textColor} mb-1`}>
                    {alert?.title}
                  </h4>
                  <p className="text-foreground text-sm mb-2">
                    {alert?.description}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-text-secondary">
                    <span>Valid until: {alert?.validUntil}</span>
                    <span>Issued: {alert?.issuedAt}</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDismiss(alert?.id)}
                className="text-text-secondary hover:text-foreground"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WeatherAlert;