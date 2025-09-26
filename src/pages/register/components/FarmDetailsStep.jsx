import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FarmDetailsStep = ({ formData, setFormData, errors, setErrors }) => {
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const stateOptions = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' }
  ];

  const cropOptions = [
    { value: 'corn', label: 'Corn' },
    { value: 'soybeans', label: 'Soybeans' },
    { value: 'wheat', label: 'Wheat' },
    { value: 'cotton', label: 'Cotton' },
    { value: 'rice', label: 'Rice' },
    { value: 'barley', label: 'Barley' },
    { value: 'oats', label: 'Oats' },
    { value: 'sorghum', label: 'Sorghum' },
    { value: 'sunflower', label: 'Sunflower' },
    { value: 'canola', label: 'Canola' },
    { value: 'potatoes', label: 'Potatoes' },
    { value: 'tomatoes', label: 'Tomatoes' },
    { value: 'apples', label: 'Apples' },
    { value: 'grapes', label: 'Grapes' },
    { value: 'almonds', label: 'Almonds' },
    { value: 'other', label: 'Other' }
  ];

  const farmTypeOptions = [
    { value: 'crop', label: 'Crop Production' },
    { value: 'livestock', label: 'Livestock' },
    { value: 'mixed', label: 'Mixed Farming' },
    { value: 'organic', label: 'Organic Farming' },
    { value: 'specialty', label: 'Specialty Crops' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
          Tell Us About Your Farm
        </h2>
        <p className="text-text-secondary">
          Help us customize pest predictions for your specific operation
        </p>
      </div>
      <Input
        label="Farm/Operation Name"
        type="text"
        placeholder="Enter your farm or operation name"
        value={formData?.farmName}
        onChange={(e) => handleInputChange('farmName', e?.target?.value)}
        error={errors?.farmName}
        description="This will appear on your reports and dashboard"
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="City"
          type="text"
          placeholder="Enter city"
          value={formData?.city}
          onChange={(e) => handleInputChange('city', e?.target?.value)}
          error={errors?.city}
          required
        />
        <Select
          label="State"
          placeholder="Select state"
          options={stateOptions}
          value={formData?.state}
          onChange={(value) => handleInputChange('state', value)}
          error={errors?.state}
          searchable
          required
        />
      </div>
      <Input
        label="ZIP Code"
        type="text"
        placeholder="Enter ZIP code"
        value={formData?.zipCode}
        onChange={(e) => handleInputChange('zipCode', e?.target?.value)}
        error={errors?.zipCode}
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Total Acreage"
          type="number"
          placeholder="Enter total acres"
          value={formData?.totalAcreage}
          onChange={(e) => handleInputChange('totalAcreage', e?.target?.value)}
          error={errors?.totalAcreage}
          description="Total farmable acres"
          required
        />
        <Select
          label="Farm Type"
          placeholder="Select farm type"
          options={farmTypeOptions}
          value={formData?.farmType}
          onChange={(value) => handleInputChange('farmType', value)}
          error={errors?.farmType}
          required
        />
      </div>
      <Select
        label="Primary Crops"
        placeholder="Select your main crops"
        options={cropOptions}
        value={formData?.primaryCrops}
        onChange={(value) => handleInputChange('primaryCrops', value)}
        error={errors?.primaryCrops}
        description="Select up to 5 main crops you grow"
        multiple
        searchable
        required
      />
      <Input
        label="Years of Experience"
        type="number"
        placeholder="Enter years of farming experience"
        value={formData?.yearsExperience}
        onChange={(e) => handleInputChange('yearsExperience', e?.target?.value)}
        error={errors?.yearsExperience}
        description="Helps us provide relevant recommendations"
      />
    </div>
  );
};

export default FarmDetailsStep;