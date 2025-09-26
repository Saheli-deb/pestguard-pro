import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  const features = [
    {
      icon: 'Brain',
      title: 'AI-Powered Predictions',
      description: 'Advanced machine learning algorithms analyze satellite and weather data to predict pest infestations before they occur.'
    },
    {
      icon: 'Satellite',
      title: 'Satellite Integration',
      description: 'Real-time satellite imagery processing provides comprehensive field monitoring and early threat detection.'
    },
    {
      icon: 'TrendingUp',
      title: 'Yield Optimization',
      description: 'Proactive pest management strategies help maximize crop yields and reduce treatment costs by up to 40%.'
    }
  ];

  const stats = [
    { value: '15,000+', label: 'Farms Protected' },
    { value: '2.3M', label: 'Acres Monitored' },
    { value: '94%', label: 'Accuracy Rate' }
  ];

  return (
    <div className="relative h-full flex flex-col justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=1200&fit=crop"
          alt="Modern agricultural field with advanced farming technology"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
      </div>
      {/* Content */}
      <div className="relative z-10 px-8 lg:px-12">
        {/* Main Heading */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl">
              <Icon name="Shield" size={24} color="white" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground">
                PestGuard Pro
              </h1>
              <p className="text-lg text-primary font-medium">
                Agricultural Intelligence Platform
              </p>
            </div>
          </div>
          
          <h2 className="text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-4 leading-tight">
            Protect Your Crops with AI-Powered Pest Intelligence
          </h2>
          
          <p className="text-lg text-text-secondary leading-relaxed">
            Advanced pest infestation forecasting that combines satellite imagery, weather data, and machine learning to help farmers make proactive decisions and optimize crop protection strategies.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-6 mb-12">
          {features?.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg flex-shrink-0">
                <Icon name={feature?.icon} size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-1">
                  {feature?.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {feature?.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6">
          {stats?.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl lg:text-3xl font-heading font-bold text-primary mb-1">
                {stat?.value}
              </div>
              <div className="text-sm text-text-secondary font-medium">
                {stat?.label}
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={20} className="text-success" />
              <span className="text-sm text-text-secondary font-medium">
                USDA Certified
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="GraduationCap" size={20} className="text-success" />
              <span className="text-sm text-text-secondary font-medium">
                University Research
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={20} className="text-success" />
              <span className="text-sm text-text-secondary font-medium">
                SOC 2 Compliant
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;