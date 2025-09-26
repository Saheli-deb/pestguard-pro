import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataRefreshIndicator = ({ lastUpdate, isRefreshing, onRefresh, autoRefresh, onToggleAutoRefresh }) => {
  const formatLastUpdate = (timestamp) => {
    const now = new Date();
    const updateTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - updateTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-agricultural">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Icon 
              name={isRefreshing ? "RefreshCw" : "Clock"} 
              size={16} 
              className={`text-text-secondary ${isRefreshing ? 'animate-spin' : ''}`} 
            />
            <span className="text-sm text-text-secondary">
              Last updated: {formatLastUpdate(lastUpdate)}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={onToggleAutoRefresh}
              className={`flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium transition-agricultural ${
                autoRefresh 
                  ? 'bg-success/10 text-success' :'bg-muted text-text-secondary hover:bg-muted/80'
              }`}
            >
              <Icon name={autoRefresh ? "Play" : "Pause"} size={12} />
              <span>Auto-refresh</span>
            </button>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={isRefreshing}
          iconName="RefreshCw"
          iconPosition="left"
          className={isRefreshing ? 'animate-pulse' : ''}
        >
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>
    </div>
  );
};

export default DataRefreshIndicator;