import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'Bank-Level Security',
      description: '256-bit SSL encryption protects your data'
    },
    {
      icon: 'Lock',
      title: 'Privacy Protected',
      description: 'Your farm data stays confidential and secure'
    },
    {
      icon: 'Award',
      title: 'USDA Compliant',
      description: 'Meets all agricultural data standards'
    },
    {
      icon: 'Users',
      title: 'Trusted Platform',
      description: 'Used by 10,000+ farmers nationwide'
    }
  ];

  return (
    <div className="bg-muted rounded-lg p-6 mt-8">
      <div className="text-center mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
          Your Data is Safe & Secure
        </h3>
        <p className="text-sm text-text-secondary">
          We take data security and privacy seriously
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-success/10 text-success rounded-lg flex-shrink-0">
              <Icon name={feature?.icon} size={16} />
            </div>
            <div>
              <h4 className="font-medium text-foreground text-sm">{feature?.title}</h4>
              <p className="text-xs text-text-secondary">{feature?.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-xs text-text-secondary text-center">
          By creating an account, you agree to our{' '}
          <a href="#" className="text-primary hover:underline">Terms of Service</a>{' '}
          and{' '}
          <a href="#" className="text-primary hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default SecurityBadges;