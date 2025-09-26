import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimelineSlider = ({ onTimeChange, isPlaying, onPlayToggle }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  // Generate timeline data for the past 30 days and next 7 days
  const generateTimelineData = () => {
    const data = [];
    const today = new Date();
    
    // Past 30 days
    for (let i = 30; i >= 0; i--) {
      const date = new Date(today);
      date?.setDate(date?.getDate() - i);
      data?.push({
        date: date,
        label: i === 0 ? 'Today' : `${i}d ago`,
        type: 'historical',
        value: i
      });
    }
    
    // Next 7 days (predictions)
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date?.setDate(date?.getDate() + i);
      data?.push({
        date: date,
        label: `+${i}d`,
        type: 'prediction',
        value: 30 + i
      });
    }
    
    return data;
  };

  const timelineData = generateTimelineData();
  const maxValue = timelineData?.length - 1;

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const next = prev + 1;
          if (next > maxValue) {
            onPlayToggle(false);
            return maxValue;
          }
          return next;
        });
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, maxValue, onPlayToggle]);

  useEffect(() => {
    onTimeChange(currentTime);
  }, [currentTime, onTimeChange]);

  const handleSliderChange = (e) => {
    const value = parseInt(e?.target?.value);
    setCurrentTime(value);
  };

  const getCurrentData = () => {
    return timelineData?.[currentTime] || timelineData?.[0];
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date?.getFullYear() !== new Date()?.getFullYear() ? 'numeric' : undefined
    });
  };

  const speedOptions = [
    { value: 0.5, label: '0.5x' },
    { value: 1, label: '1x' },
    { value: 2, label: '2x' },
    { value: 4, label: '4x' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-agricultural p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-medium text-foreground">Timeline Control</h3>
        <div className="flex items-center space-x-2">
          <span className={`text-xs px-2 py-1 rounded ${
            getCurrentData()?.type === 'historical' ?'bg-blue-100 text-blue-700' :'bg-orange-100 text-orange-700'
          }`}>
            {getCurrentData()?.type === 'historical' ? 'Historical' : 'Prediction'}
          </span>
        </div>
      </div>
      {/* Current Date Display */}
      <div className="text-center mb-4">
        <div className="text-lg font-heading font-medium text-foreground">
          {formatDate(getCurrentData()?.date)}
        </div>
        <div className="text-sm text-text-secondary">
          {getCurrentData()?.label}
        </div>
      </div>
      {/* Timeline Slider */}
      <div className="relative mb-4">
        <input
          type="range"
          min="0"
          max={maxValue}
          value={currentTime}
          onChange={handleSliderChange}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, 
              var(--color-primary) 0%, 
              var(--color-primary) ${(currentTime / maxValue) * 100}%, 
              var(--color-muted) ${(currentTime / maxValue) * 100}%, 
              var(--color-muted) 100%)`
          }}
        />
        
        {/* Timeline markers */}
        <div className="flex justify-between mt-2 px-1">
          <span className="text-xs text-text-secondary">30d ago</span>
          <span className="text-xs text-text-secondary">Today</span>
          <span className="text-xs text-text-secondary">+7d</span>
        </div>
      </div>
      {/* Playback Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentTime(Math.max(0, currentTime - 1))}
            disabled={currentTime === 0}
          >
            <Icon name="SkipBack" size={16} />
          </Button>
          
          <Button
            variant={isPlaying ? "default" : "outline"}
            size="icon"
            onClick={() => onPlayToggle(!isPlaying)}
          >
            <Icon name={isPlaying ? "Pause" : "Play"} size={16} />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentTime(Math.min(maxValue, currentTime + 1))}
            disabled={currentTime === maxValue}
          >
            <Icon name="SkipForward" size={16} />
          </Button>
        </div>

        {/* Speed Control */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-text-secondary">Speed:</span>
          <select
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(parseFloat(e?.target?.value))}
            className="text-xs bg-muted border border-border rounded px-2 py-1"
          >
            {speedOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Quick Navigation */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentTime(0)}
          className="text-xs"
        >
          <Icon name="RotateCcw" size={14} className="mr-1" />
          Start
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentTime(30)}
          className="text-xs"
        >
          <Icon name="Calendar" size={14} className="mr-1" />
          Today
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentTime(maxValue)}
          className="text-xs"
        >
          <Icon name="FastForward" size={14} className="mr-1" />
          Latest
        </Button>
      </div>
    </div>
  );
};

export default TimelineSlider;