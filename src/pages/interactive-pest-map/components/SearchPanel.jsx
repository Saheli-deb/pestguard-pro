import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchPanel = ({ onLocationSelect, onFieldSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchType, setSearchType] = useState('location'); // 'location' or 'field'

  // Mock search data
  const mockLocations = [
    {
      id: 1,
      name: 'Green Valley Farm - Field A',
      type: 'field',
      coordinates: '41.8781, -87.6298',
      area: '125 acres',
      crop: 'Corn',
      lastInspection: '2025-08-26'
    },
    {
      id: 2,
      name: 'Green Valley Farm - Field B',
      type: 'field',
      coordinates: '41.8901, -87.6401',
      area: '98 acres',
      crop: 'Soybeans',
      lastInspection: '2025-08-25'
    },
    {
      id: 3,
      name: 'Sunrise Acres - North Plot',
      type: 'field',
      coordinates: '41.8651, -87.6198',
      area: '87 acres',
      crop: 'Wheat',
      lastInspection: '2025-08-24'
    },
    {
      id: 4,
      name: 'Chicago, IL',
      type: 'location',
      coordinates: '41.8781, -87.6298',
      description: 'City center'
    },
    {
      id: 5,
      name: 'Des Moines, IA',
      type: 'location',
      coordinates: '41.5868, -93.6250',
      description: 'Agricultural hub'
    }
  ];

  const savedLocations = [
    {
      id: 1,
      name: 'Field A - Corn',
      coordinates: '41.8781, -87.6298',
      lastVisited: '2025-08-28',
      riskLevel: 'high'
    },
    {
      id: 2,
      name: 'Field B - Soybeans',
      coordinates: '41.8901, -87.6401',
      lastVisited: '2025-08-27',
      riskLevel: 'medium'
    },
    {
      id: 3,
      name: 'North Plot - Wheat',
      coordinates: '41.8651, -87.6198',
      lastVisited: '2025-08-26',
      riskLevel: 'low'
    }
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query?.trim()?.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const filtered = mockLocations?.filter(location =>
        location?.name?.toLowerCase()?.includes(query?.toLowerCase()) ||
        location?.coordinates?.includes(query) ||
        (location?.crop && location?.crop?.toLowerCase()?.includes(query?.toLowerCase()))
      );
      
      setSearchResults(filtered);
      setIsSearching(false);
    }, 300);
  };

  const handleLocationClick = (location) => {
    const [lat, lng] = location?.coordinates?.split(', ')?.map(parseFloat);
    
    if (location?.type === 'field') {
      onFieldSelect && onFieldSelect({
        ...location,
        lat,
        lng
      });
    } else {
      onLocationSelect && onLocationSelect({
        ...location,
        lat,
        lng
      });
    }
    
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleSavedLocationClick = (location) => {
    const [lat, lng] = location?.coordinates?.split(', ')?.map(parseFloat);
    onLocationSelect && onLocationSelect({
      ...location,
      lat,
      lng
    });
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getRiskIcon = (riskLevel) => {
    switch (riskLevel) {
      case 'high': return 'AlertTriangle';
      case 'medium': return 'AlertCircle';
      case 'low': return 'CheckCircle';
      default: return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-agricultural p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-medium text-foreground">Search & Navigate</h3>
        <Icon name="Search" size={18} className="text-text-secondary" />
      </div>
      {/* Search Input */}
      <div className="relative mb-4">
        <Input
          type="search"
          placeholder="Search fields, coordinates, or locations..."
          value={searchQuery}
          onChange={(e) => handleSearch(e?.target?.value)}
          className="pr-10"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {isSearching ? (
            <Icon name="Loader2" size={16} className="animate-spin text-text-secondary" />
          ) : (
            <Icon name="Search" size={16} className="text-text-secondary" />
          )}
        </div>
      </div>
      {/* Search Results */}
      {searchResults?.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-foreground mb-2">Search Results</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {searchResults?.map((result) => (
              <button
                key={result?.id}
                onClick={() => handleLocationClick(result)}
                className="w-full text-left p-3 bg-muted hover:bg-surface rounded-lg transition-agricultural"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={result?.type === 'field' ? 'MapPin' : 'Navigation'} 
                        size={14} 
                        className="text-primary" 
                      />
                      <span className="text-sm font-medium text-foreground truncate">
                        {result?.name}
                      </span>
                    </div>
                    <div className="text-xs text-text-secondary mt-1">
                      {result?.coordinates}
                    </div>
                    {result?.crop && (
                      <div className="text-xs text-text-secondary">
                        {result?.area} • {result?.crop}
                      </div>
                    )}
                  </div>
                  <Icon name="ChevronRight" size={14} className="text-text-secondary" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Quick Actions */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-foreground mb-2">Quick Actions</h4>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSearch('corn')}
            className="justify-start"
          >
            <Icon name="Wheat" size={14} className="mr-2" />
            Find Corn Fields
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSearch('high risk')}
            className="justify-start"
          >
            <Icon name="AlertTriangle" size={14} className="mr-2" />
            High Risk Areas
          </Button>
        </div>
      </div>
      {/* Saved Locations */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-2">Recent Locations</h4>
        <div className="space-y-2">
          {savedLocations?.map((location) => (
            <button
              key={location?.id}
              onClick={() => handleSavedLocationClick(location)}
              className="w-full text-left p-3 bg-muted hover:bg-surface rounded-lg transition-agricultural"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={14} className="text-primary" />
                    <span className="text-sm font-medium text-foreground truncate">
                      {location?.name}
                    </span>
                  </div>
                  <div className="text-xs text-text-secondary mt-1">
                    Last visited: {location?.lastVisited}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={getRiskIcon(location?.riskLevel)} 
                    size={14} 
                    className={getRiskColor(location?.riskLevel)} 
                  />
                  <Icon name="ChevronRight" size={14} className="text-text-secondary" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Coordinate Input */}
      <div className="mt-4 pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-2">Go to Coordinates</h4>
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="41.8781, -87.6298"
            className="flex-1 text-sm"
          />
          <Button variant="outline" size="sm">
            <Icon name="Navigation" size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;