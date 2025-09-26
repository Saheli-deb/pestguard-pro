import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapContainer = ({ 
  selectedLayers, 
  onAreaSelect, 
  selectedArea, 
  timelineValue, 
  isDrawingMode,
  onDrawingComplete 
}) => {
  const mapRef = useRef(null);
  const [mapCenter, setMapCenter] = useState({ lat: 41.8781, lng: -87.6298 }); // Chicago area
  const [zoomLevel, setZoomLevel] = useState(10);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  // Mock pest data points
  const pestData = [
    {
      id: 1,
      lat: 41.8781,
      lng: -87.6298,
      pestType: 'Corn Rootworm',
      riskLevel: 'high',
      severity: 85,
      affectedArea: '12.5 acres',
      lastUpdated: '2025-08-28T10:30:00Z'
    },
    {
      id: 2,
      lat: 41.8901,
      lng: -87.6401,
      pestType: 'Aphids',
      riskLevel: 'medium',
      severity: 62,
      affectedArea: '8.3 acres',
      lastUpdated: '2025-08-28T09:15:00Z'
    },
    {
      id: 3,
      lat: 41.8651,
      lng: -87.6198,
      pestType: 'Cutworm',
      riskLevel: 'low',
      severity: 28,
      affectedArea: '3.2 acres',
      lastUpdated: '2025-08-28T08:45:00Z'
    }
  ];

  // Mock weather data
  const weatherData = {
    temperature: 72,
    humidity: 68,
    windSpeed: 12,
    precipitation: 0.2,
    conditions: 'Partly Cloudy'
  };

  const handleMapClick = (event) => {
    const rect = mapRef?.current?.getBoundingClientRect();
    const x = event?.clientX - rect?.left;
    const y = event?.clientY - rect?.top;
    
    // Convert pixel coordinates to lat/lng (simplified calculation)
    const lat = mapCenter?.lat + (rect?.height / 2 - y) * 0.001;
    const lng = mapCenter?.lng + (x - rect?.width / 2) * 0.001;

    if (isDrawingMode) {
      const newAnnotation = {
        id: Date.now(),
        lat,
        lng,
        type: 'treatment',
        note: 'Treatment area marked',
        timestamp: new Date()?.toISOString()
      };
      setAnnotations([...annotations, newAnnotation]);
      onDrawingComplete && onDrawingComplete(newAnnotation);
    } else {
      // Find nearby pest data
      const nearbyPest = pestData?.find(pest => 
        Math.abs(pest?.lat - lat) < 0.01 && Math.abs(pest?.lng - lng) < 0.01
      );

      setSelectedLocation({
        lat,
        lng,
        pestData: nearbyPest,
        weatherData,
        coordinates: `${lat?.toFixed(4)}, ${lng?.toFixed(4)}`
      });

      onAreaSelect && onAreaSelect({ lat, lng, pestData: nearbyPest });
    }
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 18));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, 3));
  };

  return (
    <div className="relative w-full h-full bg-surface rounded-lg overflow-hidden">
      {/* Map Container */}
      <div 
        ref={mapRef}
        className="w-full h-full cursor-crosshair relative"
        onClick={handleMapClick}
        style={{
          backgroundImage: selectedLayers?.satellite 
            ? `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=800&fit=crop')`
            : 'linear-gradient(45deg, #f0f9ff 25%, #e0f2fe 25%, #e0f2fe 50%, #f0f9ff 50%, #f0f9ff 75%, #e0f2fe 75%)',
          backgroundSize: selectedLayers?.satellite ? 'cover' : '20px 20px',
          backgroundPosition: 'center'
        }}
      >
        {/* Farm Boundaries Overlay */}
        {selectedLayers?.farmBoundaries && (
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full">
              <polygon
                points="100,100 300,80 350,200 200,250 80,180"
                fill="rgba(45, 80, 22, 0.1)"
                stroke="var(--color-primary)"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              <text x="200" y="160" fill="var(--color-primary)" fontSize="12" textAnchor="middle">
                Field A - Corn
              </text>
            </svg>
          </div>
        )}

        {/* Weather Radar Overlay */}
        {selectedLayers?.weather && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400 opacity-30 rounded-full animate-pulse"></div>
            <div className="absolute top-40 right-40 w-24 h-24 bg-green-400 opacity-25 rounded-full"></div>
          </div>
        )}

        {/* Pest Prediction Heat Map */}
        {selectedLayers?.pestPrediction && pestData?.map((pest) => (
          <div
            key={pest?.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              left: `${50 + (pest?.lng - mapCenter?.lng) * 1000}px`,
              top: `${50 + (mapCenter?.lat - pest?.lat) * 1000}px`
            }}
          >
            <div className={`w-8 h-8 rounded-full ${getRiskColor(pest?.riskLevel)} opacity-70 animate-pulse`}>
              <div className={`w-16 h-16 rounded-full ${getRiskColor(pest?.riskLevel)} opacity-20 absolute -top-4 -left-4`}></div>
            </div>
          </div>
        ))}

        {/* Historical Data Points */}
        {selectedLayers?.historical && (
          <div className="absolute top-32 left-32 w-2 h-2 bg-gray-600 rounded-full opacity-60"></div>
        )}

        {/* Annotations */}
        {annotations?.map((annotation) => (
          <div
            key={annotation?.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${50 + (annotation?.lng - mapCenter?.lng) * 1000}px`,
              top: `${50 + (mapCenter?.lat - annotation?.lat) * 1000}px`
            }}
          >
            <div className="w-4 h-4 bg-accent rounded-full border-2 border-white shadow-lg">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-popover border border-border rounded px-2 py-1 text-xs whitespace-nowrap">
                {annotation?.note}
              </div>
            </div>
          </div>
        ))}

        {/* Selected Location Popup */}
        {selectedLocation && (
          <div
            className="absolute transform -translate-x-1/2 -translate-y-full mb-2 z-10"
            style={{
              left: `${50 + (selectedLocation?.lng - mapCenter?.lng) * 1000}px`,
              top: `${50 + (mapCenter?.lat - selectedLocation?.lat) * 1000}px`
            }}
          >
            <div className="bg-popover border border-border rounded-lg shadow-agricultural-lg p-4 min-w-64">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-heading font-medium text-foreground">Location Details</h4>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedLocation(null)}
                  className="w-6 h-6"
                >
                  <Icon name="X" size={14} />
                </Button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-text-secondary">Coordinates</div>
                  <div className="text-sm font-data">{selectedLocation?.coordinates}</div>
                </div>

                {selectedLocation?.pestData && (
                  <div>
                    <div className="text-xs text-text-secondary">Pest Information</div>
                    <div className="text-sm font-medium text-foreground">{selectedLocation?.pestData?.pestType}</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className={`w-2 h-2 rounded-full ${getRiskColor(selectedLocation?.pestData?.riskLevel)}`}></div>
                      <span className="text-sm capitalize">{selectedLocation?.pestData?.riskLevel} Risk</span>
                      <span className="text-sm text-text-secondary">({selectedLocation?.pestData?.severity}%)</span>
                    </div>
                    <div className="text-xs text-text-secondary mt-1">
                      Affected: {selectedLocation?.pestData?.affectedArea}
                    </div>
                  </div>
                )}

                <div>
                  <div className="text-xs text-text-secondary">Weather Conditions</div>
                  <div className="text-sm">{selectedLocation?.weatherData?.temperature}°F, {selectedLocation?.weatherData?.conditions}</div>
                  <div className="text-xs text-text-secondary">
                    Humidity: {selectedLocation?.weatherData?.humidity}% | Wind: {selectedLocation?.weatherData?.windSpeed} mph
                  </div>
                </div>

                {selectedLocation?.pestData && (
                  <div className="pt-2 border-t border-border">
                    <Button variant="outline" size="sm" className="w-full">
                      View Recommendations
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomIn}
          className="bg-card shadow-agricultural"
        >
          <Icon name="Plus" size={16} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomOut}
          className="bg-card shadow-agricultural"
        >
          <Icon name="Minus" size={16} />
        </Button>
      </div>
      {/* Scale Indicator */}
      <div className="absolute bottom-4 left-4 bg-card border border-border rounded px-3 py-2 shadow-agricultural">
        <div className="flex items-center space-x-2">
          <div className="w-16 h-0.5 bg-foreground"></div>
          <span className="text-xs text-text-secondary">1 mile</span>
        </div>
      </div>
      {/* Coordinates Display */}
      <div className="absolute bottom-4 right-4 bg-card border border-border rounded px-3 py-2 shadow-agricultural">
        <div className="text-xs font-data text-text-secondary">
          {mapCenter?.lat?.toFixed(4)}, {mapCenter?.lng?.toFixed(4)} | Zoom: {zoomLevel}
        </div>
      </div>
    </div>
  );
};

export default MapContainer;