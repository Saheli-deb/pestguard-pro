import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onActionClick }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const quickActions = [
    {
      id: 'alerts',
      title: 'Manage Alerts',
      description: 'Review and respond to active pest alerts',
      icon: 'AlertTriangle',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      count: 3
    },
    {
      id: 'reports',
      title: 'Generate Report',
      description: 'Create detailed pest management reports',
      icon: 'FileText',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      count: null
    },
    {
      id: 'schedule',
      title: 'Schedule Treatment',
      description: 'Plan and schedule pest control treatments',
      icon: 'Calendar',
      color: 'text-success',
      bgColor: 'bg-success/10',
      count: null
    },
    {
      id: 'data-sync',
      title: 'Sync Data',
      description: 'Update satellite and weather information',
      icon: 'RefreshCw',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      count: null
    }
  ];

  const handleRefreshData = async () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
      onActionClick && onActionClick('data-refresh-complete');
    }, 2000);
  };

  const handleActionClick = (actionId) => {
    if (actionId === 'data-sync') {
      handleRefreshData();
    } else {
      onActionClick && onActionClick(actionId);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-medium text-foreground">Quick Actions</h3>
        <div className="text-xs text-text-secondary">
          Last updated: {new Date()?.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => handleActionClick(action?.id)}
            disabled={action?.id === 'data-sync' && isRefreshing}
            className={`${action?.bgColor} border border-transparent rounded-lg p-4 text-left transition-agricultural hover:shadow-agricultural hover:border-border disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className={`${action?.color}`}>
                <Icon 
                  name={action?.id === 'data-sync' && isRefreshing ? 'Loader2' : action?.icon} 
                  size={20}
                  className={action?.id === 'data-sync' && isRefreshing ? 'animate-spin' : ''}
                />
              </div>
              {action?.count && (
                <div className="bg-card text-foreground text-xs font-medium px-2 py-1 rounded-full">
                  {action?.count}
                </div>
              )}
            </div>
            <h4 className="font-medium text-foreground text-sm mb-1">
              {action?.title}
            </h4>
            <p className="text-text-secondary text-xs">
              {action?.description}
            </p>
          </button>
        ))}
      </div>
      {/* Additional Actions */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex flex-wrap gap-2">
          <Button
            variant="ghost"
            size="xs"
            onClick={() => onActionClick('export-data')}
            iconName="Download"
            iconSize={14}
          >
            Export Data
          </Button>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => onActionClick('settings')}
            iconName="Settings"
            iconSize={14}
          >
            Settings
          </Button>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => onActionClick('help')}
            iconName="HelpCircle"
            iconSize={14}
          >
            Help
          </Button>
        </div>
      </div>
      {/* Status Indicators */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span className="text-text-secondary">Satellite: Online</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span className="text-text-secondary">Weather: Online</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Wifi" size={12} className="text-success" />
            <span className="text-text-secondary">Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;