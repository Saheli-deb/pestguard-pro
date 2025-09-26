import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationSelector = ({ locations, selectedLocation, onLocationChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLocationSelect = (location) => {
    onLocationChange(location);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="min-w-48 justify-between"
      >
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={16} />
          <span className="font-medium">{selectedLocation?.name}</span>
        </div>
        <Icon name="ChevronDown" size={16} />
      </Button>
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-popover border border-border rounded-lg shadow-agricultural-lg z-50 animate-slide-down">
          <div className="p-2 max-h-64 overflow-y-auto">
            {locations?.map((location) => (
              <button
                key={location?.id}
                onClick={() => handleLocationSelect(location)}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-muted transition-agricultural flex items-center justify-between"
              >
                <div>
                  <div className="font-medium text-foreground">{location?.name}</div>
                  <div className="text-sm text-text-secondary">{location?.coordinates}</div>
                </div>
                {location?.id === selectedLocation?.id && (
                  <Icon name="Check" size={16} className="text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;