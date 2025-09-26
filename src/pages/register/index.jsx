import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import RegistrationSteps from './components/RegistrationSteps';
import AccountInfoStep from './components/AccountInfoStep';
import FarmDetailsStep from './components/FarmDetailsStep';
import PreferencesStep from './components/PreferencesStep';
import BenefitsSidebar from './components/BenefitsSidebar';
import SecurityBadges from './components/SecurityBadges';

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1: Account Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    
    // Step 2: Farm Details
    farmName: '',
    city: '',
    state: '',
    zipCode: '',
    totalAcreage: '',
    farmType: '',
    primaryCrops: [],
    yearsExperience: '',
    
    // Step 3: Preferences
    units: 'imperial',
    timezone: 'America/Chicago',
    alertFrequency: 'daily',
    notifications: {
      email: true,
      sms: false,
      weather: true,
      weeklyReports: true,
      treatmentReminders: true
    },
    onboardingTour: false,
    sampleData: true,
    marketingEmails: false
  });

  const [errors, setErrors] = useState({});

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/?.test(formData?.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData?.farmName?.trim()) {
      newErrors.farmName = 'Farm name is required';
    }
    
    if (!formData?.city?.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!formData?.state) {
      newErrors.state = 'State is required';
    }
    
    if (!formData?.zipCode?.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/?.test(formData?.zipCode)) {
      newErrors.zipCode = 'Please enter a valid ZIP code';
    }
    
    if (!formData?.totalAcreage) {
      newErrors.totalAcreage = 'Total acreage is required';
    } else if (formData?.totalAcreage < 1) {
      newErrors.totalAcreage = 'Acreage must be greater than 0';
    }
    
    if (!formData?.farmType) {
      newErrors.farmType = 'Farm type is required';
    }
    
    if (!formData?.primaryCrops || formData?.primaryCrops?.length === 0) {
      newErrors.primaryCrops = 'Please select at least one primary crop';
    }
    
    return newErrors;
  };

  const validateStep3 = () => {
    const newErrors = {};
    
    if (!formData?.units) {
      newErrors.units = 'Please select measurement units';
    }
    
    if (!formData?.timezone) {
      newErrors.timezone = 'Please select your timezone';
    }
    
    if (!formData?.alertFrequency) {
      newErrors.alertFrequency = 'Please select alert frequency';
    }
    
    return newErrors;
  };

  const handleNext = () => {
    let stepErrors = {};
    
    if (currentStep === 1) {
      stepErrors = validateStep1();
    } else if (currentStep === 2) {
      stepErrors = validateStep2();
    } else if (currentStep === 3) {
      stepErrors = validateStep3();
    }
    
    if (Object.keys(stepErrors)?.length > 0) {
      setErrors(stepErrors);
      return;
    }
    
    setErrors({});
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowSuccess(true);
      
      // Redirect after showing success message
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <AccountInfoStep
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
        );
      case 2:
        return (
          <FarmDetailsStep
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
        );
      case 3:
        return (
          <PreferencesStep
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
        );
      default:
        return null;
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-card rounded-lg shadow-agricultural-lg p-8 text-center">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>
          <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">
            Registration Successful!
          </h2>
          <p className="text-text-secondary mb-6 leading-relaxed">
            Welcome to PestGuard Pro! We've sent a verification email to{' '}
            <span className="font-medium text-foreground">{formData?.email}</span>.
            Please check your inbox and click the verification link to activate your account.
          </p>
          <div className="bg-muted rounded-lg p-4 mb-6">
            <h3 className="font-medium text-foreground mb-2">Next Steps:</h3>
            <ul className="text-sm text-text-secondary space-y-1 text-left">
              <li>• Verify your email address</li>
              <li>• Complete your farm profile</li>
              <li>• Set up your first field boundaries</li>
              <li>• Start receiving pest predictions</li>
            </ul>
          </div>
          <p className="text-sm text-text-secondary">
            Redirecting to login page in a few seconds...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <BenefitsSidebar />
      <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
        <div className="max-w-2xl w-full">
          <div className="bg-card rounded-lg shadow-agricultural-lg p-8">
            <RegistrationSteps currentStep={currentStep} totalSteps={3} />
            
            <form onSubmit={(e) => e?.preventDefault()}>
              {renderCurrentStep()}
              
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                <div className="flex items-center space-x-4">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      disabled={isLoading}
                    >
                      <Icon name="ChevronLeft" size={16} />
                      Back
                    </Button>
                  )}
                </div>
                
                <div className="flex items-center space-x-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => navigate('/login')}
                    disabled={isLoading}
                  >
                    Already have an account?
                  </Button>
                  
                  <Button
                    type="button"
                    onClick={handleNext}
                    loading={isLoading}
                    iconName={currentStep === 3 ? 'Check' : 'ChevronRight'}
                    iconPosition={currentStep === 3 ? 'left' : 'right'}
                  >
                    {currentStep === 3 ? 'Create Account' : 'Next'}
                  </Button>
                </div>
              </div>
            </form>
          </div>
          
          <SecurityBadges />
        </div>
      </div>
    </div>
  );
};

export default Register;