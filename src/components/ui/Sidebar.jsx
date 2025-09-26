import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggle, isMobileOpen = false, onMobileClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      path: '/dashboard-overview',
      description: 'Current threats and overview'
    },
    {
      id: 'pest-map',
      label: 'Pest Map',
      icon: 'Map',
      path: '/interactive-pest-map',
      description: 'Interactive field analysis'
    },
    {
      id: 'weather',
      label: 'Weather Data',
      icon: 'Cloud',
      path: '/weather-data-dashboard',
      description: 'Environmental conditions'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: 'TrendingUp',
      path: '/pest-prediction-analytics',
      description: 'AI predictions and trends'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobileOpen && onMobileClose) {
      onMobileClose();
    }
  };

  const isActive = (path) => {
    return location?.pathname === path;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[800] lg:hidden"
          onClick={onMobileClose}
        />
      )}
      {/* Sidebar */}
      <aside 
        className={`
          fixed top-16 left-0 h-[calc(100vh-4rem)] bg-card border-r border-border z-[900] transition-all duration-300 ease-agricultural
          ${isCollapsed ? 'w-16' : 'w-60'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {!isCollapsed && (
              <h2 className="font-heading font-medium text-foreground">Navigation</h2>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="hidden lg:flex"
            >
              <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={16} />
            </Button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems?.map((item) => (
              <div key={item?.id} className="relative group">
                <button
                  onClick={() => handleNavigation(item?.path)}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-agricultural
                    ${isActive(item?.path) 
                      ? 'bg-primary text-primary-foreground shadow-agricultural' 
                      : 'text-text-secondary hover:text-foreground hover:bg-muted'
                    }
                    ${isCollapsed ? 'justify-center' : 'justify-start'}
                  `}
                >
                  <Icon 
                    name={item?.icon} 
                    size={20} 
                    className={isActive(item?.path) ? 'text-primary-foreground' : ''}
                  />
                  {!isCollapsed && (
                    <span className="font-medium">{item?.label}</span>
                  )}
                </button>

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-popover border border-border rounded-md shadow-agricultural-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-[1000] whitespace-nowrap">
                    <div className="text-sm font-medium text-foreground">{item?.label}</div>
                    <div className="text-xs text-text-secondary">{item?.description}</div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border">
            {!isCollapsed ? (
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-text-secondary hover:text-foreground hover:bg-muted transition-agricultural">
                  <Icon name="Settings" size={20} />
                  <span className="font-medium">Settings</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-text-secondary hover:text-foreground hover:bg-muted transition-agricultural">
                  <Icon name="HelpCircle" size={20} />
                  <span className="font-medium">Help & Support</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="relative group">
                  <button className="w-full flex items-center justify-center px-3 py-2 rounded-lg text-text-secondary hover:text-foreground hover:bg-muted transition-agricultural">
                    <Icon name="Settings" size={20} />
                  </button>
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-popover border border-border rounded-md shadow-agricultural-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-[1000] whitespace-nowrap">
                    <div className="text-sm font-medium text-foreground">Settings</div>
                  </div>
                </div>
                <div className="relative group">
                  <button className="w-full flex items-center justify-center px-3 py-2 rounded-lg text-text-secondary hover:text-foreground hover:bg-muted transition-agricultural">
                    <Icon name="HelpCircle" size={20} />
                  </button>
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-popover border border-border rounded-md shadow-agricultural-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-[1000] whitespace-nowrap">
                    <div className="text-sm font-medium text-foreground">Help & Support</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;