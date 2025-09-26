import React from 'react';
import Icon from '../../../components/AppIcon';

const IntegrationStatus = ({ integrations }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'connected':
        return {
          color: 'text-success',
          bgColor: 'bg-success/10',
          icon: 'CheckCircle'
        };
      case 'warning':
        return {
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          icon: 'AlertTriangle'
        };
      case 'error':
        return {
          color: 'text-error',
          bgColor: 'bg-error/10',
          icon: 'XCircle'
        };
      default:
        return {
          color: 'text-text-secondary',
          bgColor: 'bg-muted',
          icon: 'Circle'
        };
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-agricultural">
      <h4 className="font-heading font-medium text-foreground mb-3">Data Sources</h4>
      <div className="space-y-2">
        {integrations?.map((integration) => {
          const config = getStatusConfig(integration?.status);
          
          return (
            <div key={integration?.id} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg ${config?.bgColor} flex items-center justify-center`}>
                  <Icon name={config?.icon} size={14} className={config?.color} />
                </div>
                <div>
                  <div className="font-medium text-foreground text-sm">{integration?.name}</div>
                  <div className="text-xs text-text-secondary">{integration?.description}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color} ${config?.bgColor}`}>
                  {integration?.status}
                </div>
                {integration?.lastSync && (
                  <div className="text-xs text-text-secondary">
                    {integration?.lastSync}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IntegrationStatus;