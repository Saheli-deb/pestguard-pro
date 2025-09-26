import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const BenefitsSidebar = () => {
  const benefits = [
    {
      icon: 'TrendingUp',
      title: 'AI-Powered Predictions',
      description: 'Advanced algorithms analyze satellite, weather, and historical data to predict pest outbreaks up to 14 days in advance.'
    },
    {
      icon: 'Map',
      title: 'Interactive Field Mapping',
      description: 'Visualize pest pressure across your entire operation with detailed field-level insights and risk assessments.'
    },
    {
      icon: 'Shield',
      title: 'Proactive Protection',
      description: 'Get early warnings and treatment recommendations to protect your crops before damage occurs.'
    },
    {
      icon: 'BarChart3',
      title: 'Data-Driven Decisions',
      description: 'Make informed choices with comprehensive analytics and historical trend analysis.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      farm: 'Prairie View Farms, Iowa',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face',
      quote: `PestGuard Pro helped us reduce pesticide use by 30% while increasing yields. The early warning system is a game-changer.`,
      crops: 'Corn & Soybeans',
      acres: '1,200 acres'
    },
    {
      name: 'Mike Rodriguez',
      farm: 'Sunset Agriculture, Nebraska',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
      quote: `The satellite imagery integration gives us insights we never had before. We caught a pest outbreak 10 days early last season.`,
      crops: 'Wheat & Corn',
      acres: '850 acres'
    }
  ];

  const trustSignals = [
    { icon: 'Shield', text: 'USDA Certified' },
    { icon: 'Award', text: 'University Partnerships' },
    { icon: 'Lock', text: 'SOC 2 Compliant' },
    { icon: 'Users', text: '10,000+ Farmers' }
  ];

  return (
    <div className="hidden lg:flex lg:w-96 bg-primary text-primary-foreground p-8 flex-col">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-primary-foreground/20 rounded-lg">
            <Icon name="Shield" size={24} color="white" />
          </div>
          <div>
            <h1 className="text-xl font-heading font-bold">PestGuard Pro</h1>
            <p className="text-primary-foreground/80 text-sm">AI-Powered Pest Management</p>
          </div>
        </div>
        
        <h2 className="text-2xl font-heading font-semibold mb-4">
          Protect Your Crops with Advanced Intelligence
        </h2>
        <p className="text-primary-foreground/90 leading-relaxed">
          Join thousands of farmers using cutting-edge AI technology to predict, prevent, and manage pest infestations before they impact your yield.
        </p>
      </div>
      <div className="space-y-6 mb-8">
        {benefits?.map((benefit, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary-foreground/20 rounded-lg flex-shrink-0 mt-0.5">
              <Icon name={benefit?.icon} size={16} color="white" />
            </div>
            <div>
              <h3 className="font-medium text-primary-foreground mb-1">{benefit?.title}</h3>
              <p className="text-sm text-primary-foreground/80 leading-relaxed">{benefit?.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-6 mb-8">
        <h3 className="text-lg font-heading font-semibold text-primary-foreground">
          What Farmers Say
        </h3>
        {testimonials?.map((testimonial, index) => (
          <div key={index} className="bg-primary-foreground/10 rounded-lg p-4">
            <div className="flex items-start space-x-3 mb-3">
              <Image
                src={testimonial?.avatar}
                alt={testimonial?.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="font-medium text-primary-foreground">{testimonial?.name}</div>
                <div className="text-sm text-primary-foreground/80">{testimonial?.farm}</div>
                <div className="text-xs text-primary-foreground/70">
                  {testimonial?.crops} • {testimonial?.acres}
                </div>
              </div>
            </div>
            <blockquote className="text-sm text-primary-foreground/90 italic leading-relaxed">
              "{testimonial?.quote}"
            </blockquote>
          </div>
        ))}
      </div>
      <div className="mt-auto">
        <div className="border-t border-primary-foreground/20 pt-6">
          <h4 className="font-medium text-primary-foreground mb-4">Trusted by Industry</h4>
          <div className="grid grid-cols-2 gap-3">
            {trustSignals?.map((signal, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Icon name={signal?.icon} size={14} color="white" />
                <span className="text-xs text-primary-foreground/80">{signal?.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSidebar;