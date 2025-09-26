import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EnvironmentalCorrelation = () => {
  const [selectedFactor, setSelectedFactor] = useState('temperature');

  const environmentalFactors = [
    { id: 'temperature', name: 'Temperature', unit: '°F', icon: 'Thermometer' },
    { id: 'humidity', name: 'Humidity', unit: '%', icon: 'Droplets' },
    { id: 'rainfall', name: 'Rainfall', unit: 'inches', icon: 'CloudRain' },
    { id: 'wind-speed', name: 'Wind Speed', unit: 'mph', icon: 'Wind' }
  ];

  const generateCorrelationData = (factor) => {
    const data = [];
    for (let i = 0; i < 50; i++) {
      let x, y, correlation;
      
      switch (factor) {
        case 'temperature':
          x = Math.random() * 40 + 60; // 60-100°F
          correlation = (x - 70) / 30; // Higher temp = more pests
          y = Math.max(0, correlation * 80 + Math.random() * 20 + 10);
          break;
        case 'humidity':
          x = Math.random() * 60 + 30; // 30-90%
          correlation = (x - 50) / 40; // Higher humidity = more pests
          y = Math.max(0, correlation * 70 + Math.random() * 25 + 15);
          break;
        case 'rainfall':
          x = Math.random() * 5; // 0-5 inches
          correlation = Math.min(x / 2, 1); // Moderate rain = more pests
          y = Math.max(0, correlation * 60 + Math.random() * 30 + 10);
          break;
        case 'wind-speed':
          x = Math.random() * 25 + 5; // 5-30 mph
          correlation = Math.max(0, (15 - x) / 15); // Lower wind = more pests
          y = Math.max(0, correlation * 75 + Math.random() * 20 + 5);
          break;
        default:
          x = Math.random() * 100;
          y = Math.random() * 100;
      }
      
      data?.push({
        x: parseFloat(x?.toFixed(1)),
        y: parseFloat(y?.toFixed(1)),
        risk: y > 60 ? 'high' : y > 30 ? 'medium' : 'low'
      });
    }
    return data;
  };

  const data = generateCorrelationData(selectedFactor);
  const selectedFactorData = environmentalFactors?.find(f => f?.id === selectedFactor);

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return '#DC2626';
      case 'medium': return '#D97706';
      case 'low': return '#059669';
      default: return '#6B7280';
    }
  };

  const calculateCorrelation = () => {
    const n = data?.length;
    const sumX = data?.reduce((sum, point) => sum + point?.x, 0);
    const sumY = data?.reduce((sum, point) => sum + point?.y, 0);
    const sumXY = data?.reduce((sum, point) => sum + (point?.x * point?.y), 0);
    const sumX2 = data?.reduce((sum, point) => sum + (point?.x * point?.x), 0);
    const sumY2 = data?.reduce((sum, point) => sum + (point?.y * point?.y), 0);

    let correlation = (n * sumXY - sumX * sumY) / 
      Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    
    return correlation?.toFixed(3);
  };

  let correlation = calculateCorrelation();
  const correlationStrength = Math.abs(correlation) > 0.7 ? 'Strong' : 
                             Math.abs(correlation) > 0.4 ? 'Moderate' : 'Weak';

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
            Environmental Correlation Analysis
          </h3>
          <p className="text-sm text-text-secondary">
            Relationship between environmental factors and pest activity levels
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {environmentalFactors?.map((factor) => (
            <Button
              key={factor?.id}
              variant={selectedFactor === factor?.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFactor(factor?.id)}
              iconName={factor?.icon}
              iconPosition="left"
              iconSize={16}
              className="text-xs"
            >
              {factor?.name}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name={selectedFactorData?.name}
                  stroke="var(--color-text-secondary)"
                  fontSize={12}
                  label={{ 
                    value: `${selectedFactorData?.name} (${selectedFactorData?.unit})`, 
                    position: 'insideBottom', 
                    offset: -10 
                  }}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="Pest Activity"
                  stroke="var(--color-text-secondary)"
                  fontSize={12}
                  label={{ 
                    value: 'Pest Activity Level', 
                    angle: -90, 
                    position: 'insideLeft' 
                  }}
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value, name) => [
                    `${value}${name === selectedFactorData?.name ? selectedFactorData?.unit : ''}`,
                    name === 'x' ? selectedFactorData?.name : 'Pest Activity'
                  ]}
                />
                <Scatter data={data} fill="#8884d8">
                  {data?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getRiskColor(entry?.risk)} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-heading font-medium text-foreground mb-3">Correlation Stats</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-text-secondary">Correlation</span>
                  <span className="text-sm font-medium text-foreground">{correlation}</span>
                </div>
                <div className="text-xs text-text-secondary">{correlationStrength} relationship</div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-text-secondary">Data Points</span>
                  <span className="text-sm font-medium text-foreground">{data?.length}</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-text-secondary">R² Value</span>
                  <span className="text-sm font-medium text-foreground">{(correlation * correlation)?.toFixed(3)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-heading font-medium text-foreground mb-3">Risk Distribution</h4>
            <div className="space-y-2">
              {['high', 'medium', 'low']?.map((risk) => {
                const count = data?.filter(d => d?.risk === risk)?.length;
                const percentage = ((count / data?.length) * 100)?.toFixed(1);
                return (
                  <div key={risk} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: getRiskColor(risk) }}
                      />
                      <span className="text-sm capitalize text-text-secondary">{risk} Risk</span>
                    </div>
                    <span className="text-sm font-medium text-foreground">{percentage}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Info" size={16} className="text-primary" />
              <h4 className="font-heading font-medium text-foreground">Insights</h4>
            </div>
            <p className="text-xs text-text-secondary">
              {Math.abs(correlation) > 0.5 
                ? `Strong correlation detected. ${selectedFactorData?.name} significantly influences pest activity.`
                : `Weak correlation observed. ${selectedFactorData?.name} has limited direct impact on pest levels.`
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalCorrelation;