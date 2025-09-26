import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComparisonSection = () => {
  const [comparisonType, setComparisonType] = useState('pest-types');
  const [selectedItems, setSelectedItems] = useState({
    left: 'corn-rootworm',
    right: 'aphids'
  });

  const comparisonTypes = [
    { id: 'pest-types', name: 'Pest Types', icon: 'Bug' },
    { id: 'time-periods', name: 'Time Periods', icon: 'Calendar' },
    { id: 'treatments', name: 'Treatments', icon: 'Beaker' },
    { id: 'fields', name: 'Field Locations', icon: 'MapPin' }
  ];

  const comparisonData = {
    'pest-types': {
      options: [
        { id: 'corn-rootworm', name: 'Corn Rootworm' },
        { id: 'aphids', name: 'Aphids' },
        { id: 'cutworm', name: 'Cutworm' },
        { id: 'spider-mites', name: 'Spider Mites' }
      ],
      metrics: [
        { key: 'riskScore', label: 'Risk Score', unit: '/10' },
        { key: 'population', label: 'Population Density', unit: '/m²' },
        { key: 'damageRate', label: 'Damage Rate', unit: '%' },
        { key: 'treatmentCost', label: 'Treatment Cost', unit: '$/acre' },
        { key: 'recoveryTime', label: 'Recovery Time', unit: 'days' }
      ]
    },
    'time-periods': {
      options: [
        { id: 'current-week', name: 'Current Week' },
        { id: 'last-week', name: 'Last Week' },
        { id: 'current-month', name: 'Current Month' },
        { id: 'last-month', name: 'Last Month' }
      ],
      metrics: [
        { key: 'avgRisk', label: 'Average Risk', unit: '/10' },
        { key: 'peakActivity', label: 'Peak Activity', unit: 'count' },
        { key: 'weatherImpact', label: 'Weather Impact', unit: '%' },
        { key: 'treatmentEvents', label: 'Treatments Applied', unit: 'count' },
        { key: 'effectiveness', label: 'Treatment Effectiveness', unit: '%' }
      ]
    },
    'treatments': {
      options: [
        { id: 'chemical-a', name: 'Chemical Treatment A' },
        { id: 'biological-b', name: 'Biological Treatment B' },
        { id: 'ipm-protocol', name: 'IPM Protocol' },
        { id: 'organic-spray', name: 'Organic Spray' }
      ],
      metrics: [
        { key: 'efficacy', label: 'Efficacy Rate', unit: '%' },
        { key: 'cost', label: 'Cost per Application', unit: '$' },
        { key: 'duration', label: 'Effective Duration', unit: 'days' },
        { key: 'resistance', label: 'Resistance Risk', unit: '%' },
        { key: 'environmental', label: 'Environmental Score', unit: '/10' }
      ]
    },
    'fields': {
      options: [
        { id: 'field-7a', name: 'Field 7-A (North)' },
        { id: 'field-12b', name: 'Field 12-B (South)' },
        { id: 'field-3c', name: 'Field 3-C (East)' },
        { id: 'field-9d', name: 'Field 9-D (West)' }
      ],
      metrics: [
        { key: 'riskLevel', label: 'Current Risk Level', unit: '/10' },
        { key: 'pestCount', label: 'Active Pest Count', unit: 'species' },
        { key: 'soilHealth', label: 'Soil Health Index', unit: '/100' },
        { key: 'yieldImpact', label: 'Predicted Yield Impact', unit: '%' },
        { key: 'treatmentHistory', label: 'Treatments This Season', unit: 'count' }
      ]
    }
  };

  const generateComparisonValues = (type, itemId, metricKey) => {
    // Generate realistic mock data based on type and metric
    const baseValues = {
      'corn-rootworm': { riskScore: 7.2, population: 45, damageRate: 15, treatmentCost: 42, recoveryTime: 14 },
      'aphids': { riskScore: 5.8, population: 120, damageRate: 8, treatmentCost: 28, recoveryTime: 10 },
      'cutworm': { riskScore: 6.5, population: 25, damageRate: 22, treatmentCost: 38, recoveryTime: 18 },
      'spider-mites': { riskScore: 4.2, population: 200, damageRate: 5, treatmentCost: 22, recoveryTime: 7 }
    };

    if (type === 'pest-types' && baseValues?.[itemId]) {
      return baseValues?.[itemId]?.[metricKey] || Math.floor(Math.random() * 100);
    }

    // Generate random values for other types
    return Math.floor(Math.random() * 100) + Math.random() * 10;
  };

  const currentData = comparisonData?.[comparisonType];
  const leftItem = currentData?.options?.find(opt => opt?.id === selectedItems?.left);
  const rightItem = currentData?.options?.find(opt => opt?.id === selectedItems?.right);

  const handleItemChange = (side, itemId) => {
    setSelectedItems(prev => ({
      ...prev,
      [side]: itemId
    }));
  };

  const getComparisonIndicator = (leftValue, rightValue) => {
    const diff = ((leftValue - rightValue) / rightValue * 100);
    if (Math.abs(diff) < 5) return { icon: 'Minus', color: 'text-text-secondary', text: 'Similar' };
    if (diff > 0) return { icon: 'TrendingUp', color: 'text-error', text: `+${diff?.toFixed(1)}%` };
    return { icon: 'TrendingDown', color: 'text-success', text: `${diff?.toFixed(1)}%` };
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
            Comparative Analysis
          </h3>
          <p className="text-sm text-text-secondary">
            Side-by-side comparison of different variables for informed decision making
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {comparisonTypes?.map((type) => (
            <Button
              key={type?.id}
              variant={comparisonType === type?.id ? "default" : "outline"}
              size="sm"
              onClick={() => setComparisonType(type?.id)}
              iconName={type?.icon}
              iconPosition="left"
              iconSize={16}
              className="text-xs"
            >
              {type?.name}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Comparison Item */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-heading font-medium text-foreground">Compare A</h4>
            <select
              value={selectedItems?.left}
              onChange={(e) => handleItemChange('left', e?.target?.value)}
              className="px-3 py-1 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {currentData?.options?.map((option) => (
                <option key={option?.id} value={option?.id}>
                  {option?.name}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <h5 className="font-medium text-foreground mb-3">{leftItem?.name}</h5>
            <div className="space-y-3">
              {currentData?.metrics?.map((metric) => {
                const value = generateComparisonValues(comparisonType, selectedItems?.left, metric?.key);
                return (
                  <div key={metric?.key} className="flex justify-between items-center">
                    <span className="text-sm text-text-secondary">{metric?.label}</span>
                    <span className="text-sm font-medium text-foreground">
                      {typeof value === 'number' ? value?.toFixed(1) : value}{metric?.unit}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Comparison Item */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-heading font-medium text-foreground">Compare B</h4>
            <select
              value={selectedItems?.right}
              onChange={(e) => handleItemChange('right', e?.target?.value)}
              className="px-3 py-1 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {currentData?.options?.map((option) => (
                <option key={option?.id} value={option?.id}>
                  {option?.name}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <h5 className="font-medium text-foreground mb-3">{rightItem?.name}</h5>
            <div className="space-y-3">
              {currentData?.metrics?.map((metric) => {
                const value = generateComparisonValues(comparisonType, selectedItems?.right, metric?.key);
                return (
                  <div key={metric?.key} className="flex justify-between items-center">
                    <span className="text-sm text-text-secondary">{metric?.label}</span>
                    <span className="text-sm font-medium text-foreground">
                      {typeof value === 'number' ? value?.toFixed(1) : value}{metric?.unit}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Comparison Summary */}
      <div className="mt-6 bg-muted rounded-lg p-4">
        <h4 className="font-heading font-medium text-foreground mb-3">Comparison Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentData?.metrics?.map((metric) => {
            const leftValue = generateComparisonValues(comparisonType, selectedItems?.left, metric?.key);
            const rightValue = generateComparisonValues(comparisonType, selectedItems?.right, metric?.key);
            const indicator = getComparisonIndicator(leftValue, rightValue);

            return (
              <div key={metric?.key} className="flex items-center justify-between p-3 bg-background rounded-md">
                <div>
                  <div className="text-sm font-medium text-foreground">{metric?.label}</div>
                  <div className="text-xs text-text-secondary">A vs B comparison</div>
                </div>
                <div className={`flex items-center space-x-1 ${indicator?.color}`}>
                  <Icon name={indicator?.icon} size={16} />
                  <span className="text-sm font-medium">{indicator?.text}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ComparisonSection;