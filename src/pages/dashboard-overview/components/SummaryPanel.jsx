import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SummaryPanel = ({ summaryData, onActionClick }) => {
  const sprayWindows = [
    {
      id: 1,
      date: '2025-08-29',
      time: '6:00 AM - 9:00 AM',
      conditions: 'Optimal',
      windSpeed: '3-5 mph',
      temperature: '68-72°F',
      humidity: '65-75%'
    },
    {
      id: 2,
      date: '2025-08-30',
      time: '5:30 AM - 8:30 AM',
      conditions: 'Good',
      windSpeed: '5-8 mph',
      temperature: '70-75°F',
      humidity: '60-70%'
    }
  ];

  const droneFlights = [
    {
      id: 1,
      date: '2025-08-28',
      time: '2:30 PM',
      area: 'Field A-North',
      coverage: '45 acres',
      status: 'completed',
      findings: 'Aphid clusters detected'
    },
    {
      id: 2,
      date: '2025-08-27',
      time: '11:15 AM',
      area: 'Field B-South',
      coverage: '38 acres',
      status: 'completed',
      findings: 'No significant issues'
    },
    {
      id: 3,
      date: '2025-08-29',
      time: '7:00 AM',
      area: 'Field C-West',
      coverage: '52 acres',
      status: 'scheduled',
      findings: 'Pending'
    }
  ];

  const getConditionColor = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'optimal': return 'text-success';
      case 'good': return 'text-primary';
      case 'fair': return 'text-warning';
      case 'poor': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'text-success';
      case 'scheduled': return 'text-primary';
      case 'in-progress': return 'text-warning';
      case 'cancelled': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Farm Statistics */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-heading font-medium text-foreground mb-4">Farm Overview</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-heading font-semibold text-foreground">
              {summaryData?.totalAcres}
            </div>
            <div className="text-sm text-text-secondary">Total Acres</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-heading font-semibold text-primary">
              {summaryData?.activeFields}
            </div>
            <div className="text-sm text-text-secondary">Active Fields</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-heading font-semibold text-warning">
              {summaryData?.alertsCount}
            </div>
            <div className="text-sm text-text-secondary">Active Alerts</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-heading font-semibold text-success">
              {summaryData?.treatmentEfficiency}%
            </div>
            <div className="text-sm text-text-secondary">Treatment Efficiency</div>
          </div>
        </div>
      </div>
      {/* Spray Windows */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-medium text-foreground">Upcoming Spray Windows</h3>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => onActionClick('spray-schedule')}
            iconName="Calendar"
            iconSize={14}
          >
            View All
          </Button>
        </div>
        <div className="space-y-3">
          {sprayWindows?.map((window) => (
            <div key={window?.id} className="p-3 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-foreground text-sm">
                  {new Date(window.date)?.toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
                <div className={`text-sm font-medium ${getConditionColor(window?.conditions)}`}>
                  {window?.conditions}
                </div>
              </div>
              <div className="text-sm text-text-secondary mb-2">{window?.time}</div>
              <div className="grid grid-cols-3 gap-2 text-xs text-text-secondary">
                <div className="flex items-center space-x-1">
                  <Icon name="Wind" size={12} />
                  <span>{window?.windSpeed}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Thermometer" size={12} />
                  <span>{window?.temperature}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Droplets" size={12} />
                  <span>{window?.humidity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Drone Flights */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-medium text-foreground">Recent Drone Flights</h3>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => onActionClick('drone-data')}
            iconName="Plane"
            iconSize={14}
          >
            View All
          </Button>
        </div>
        <div className="space-y-3">
          {droneFlights?.slice(0, 3)?.map((flight) => (
            <div key={flight?.id} className="p-3 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-foreground text-sm">
                  {flight?.area}
                </div>
                <div className={`text-xs font-medium capitalize ${getStatusColor(flight?.status)}`}>
                  {flight?.status}
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-text-secondary mb-1">
                <span>{new Date(flight.date)?.toLocaleDateString()} at {flight?.time}</span>
                <span>{flight?.coverage}</span>
              </div>
              <div className="text-xs text-text-secondary">
                {flight?.findings}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-heading font-medium text-foreground mb-4">Quick Actions</h3>
        <div className="space-y-2">
          <Button
            variant="outline"
            fullWidth
            onClick={() => onActionClick('generate-report')}
            iconName="FileText"
            iconPosition="left"
            iconSize={16}
          >
            Generate Report
          </Button>
          <Button
            variant="outline"
            fullWidth
            onClick={() => onActionClick('schedule-treatment')}
            iconName="Calendar"
            iconPosition="left"
            iconSize={16}
          >
            Schedule Treatment
          </Button>
          <Button
            variant="outline"
            fullWidth
            onClick={() => onActionClick('refresh-data')}
            iconName="RefreshCw"
            iconPosition="left"
            iconSize={16}
          >
            Refresh Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SummaryPanel;