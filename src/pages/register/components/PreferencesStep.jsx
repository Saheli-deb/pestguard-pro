import React from 'react';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const PreferencesStep = ({ formData, setFormData, errors, setErrors }) => {
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleNotificationChange = (type, checked) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev?.notifications,
        [type]: checked
      }
    }));
  };

  const unitOptions = [
    { value: 'imperial', label: 'Imperial (acres, °F, inches)' },
    { value: 'metric', label: 'Metric (hectares, °C, mm)' }
  ];

  const timezoneOptions = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'America/Anchorage', label: 'Alaska Time (AKT)' },
    { value: 'Pacific/Honolulu', label: 'Hawaii Time (HST)' }
  ];

  const alertFrequencyOptions = [
    { value: 'immediate', label: 'Immediate (Real-time)' },
    { value: 'hourly', label: 'Hourly Summary' },
    { value: 'daily', label: 'Daily Summary' },
    { value: 'weekly', label: 'Weekly Summary' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
          Set Your Preferences
        </h2>
        <p className="text-text-secondary">
          Customize your experience and notification settings
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Measurement Units"
          placeholder="Select unit system"
          options={unitOptions}
          value={formData?.units}
          onChange={(value) => handleInputChange('units', value)}
          error={errors?.units}
          description="Choose your preferred measurement system"
          required
        />
        <Select
          label="Timezone"
          placeholder="Select timezone"
          options={timezoneOptions}
          value={formData?.timezone}
          onChange={(value) => handleInputChange('timezone', value)}
          error={errors?.timezone}
          searchable
          required
        />
      </div>
      <Select
        label="Alert Frequency"
        placeholder="Select alert frequency"
        options={alertFrequencyOptions}
        value={formData?.alertFrequency}
        onChange={(value) => handleInputChange('alertFrequency', value)}
        error={errors?.alertFrequency}
        description="How often you want to receive pest alerts"
        required
      />
      <div className="space-y-4">
        <h3 className="text-lg font-heading font-medium text-foreground">
          Notification Preferences
        </h3>
        <p className="text-sm text-text-secondary">
          Choose how you'd like to receive important updates and alerts
        </p>
        
        <div className="space-y-3 bg-muted p-4 rounded-lg">
          <Checkbox
            label="Email Notifications"
            description="Receive pest alerts and updates via email"
            checked={formData?.notifications?.email}
            onChange={(e) => handleNotificationChange('email', e?.target?.checked)}
          />
          <Checkbox
            label="SMS/Text Alerts"
            description="Get urgent pest warnings via text message"
            checked={formData?.notifications?.sms}
            onChange={(e) => handleNotificationChange('sms', e?.target?.checked)}
          />
          <Checkbox
            label="Weather Alerts"
            description="Receive weather-related notifications"
            checked={formData?.notifications?.weather}
            onChange={(e) => handleNotificationChange('weather', e?.target?.checked)}
          />
          <Checkbox
            label="Weekly Reports"
            description="Get weekly pest activity summaries"
            checked={formData?.notifications?.weeklyReports}
            onChange={(e) => handleNotificationChange('weeklyReports', e?.target?.checked)}
          />
          <Checkbox
            label="Treatment Reminders"
            description="Reminders for scheduled treatments"
            checked={formData?.notifications?.treatmentReminders}
            onChange={(e) => handleNotificationChange('treatmentReminders', e?.target?.checked)}
          />
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-heading font-medium text-foreground">
          Optional Features
        </h3>
        
        <div className="space-y-3 bg-muted p-4 rounded-lg">
          <Checkbox
            label="Schedule Onboarding Tour"
            description="Get a guided tour of PestGuard Pro features (30 minutes)"
            checked={formData?.onboardingTour}
            onChange={(e) => handleInputChange('onboardingTour', e?.target?.checked)}
          />
          <Checkbox
            label="Import Sample Data"
            description="Load demo data to explore features immediately"
            checked={formData?.sampleData}
            onChange={(e) => handleInputChange('sampleData', e?.target?.checked)}
          />
          <Checkbox
            label="Marketing Communications"
            description="Receive tips, best practices, and product updates"
            checked={formData?.marketingEmails}
            onChange={(e) => handleInputChange('marketingEmails', e?.target?.checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default PreferencesStep;