import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PestPopulationChart = () => {
  const [selectedPest, setSelectedPest] = useState('corn-rootworm');
  const [timeRange, setTimeRange] = useState('30-days');

  const pestOptions = [
    { id: 'corn-rootworm', name: 'Corn Rootworm', color: '#DC2626' },
    { id: 'aphids', name: 'Aphids', color: '#D97706' },
    { id: 'cutworm', name: 'Cutworm', color: '#059669' },
    { id: 'spider-mites', name: 'Spider Mites', color: '#7C3AED' }
  ];

  const timeRanges = [
    { id: '7-days', name: '7 Days' },
    { id: '30-days', name: '30 Days' },
    { id: '90-days', name: '90 Days' },
    { id: '1-year', name: '1 Year' }
  ];

  const generateData = () => {
    const days = timeRange === '7-days' ? 7 : timeRange === '30-days' ? 30 : timeRange === '90-days' ? 90 : 365;
    const data = [];
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date?.setDate(date?.getDate() - (days - i - 1));
      
      data?.push({
        date: date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        fullDate: date?.toISOString()?.split('T')?.[0],
        actual: Math.floor(Math.random() * 100) + 20,
        predicted: Math.floor(Math.random() * 120) + 30,
        threshold: 80
      });
    }
    
    return data;
  };

  const data = generateData();
  const selectedPestData = pestOptions?.find(p => p?.id === selectedPest);

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
            Pest Population Trends
          </h3>
          <p className="text-sm text-text-secondary">
            Historical data and AI predictions for pest population dynamics
          </p>
        </div>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <div className="flex space-x-2">
            {pestOptions?.map((pest) => (
              <Button
                key={pest?.id}
                variant={selectedPest === pest?.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPest(pest?.id)}
                className="text-xs"
              >
                <div 
                  className="w-2 h-2 rounded-full mr-2"
                  style={{ backgroundColor: pest?.color }}
                />
                {pest?.name}
              </Button>
            ))}
          </div>

          <div className="flex space-x-2">
            {timeRanges?.map((range) => (
              <Button
                key={range?.id}
                variant={timeRange === range?.id ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(range?.id)}
                className="text-xs"
              >
                {range?.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-text-secondary)"
              fontSize={12}
              label={{ value: 'Population Count', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--color-popover)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              labelStyle={{ color: 'var(--color-foreground)' }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="actual" 
              stroke={selectedPestData?.color} 
              strokeWidth={2}
              name="Actual Count"
              dot={{ fill: selectedPestData?.color, strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="predicted" 
              stroke={selectedPestData?.color} 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Predicted Count"
              dot={{ fill: selectedPestData?.color, strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="threshold" 
              stroke="var(--color-error)" 
              strokeWidth={1}
              strokeDasharray="2 2"
              name="Action Threshold"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-text-secondary">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-0.5" style={{ backgroundColor: selectedPestData?.color }} />
            <span>Actual Population</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-0.5 border-dashed border-t-2" style={{ borderColor: selectedPestData?.color }} />
            <span>AI Prediction</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-0.5 bg-error" />
            <span>Action Threshold</span>
          </div>
        </div>
        <div className="flex items-center space-x-1 mt-2 sm:mt-0">
          <Icon name="Info" size={12} />
          <span>Last updated: {new Date()?.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default PestPopulationChart;