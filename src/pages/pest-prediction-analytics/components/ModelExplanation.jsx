import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ModelExplanation = () => {
  const [selectedModel, setSelectedModel] = useState('pest-population');
  const [expandedFactor, setExpandedFactor] = useState(null);

  const models = [
    { 
      id: 'pest-population', 
      name: 'Pest Population Predictor',
      accuracy: 89.2,
      type: 'Neural Network',
      lastTrained: '2025-08-25'
    },
    { 
      id: 'risk-assessment', 
      name: 'Risk Assessment Model',
      accuracy: 92.7,
      type: 'Random Forest',
      lastTrained: '2025-08-26'
    },
    { 
      id: 'treatment-optimizer', 
      name: 'Treatment Optimizer',
      accuracy: 85.4,
      type: 'Gradient Boosting',
      lastTrained: '2025-08-27'
    }
  ];

  const modelFactors = {
    'pest-population': [
      {
        id: 'temperature',
        name: 'Temperature',
        importance: 0.28,
        impact: 'High temperatures accelerate pest reproduction cycles',
        currentValue: '78°F',
        optimalRange: '65-75°F',
        icon: 'Thermometer'
      },
      {
        id: 'humidity',
        name: 'Humidity',
        importance: 0.22,
        impact: 'Moderate humidity levels favor pest survival and breeding',
        currentValue: '65%',
        optimalRange: '40-60%',
        icon: 'Droplets'
      },
      {
        id: 'rainfall',
        name: 'Rainfall',
        importance: 0.18,
        impact: 'Recent rainfall creates favorable breeding conditions',
        currentValue: '2.3 inches',
        optimalRange: '1-2 inches/week',
        icon: 'CloudRain'
      },
      {
        id: 'crop-stage',
        name: 'Crop Growth Stage',
        importance: 0.15,
        impact: 'Vulnerable growth stages attract specific pest species',
        currentValue: 'Tasseling',
        optimalRange: 'N/A',
        icon: 'Wheat'
      },
      {
        id: 'soil-moisture',
        name: 'Soil Moisture',
        importance: 0.12,
        impact: 'Soil conditions affect root-feeding pest populations',
        currentValue: '45%',
        optimalRange: '35-50%',
        icon: 'Layers'
      },
      {
        id: 'wind-speed',
        name: 'Wind Speed',
        importance: 0.05,
        impact: 'Wind patterns influence pest migration and dispersal',
        currentValue: '8 mph',
        optimalRange: '5-15 mph',
        icon: 'Wind'
      }
    ],
    'risk-assessment': [
      {
        id: 'historical-data',
        name: 'Historical Patterns',
        importance: 0.35,
        impact: 'Past infestation patterns strongly predict future risks',
        currentValue: 'High correlation',
        optimalRange: 'N/A',
        icon: 'BarChart3'
      },
      {
        id: 'weather-forecast',
        name: 'Weather Forecast',
        importance: 0.25,
        impact: 'Predicted weather conditions influence risk levels',
        currentValue: 'Favorable for pests',
        optimalRange: 'N/A',
        icon: 'Cloud'
      },
      {
        id: 'crop-health',
        name: 'Crop Health Index',
        importance: 0.20,
        impact: 'Stressed crops are more susceptible to pest damage',
        currentValue: '7.2/10',
        optimalRange: '8-10/10',
        icon: 'Heart'
      },
      {
        id: 'neighboring-fields',
        name: 'Neighboring Field Status',
        importance: 0.12,
        impact: 'Pest pressure from adjacent areas affects risk',
        currentValue: 'Moderate activity',
        optimalRange: 'Low activity',
        icon: 'Map'
      },
      {
        id: 'treatment-history',
        name: 'Treatment History',
        importance: 0.08,
        impact: 'Previous treatments affect current pest resistance levels',
        currentValue: '3 treatments',
        optimalRange: '1-2 treatments',
        icon: 'History'
      }
    ],
    'treatment-optimizer': [
      {
        id: 'pest-species',
        name: 'Target Pest Species',
        importance: 0.30,
        impact: 'Different pests require specific treatment approaches',
        currentValue: 'Corn rootworm',
        optimalRange: 'N/A',
        icon: 'Bug'
      },
      {
        id: 'infestation-level',
        name: 'Infestation Severity',
        importance: 0.25,
        impact: 'Treatment intensity must match infestation level',
        currentValue: 'High',
        optimalRange: 'Low-Medium',
        icon: 'AlertTriangle'
      },
      {
        id: 'cost-benefit',
        name: 'Cost-Benefit Ratio',
        importance: 0.20,
        impact: 'Economic viability determines treatment selection',
        currentValue: '3.2:1',
        optimalRange: '>2:1',
        icon: 'DollarSign'
      },
      {
        id: 'environmental-impact',
        name: 'Environmental Impact',
        importance: 0.15,
        impact: 'Sustainable practices minimize ecological damage',
        currentValue: '6/10',
        optimalRange: '8-10/10',
        icon: 'Leaf'
      },
      {
        id: 'resistance-risk',
        name: 'Resistance Development',
        importance: 0.10,
        impact: 'Rotation strategies prevent resistance buildup',
        currentValue: 'Medium risk',
        optimalRange: 'Low risk',
        icon: 'Shield'
      }
    ]
  };

  const selectedModelData = models?.find(m => m?.id === selectedModel);
  const factors = modelFactors?.[selectedModel] || [];

  const getImportanceColor = (importance) => {
    if (importance >= 0.25) return 'bg-error';
    if (importance >= 0.15) return 'bg-warning';
    return 'bg-success';
  };

  const getImportanceLabel = (importance) => {
    if (importance >= 0.25) return 'High';
    if (importance >= 0.15) return 'Medium';
    return 'Low';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
            AI Model Explanation
          </h3>
          <p className="text-sm text-text-secondary">
            Understand how AI models make predictions and recommendations
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {models?.map((model) => (
            <Button
              key={model?.id}
              variant={selectedModel === model?.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedModel(model?.id)}
              className="text-xs"
            >
              {model?.name}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Model Information */}
        <div className="bg-muted rounded-lg p-4">
          <h4 className="font-heading font-medium text-foreground mb-3">Model Information</h4>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-text-secondary">Model Type</div>
              <div className="text-sm font-medium text-foreground">{selectedModelData?.type}</div>
            </div>
            <div>
              <div className="text-sm text-text-secondary">Accuracy</div>
              <div className="text-sm font-medium text-foreground">{selectedModelData?.accuracy}%</div>
            </div>
            <div>
              <div className="text-sm text-text-secondary">Last Trained</div>
              <div className="text-sm font-medium text-foreground">{selectedModelData?.lastTrained}</div>
            </div>
            <div>
              <div className="text-sm text-text-secondary">Training Data</div>
              <div className="text-sm font-medium text-foreground">5 years historical</div>
            </div>
            <div>
              <div className="text-sm text-text-secondary">Data Points</div>
              <div className="text-sm font-medium text-foreground">2.3M samples</div>
            </div>
          </div>
        </div>

        {/* Factor Importance */}
        <div className="lg:col-span-2">
          <h4 className="font-heading font-medium text-foreground mb-4">Decision Factors</h4>
          <div className="space-y-3">
            {factors?.map((factor) => (
              <div key={factor?.id} className="border border-border rounded-lg">
                <button
                  onClick={() => setExpandedFactor(expandedFactor === factor?.id ? null : factor?.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-muted transition-agricultural"
                >
                  <div className="flex items-center space-x-3">
                    <Icon name={factor?.icon} size={20} className="text-primary" />
                    <div className="text-left">
                      <div className="font-medium text-foreground">{factor?.name}</div>
                      <div className="text-sm text-text-secondary">
                        {getImportanceLabel(factor?.importance)} importance ({(factor?.importance * 100)?.toFixed(1)}%)
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getImportanceColor(factor?.importance)}`}
                          style={{ width: `${factor?.importance * 100}%` }}
                        />
                      </div>
                    </div>
                    <Icon 
                      name={expandedFactor === factor?.id ? 'ChevronUp' : 'ChevronDown'} 
                      size={16} 
                      className="text-text-secondary"
                    />
                  </div>
                </button>

                {expandedFactor === factor?.id && (
                  <div className="px-4 pb-4 border-t border-border bg-muted/50">
                    <div className="pt-3 space-y-3">
                      <div>
                        <div className="text-sm font-medium text-foreground mb-1">Impact Description</div>
                        <p className="text-sm text-text-secondary">{factor?.impact}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm font-medium text-foreground">Current Value</div>
                          <div className="text-sm text-text-secondary">{factor?.currentValue}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-foreground">Optimal Range</div>
                          <div className="text-sm text-text-secondary">{factor?.optimalRange}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Model Performance Metrics */}
      <div className="mt-6 bg-muted rounded-lg p-4">
        <h4 className="font-heading font-medium text-foreground mb-3">Performance Metrics</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{selectedModelData?.accuracy}%</div>
            <div className="text-sm text-text-secondary">Overall Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">94.2%</div>
            <div className="text-sm text-text-secondary">Precision</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">87.6%</div>
            <div className="text-sm text-text-secondary">Recall</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">0.91</div>
            <div className="text-sm text-text-secondary">F1 Score</div>
          </div>
        </div>
      </div>
      {/* Confidence Indicator */}
      <div className="mt-4 flex items-center justify-between p-3 bg-primary/10 border border-primary/20 rounded-lg">
        <div className="flex items-center space-x-2">
          <Icon name="CheckCircle" size={20} className="text-primary" />
          <div>
            <div className="font-medium text-primary">High Confidence Prediction</div>
            <div className="text-sm text-primary/80">Model reliability: 89% based on current data quality</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-primary/80">Last updated</div>
          <div className="font-medium text-primary">{new Date()?.toLocaleTimeString()}</div>
        </div>
      </div>
    </div>
  );
};

export default ModelExplanation;