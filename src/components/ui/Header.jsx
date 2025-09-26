import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ onMenuToggle, isMenuOpen = false }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState('Green Valley Farm');

  const farms = [
    { id: 1, name: 'Green Valley Farm', location: 'Iowa, USA' },
    { id: 2, name: 'Sunrise Acres', location: 'Nebraska, USA' },
    { id: 3, name: 'Prairie View Ranch', location: 'Kansas, USA' }
  ];

  const notifications = [
    {
      id: 1,
      type: 'alert',
      title: 'High Pest Activity Detected',
      message: 'Corn rootworm levels elevated in Field 7',
      time: '5 min ago',
      severity: 'high'
    },
    {
      id: 2,
      type: 'weather',
      title: 'Weather Alert',
      message: 'Heavy rainfall expected in next 24 hours',
      time: '15 min ago',
      severity: 'medium'
    },
    {
      id: 3,
      type: 'system',
      title: 'Data Sync Complete',
      message: 'Latest satellite imagery updated',
      time: '1 hour ago',
      severity: 'low'
    }
  ];

  const handleFarmChange = (farm) => {
    setSelectedFarm(farm?.name);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const getSeverityIcon = (type, severity) => {
    if (type === 'alert' && severity === 'high') return 'AlertTriangle';
    if (type === 'weather') return 'Cloud';
    if (type === 'system') return 'CheckCircle';
    return 'Bell';
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-[1000]">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left Section - Logo and Menu Toggle */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="lg:hidden"
          >
            <Icon name={isMenuOpen ? 'X' : 'Menu'} size={20} />
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon name="Shield" size={20} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-heading font-semibold text-foreground">
                PestGuard Pro
              </h1>
            </div>
          </div>
        </div>

        {/* Center Section - Farm Selector */}
        <div className="hidden md:block relative">
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="min-w-48 justify-between"
            >
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} />
                <span className="font-medium">{selectedFarm}</span>
              </div>
              <Icon name="ChevronDown" size={16} />
            </Button>
            
            {isUserMenuOpen && (
              <div className="absolute top-full mt-2 w-full bg-popover border border-border rounded-lg shadow-agricultural-lg z-[1100] animate-slide-down">
                <div className="p-2">
                  {farms?.map((farm) => (
                    <button
                      key={farm?.id}
                      onClick={() => {
                        handleFarmChange(farm);
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-muted transition-agricultural flex items-center justify-between"
                    >
                      <div>
                        <div className="font-medium text-foreground">{farm?.name}</div>
                        <div className="text-sm text-text-secondary">{farm?.location}</div>
                      </div>
                      {farm?.name === selectedFarm && (
                        <Icon name="Check" size={16} className="text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Section - Notifications and User Menu */}
        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative"
            >
              <Icon name="Bell" size={20} />
              {notifications?.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-medium">
                  {notifications?.length}
                </span>
              )}
            </Button>

            {isNotificationOpen && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-agricultural-lg z-[1200] animate-slide-down">
                <div className="p-4 border-b border-border">
                  <h3 className="font-heading font-medium text-foreground">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications?.map((notification) => (
                    <div key={notification?.id} className="p-4 border-b border-border last:border-b-0 hover:bg-muted transition-agricultural">
                      <div className="flex items-start space-x-3">
                        <div className={`mt-1 ${getSeverityColor(notification?.severity)}`}>
                          <Icon name={getSeverityIcon(notification?.type, notification?.severity)} size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground text-sm">{notification?.title}</h4>
                          <p className="text-sm text-text-secondary mt-1">{notification?.message}</p>
                          <p className="text-xs text-text-secondary mt-2">{notification?.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border">
                  <Button variant="ghost" size="sm" className="w-full">
                    View All Notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="rounded-full"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
            </Button>

            {isUserMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-agricultural-lg z-[1100] animate-slide-down">
                <div className="p-2">
                  <div className="px-3 py-2 border-b border-border">
                    <div className="font-medium text-foreground">John Farmer</div>
                    <div className="text-sm text-text-secondary">john@greenvalley.com</div>
                  </div>
                  <button className="w-full text-left px-3 py-2 rounded-md hover:bg-muted transition-agricultural flex items-center space-x-2">
                    <Icon name="User" size={16} />
                    <span>Profile</span>
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-md hover:bg-muted transition-agricultural flex items-center space-x-2">
                    <Icon name="Settings" size={16} />
                    <span>Settings</span>
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-md hover:bg-muted transition-agricultural flex items-center space-x-2">
                    <Icon name="HelpCircle" size={16} />
                    <span>Help</span>
                  </button>
                  <div className="border-t border-border mt-1 pt-1">
                    <button className="w-full text-left px-3 py-2 rounded-md hover:bg-muted transition-agricultural flex items-center space-x-2 text-error">
                      <Icon name="LogOut" size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;