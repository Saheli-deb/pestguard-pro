import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AdvancedFilters = ({ onFiltersChange, isVisible, onToggle }) => {
  const [filters, setFilters] = useState({
    pestSpecies: [],
    cropTypes: [],
    fieldLocations: [],
    dateRange: {
      start: '2025-08-01',
      end: '2025-08-28'
    },
    riskLevel: [],
    confidenceThreshold: 80,
    dataSource: [],
    treatmentStatus: 'all'
  });

  const filterOptions = {
    pestSpecies: [
      { id: 'corn-rootworm', name: 'Corn Rootworm', count: 45 },
      { id: 'aphids', name: 'Aphids', count: 32 },
      { id: 'cutworm', name: 'Cutworm', count: 28 },
      { id: 'spider-mites', name: 'Spider Mites', count: 19 },
      { id: 'armyworm', name: 'Armyworm', count: 15 },
      { id: 'thrips', name: 'Thrips', count: 12 }
    ],
    cropTypes: [
      { id: 'corn', name: 'Corn', count: 85 },
      { id: 'soybeans', name: 'Soybeans', count: 67 },
      { id: 'wheat', name: 'Wheat', count: 43 },
      { id: 'cotton', name: 'Cotton', count: 29 }
    ],
    fieldLocations: [
      { id: 'field-7a', name: 'Field 7-A (North)', count: 12 },
      { id: 'field-12b', name: 'Field 12-B (South)', count: 18 },
      { id: 'field-3c', name: 'Field 3-C (East)', count: 15 },
      { id: 'field-9d', name: 'Field 9-D (West)', count: 22 },
      { id: 'field-15e', name: 'Field 15-E (Central)', count: 8 }
    ],
    riskLevel: [
      { id: 'low', name: 'Low Risk (0-3)', color: 'text-success', count: 25 },
      { id: 'medium', name: 'Medium Risk (4-6)', color: 'text-warning', count: 38 },
      { id: 'high', name: 'High Risk (7-10)', color: 'text-error', count: 42 }
    ],
    dataSource: [
      { id: 'satellite', name: 'Satellite Imagery', count: 156 },
      { id: 'drone', name: 'Drone Surveys', count: 89 },
      { id: 'ground-sensors', name: 'Ground Sensors', count: 234 },
      { id: 'weather-stations', name: 'Weather Stations', count: 67 },
      { id: 'manual-reports', name: 'Manual Reports', count: 45 }
    ]
  };

  const treatmentStatusOptions = [
    { id: 'all', name: 'All Fields' },
    { id: 'untreated', name: 'Untreated' },
    { id: 'recently-treated', name: 'Recently Treated' },
    { id: 'scheduled', name: 'Treatment Scheduled' }
  ];

  const handleMultiSelectChange = (category, itemId) => {
    setFilters(prev => {
      const currentSelection = prev?.[category];
      const newSelection = currentSelection?.includes(itemId)
        ? currentSelection?.filter(id => id !== itemId)
        : [...currentSelection, itemId];
      
      const updatedFilters = {
        ...prev,
        [category]: newSelection
      };
      
      onFiltersChange?.(updatedFilters);
      return updatedFilters;
    });
  };

  const handleSingleSelectChange = (category, value) => {
    const updatedFilters = {
      ...filters,
      [category]: value
    };
    setFilters(updatedFilters);
    onFiltersChange?.(updatedFilters);
  };

  const handleDateRangeChange = (field, value) => {
    const updatedFilters = {
      ...filters,
      dateRange: {
        ...filters?.dateRange,
        [field]: value
      }
    };
    setFilters(updatedFilters);
    onFiltersChange?.(updatedFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      pestSpecies: [],
      cropTypes: [],
      fieldLocations: [],
      dateRange: {
        start: '2025-08-01',
        end: '2025-08-28'
      },
      riskLevel: [],
      confidenceThreshold: 80,
      dataSource: [],
      treatmentStatus: 'all'
    };
    setFilters(resetFilters);
    onFiltersChange?.(resetFilters);
  };

  const getActiveFiltersCount = () => {
    return filters?.pestSpecies?.length + 
           filters?.cropTypes?.length + 
           filters?.fieldLocations?.length + 
           filters?.riskLevel?.length + 
           filters?.dataSource?.length +
           (filters?.treatmentStatus !== 'all' ? 1 : 0);
  };

  if (!isVisible) {
    return (
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={onToggle}
          iconName="Filter"
          iconPosition="left"
          iconSize={16}
          className="relative"
        >
          Advanced Filters
          {getActiveFiltersCount() > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
              {getActiveFiltersCount()}
            </span>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="mb-6 bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-foreground">Advanced Filters</h3>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={handleReset}>
            Reset All
          </Button>
          <Button variant="ghost" size="icon" onClick={onToggle}>
            <Icon name="X" size={16} />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Date Range */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Date Range</h4>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="date"
              label="Start Date"
              value={filters?.dateRange?.start}
              onChange={(e) => handleDateRangeChange('start', e?.target?.value)}
              className="text-sm"
            />
            <Input
              type="date"
              label="End Date"
              value={filters?.dateRange?.end}
              onChange={(e) => handleDateRangeChange('end', e?.target?.value)}
              className="text-sm"
            />
          </div>
        </div>

        {/* Confidence Threshold */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Confidence Threshold</h4>
          <div className="space-y-2">
            <Input
              type="range"
              min="0"
              max="100"
              value={filters?.confidenceThreshold}
              onChange={(e) => handleSingleSelectChange('confidenceThreshold', parseInt(e?.target?.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-text-secondary">
              <span>0%</span>
              <span className="font-medium text-foreground">{filters?.confidenceThreshold}%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Treatment Status */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Treatment Status</h4>
          <div className="space-y-2">
            {treatmentStatusOptions?.map((option) => (
              <label key={option?.id} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="treatmentStatus"
                  value={option?.id}
                  checked={filters?.treatmentStatus === option?.id}
                  onChange={(e) => handleSingleSelectChange('treatmentStatus', e?.target?.value)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary"
                />
                <span className="text-sm text-foreground">{option?.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Pest Species */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Pest Species</h4>
          <div className="max-h-40 overflow-y-auto space-y-2">
            {filterOptions?.pestSpecies?.map((pest) => (
              <label key={pest?.id} className="flex items-center justify-between cursor-pointer p-2 hover:bg-muted rounded-md transition-agricultural">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters?.pestSpecies?.includes(pest?.id)}
                    onChange={() => handleMultiSelectChange('pestSpecies', pest?.id)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary rounded"
                  />
                  <span className="text-sm text-foreground">{pest?.name}</span>
                </div>
                <span className="text-xs text-text-secondary bg-muted px-2 py-1 rounded">
                  {pest?.count}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Crop Types */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Crop Types</h4>
          <div className="space-y-2">
            {filterOptions?.cropTypes?.map((crop) => (
              <label key={crop?.id} className="flex items-center justify-between cursor-pointer p-2 hover:bg-muted rounded-md transition-agricultural">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters?.cropTypes?.includes(crop?.id)}
                    onChange={() => handleMultiSelectChange('cropTypes', crop?.id)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary rounded"
                  />
                  <span className="text-sm text-foreground">{crop?.name}</span>
                </div>
                <span className="text-xs text-text-secondary bg-muted px-2 py-1 rounded">
                  {crop?.count}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Risk Level */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Risk Level</h4>
          <div className="space-y-2">
            {filterOptions?.riskLevel?.map((risk) => (
              <label key={risk?.id} className="flex items-center justify-between cursor-pointer p-2 hover:bg-muted rounded-md transition-agricultural">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters?.riskLevel?.includes(risk?.id)}
                    onChange={() => handleMultiSelectChange('riskLevel', risk?.id)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary rounded"
                  />
                  <span className={`text-sm ${risk?.color}`}>{risk?.name}</span>
                </div>
                <span className="text-xs text-text-secondary bg-muted px-2 py-1 rounded">
                  {risk?.count}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
      {/* Field Locations - Full Width */}
      <div className="mt-6 space-y-3">
        <h4 className="font-medium text-foreground">Field Locations</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {filterOptions?.fieldLocations?.map((field) => (
            <label key={field?.id} className="flex items-center justify-between cursor-pointer p-2 hover:bg-muted rounded-md transition-agricultural">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters?.fieldLocations?.includes(field?.id)}
                  onChange={() => handleMultiSelectChange('fieldLocations', field?.id)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary rounded"
                />
                <span className="text-sm text-foreground">{field?.name}</span>
              </div>
              <span className="text-xs text-text-secondary bg-muted px-2 py-1 rounded">
                {field?.count}
              </span>
            </label>
          ))}
        </div>
      </div>
      {/* Data Sources - Full Width */}
      <div className="mt-6 space-y-3">
        <h4 className="font-medium text-foreground">Data Sources</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {filterOptions?.dataSource?.map((source) => (
            <label key={source?.id} className="flex items-center justify-between cursor-pointer p-2 hover:bg-muted rounded-md transition-agricultural">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters?.dataSource?.includes(source?.id)}
                  onChange={() => handleMultiSelectChange('dataSource', source?.id)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary rounded"
                />
                <span className="text-sm text-foreground">{source?.name}</span>
              </div>
              <span className="text-xs text-text-secondary bg-muted px-2 py-1 rounded">
                {source?.count}
              </span>
            </label>
          ))}
        </div>
      </div>
      {/* Apply Filters Button */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-text-secondary">
          {getActiveFiltersCount()} filter{getActiveFiltersCount() !== 1 ? 's' : ''} applied
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onToggle}>
            Close
          </Button>
          <Button onClick={() => onFiltersChange?.(filters)}>
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters;