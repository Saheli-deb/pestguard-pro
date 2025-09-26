import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TreatmentEfficacy = () => {
  const [selectedTreatment, setSelectedTreatment] = useState('all');
  const [viewMode, setViewMode] = useState('efficacy');

  const treatments = [
    { id: 'all', name: 'All Treatments' },
    { id: 'chemical', name: 'Chemical' },
    { id: 'biological', name: 'Biological' },
    { id: 'integrated', name: 'Integrated IPM' }
  ];

  const viewModes = [
    { id: 'efficacy', name: 'Efficacy Rate' },
    { id: 'cost', name: 'Cost Analysis' },
    { id: 'duration', name: 'Duration' }
  ];

  const treatmentData = [
    {
      name: 'Chlorpyrifos',
      type: 'chemical',
      efficacy: 92,
      cost: 45,
      duration: 14,
      resistance: 15,
      environmental: 3
    },
    {
      name: 'Bacillus thuringiensis',
      type: 'biological',
      efficacy: 78,
      cost: 32,
      duration: 21,
      resistance: 2,
      environmental: 9
    },
    {
      name: 'Neem Oil',
      type: 'biological',
      efficacy: 65,
      cost: 28,
      duration: 18,
      resistance: 1,
      environmental: 10
    },
    {
      name: 'IPM Protocol A',
      type: 'integrated',
      efficacy: 88,
      cost: 52,
      duration: 28,
      resistance: 5,
      environmental: 8
    },
    {
      name: 'Pyrethroid Mix',
      type: 'chemical',
      efficacy: 85,
      cost: 38,
      duration: 12,
      resistance: 25,
      environmental: 4
    },
    {
      name: 'Beneficial Insects',
      type: 'biological',
      efficacy: 72,
      cost: 35,
      duration: 35,
      resistance: 0,
      environmental: 10
    }
  ];

  const filteredData = selectedTreatment === 'all' 
    ? treatmentData 
    : treatmentData?.filter(item => item?.type === selectedTreatment);

  const getBarColor = (type) => {
    switch (type) {
      case 'chemical': return '#DC2626';
      case 'biological': return '#059669';
      case 'integrated': return '#7C3AED';
      default: return '#6B7280';
    }
  };

  const getDataKey = () => {
    switch (viewMode) {
      case 'efficacy': return 'efficacy';
      case 'cost': return 'cost';
      case 'duration': return 'duration';
      default: return 'efficacy';
    }
  };

  const getYAxisLabel = () => {
    switch (viewMode) {
      case 'efficacy': return 'Efficacy Rate (%)';
      case 'cost': return 'Cost per Acre ($)';
      case 'duration': return 'Duration (days)';
      default: return 'Value';
    }
  };

  const calculateAverages = () => {
    if (filteredData?.length === 0) return {};
    
    return {
      efficacy: (filteredData?.reduce((sum, item) => sum + item?.efficacy, 0) / filteredData?.length)?.toFixed(1),
      cost: (filteredData?.reduce((sum, item) => sum + item?.cost, 0) / filteredData?.length)?.toFixed(0),
      duration: (filteredData?.reduce((sum, item) => sum + item?.duration, 0) / filteredData?.length)?.toFixed(0),
      resistance: (filteredData?.reduce((sum, item) => sum + item?.resistance, 0) / filteredData?.length)?.toFixed(1),
      environmental: (filteredData?.reduce((sum, item) => sum + item?.environmental, 0) / filteredData?.length)?.toFixed(1)
    };
  };

  const averages = calculateAverages();

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
            Treatment Efficacy Predictions
          </h3>
          <p className="text-sm text-text-secondary">
            AI-powered analysis of treatment effectiveness and recommendations
          </p>
        </div>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <div className="flex space-x-2">
            {treatments?.map((treatment) => (
              <Button
                key={treatment?.id}
                variant={selectedTreatment === treatment?.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTreatment(treatment?.id)}
                className="text-xs"
              >
                {treatment?.name}
              </Button>
            ))}
          </div>

          <div className="flex space-x-2">
            {viewModes?.map((mode) => (
              <Button
                key={mode?.id}
                variant={viewMode === mode?.id ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode(mode?.id)}
                className="text-xs"
              >
                {mode?.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="name" 
                  stroke="var(--color-text-secondary)"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  stroke="var(--color-text-secondary)"
                  fontSize={12}
                  label={{ value: getYAxisLabel(), angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value, name, props) => [
                    `${value}${viewMode === 'efficacy' ? '%' : viewMode === 'cost' ? '$' : ' days'}`,
                    getYAxisLabel()
                  ]}
                />
                <Bar 
                  dataKey={getDataKey()} 
                  fill="#2D5016"
                  radius={[4, 4, 0, 0]}
                >
                  {filteredData?.map((entry, index) => (
                    <Bar key={`bar-${index}`} fill={getBarColor(entry?.type)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-heading font-medium text-foreground mb-3">Average Performance</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Efficacy</span>
                <span className="text-sm font-medium text-foreground">{averages?.efficacy}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Cost/Acre</span>
                <span className="text-sm font-medium text-foreground">${averages?.cost}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Duration</span>
                <span className="text-sm font-medium text-foreground">{averages?.duration} days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Resistance Risk</span>
                <span className="text-sm font-medium text-foreground">{averages?.resistance}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Eco Score</span>
                <span className="text-sm font-medium text-foreground">{averages?.environmental}/10</span>
              </div>
            </div>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-heading font-medium text-foreground mb-3">Treatment Types</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-error" />
                <span className="text-sm text-text-secondary">Chemical</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="text-sm text-text-secondary">Biological</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <span className="text-sm text-text-secondary">Integrated IPM</span>
              </div>
            </div>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Lightbulb" size={16} className="text-primary" />
              <h4 className="font-heading font-medium text-foreground">AI Recommendation</h4>
            </div>
            <p className="text-xs text-text-secondary mb-2">
              Based on current conditions and historical data:
            </p>
            <div className="bg-primary/10 border border-primary/20 rounded-md p-2">
              <p className="text-xs font-medium text-primary">
                IPM Protocol A recommended for optimal balance of efficacy and sustainability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentEfficacy;