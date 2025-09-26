import React from 'react';
import Icon from '../../../components/AppIcon';

const RegistrationSteps = ({ currentStep, totalSteps }) => {
  const steps = [
    { number: 1, title: 'Account Info', description: 'Basic details' },
    { number: 2, title: 'Farm Details', description: 'Operation info' },
    { number: 3, title: 'Preferences', description: 'Settings' }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps?.map((step, index) => (
          <React.Fragment key={step?.number}>
            <div className="flex flex-col items-center">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center border-2 transition-agricultural
                ${currentStep >= step?.number 
                  ? 'bg-primary border-primary text-primary-foreground' 
                  : 'border-border text-text-secondary bg-background'
                }
              `}>
                {currentStep > step?.number ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <span className="text-sm font-medium">{step?.number}</span>
                )}
              </div>
              <div className="mt-2 text-center">
                <div className={`text-sm font-medium ${
                  currentStep >= step?.number ? 'text-foreground' : 'text-text-secondary'
                }`}>
                  {step?.title}
                </div>
                <div className="text-xs text-text-secondary">{step?.description}</div>
              </div>
            </div>
            {index < steps?.length - 1 && (
              <div className={`flex-1 h-0.5 mx-4 transition-agricultural ${
                currentStep > step?.number ? 'bg-primary' : 'bg-border'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default RegistrationSteps;