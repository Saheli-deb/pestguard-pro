import React from 'react';
import Icon from '../../../components/AppIcon';

const WeatherWidget = ({ weatherData }) => {
  const getWeatherIcon = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'sunny': case'clear':
        return 'Sun';
      case 'cloudy': case'overcast':
        return 'Cloud';
      case 'rainy': case'rain':
        return 'CloudRain';
      case 'stormy':
        return 'CloudLightning';
      case 'partly cloudy':
        return 'CloudSun';
      default:
        return 'Sun';
    }
  };

  const getWindDirection = (degrees) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions?.[Math.round(degrees / 22.5) % 16];
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-medium text-foreground">Current Weather</h3>
        <div className="text-xs text-text-secondary">
          Updated {weatherData?.lastUpdated}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {/* Main Weather */}
        <div className="col-span-2 flex items-center space-x-4 p-3 bg-muted rounded-lg">
          <div className="text-primary">
            <Icon name={getWeatherIcon(weatherData?.condition)} size={32} />
          </div>
          <div>
            <div className="text-2xl font-heading font-semibold text-foreground">
              {weatherData?.temperature}°F
            </div>
            <div className="text-sm text-text-secondary capitalize">
              {weatherData?.condition}
            </div>
          </div>
        </div>

        {/* Weather Details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-text-secondary">
              <Icon name="Droplets" size={16} />
              <span className="text-sm">Humidity</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {weatherData?.humidity}%
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-text-secondary">
              <Icon name="Wind" size={16} />
              <span className="text-sm">Wind</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {weatherData?.windSpeed} mph {getWindDirection(weatherData?.windDirection)}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-text-secondary">
              <Icon name="Gauge" size={16} />
              <span className="text-sm">Pressure</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {weatherData?.pressure} inHg
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-text-secondary">
              <Icon name="Eye" size={16} />
              <span className="text-sm">Visibility</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {weatherData?.visibility} mi
            </span>
          </div>
        </div>

        {/* UV Index */}
        <div className="col-span-2 p-3 bg-muted rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2 text-text-secondary">
              <Icon name="Sun" size={16} />
              <span className="text-sm">UV Index</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {weatherData?.uvIndex} - {weatherData?.uvLevel}
            </span>
          </div>
          <div className="w-full bg-background rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                weatherData?.uvIndex <= 2 ? 'bg-success' :
                weatherData?.uvIndex <= 5 ? 'bg-warning' :
                weatherData?.uvIndex <= 7 ? 'bg-accent' : 'bg-error'
              }`}
              style={{ width: `${Math.min(weatherData?.uvIndex * 10, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;