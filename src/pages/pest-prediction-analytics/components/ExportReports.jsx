import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExportReports = () => {
  const [selectedReportType, setSelectedReportType] = useState('comprehensive');
  const [exportFormat, setExportFormat] = useState('pdf');
  const [isExporting, setIsExporting] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: '2025-08-01',
    end: '2025-08-28'
  });

  const reportTypes = [
    {
      id: 'comprehensive',
      name: 'Comprehensive Analysis',
      description: 'Complete pest prediction report with all analytics and recommendations',
      icon: 'FileText',
      estimatedSize: '2.5 MB',
      estimatedTime: '30-45 seconds'
    },
    {
      id: 'executive-summary',
      name: 'Executive Summary',
      description: 'High-level overview with key insights and action items',
      icon: 'BarChart3',
      estimatedSize: '800 KB',
      estimatedTime: '10-15 seconds'
    },
    {
      id: 'field-specific',
      name: 'Field-Specific Report',
      description: 'Detailed analysis for individual field locations',
      icon: 'MapPin',
      estimatedSize: '1.2 MB',
      estimatedTime: '20-30 seconds'
    },
    {
      id: 'treatment-recommendations',
      name: 'Treatment Recommendations',
      description: 'Focused report on recommended treatments and timing',
      icon: 'Beaker',
      estimatedSize: '600 KB',
      estimatedTime: '15-20 seconds'
    },
    {
      id: 'risk-assessment',
      name: 'Risk Assessment',
      description: 'Risk analysis with probability scores and confidence levels',
      icon: 'AlertTriangle',
      estimatedSize: '900 KB',
      estimatedTime: '15-25 seconds'
    }
  ];

  const exportFormats = [
    { id: 'pdf', name: 'PDF Document', icon: 'FileText', description: 'Formatted report for printing and sharing' },
    { id: 'excel', name: 'Excel Spreadsheet', icon: 'Table', description: 'Data tables for further analysis' },
    { id: 'csv', name: 'CSV Data', icon: 'Database', description: 'Raw data for custom processing' },
    { id: 'powerpoint', name: 'PowerPoint', icon: 'Presentation', description: 'Presentation slides for meetings' }
  ];

  const customizationOptions = [
    { id: 'include-charts', name: 'Include Charts and Graphs', checked: true },
    { id: 'include-maps', name: 'Include Map Visualizations', checked: true },
    { id: 'include-raw-data', name: 'Include Raw Data Tables', checked: false },
    { id: 'include-methodology', name: 'Include AI Model Methodology', checked: false },
    { id: 'include-recommendations', name: 'Include Action Recommendations', checked: true },
    { id: 'include-confidence-scores', name: 'Include Confidence Scores', checked: true }
  ];

  const [customOptions, setCustomOptions] = useState(
    customizationOptions?.reduce((acc, option) => ({
      ...acc,
      [option?.id]: option?.checked
    }), {})
  );

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Create mock download
    const selectedReport = reportTypes?.find(r => r?.id === selectedReportType);
    const selectedFormat = exportFormats?.find(f => f?.id === exportFormat);
    
    const filename = `pest-prediction-${selectedReportType}-${dateRange?.start}-to-${dateRange?.end}.${exportFormat}`;
    
    // In a real application, this would trigger an actual file download
    console.log(`Exporting ${filename}`);
    
    setIsExporting(false);
    
    // Show success message (in real app, this might be a toast notification)
    alert(`Report exported successfully: ${filename}`);
  };

  const handleCustomOptionChange = (optionId) => {
    setCustomOptions(prev => ({
      ...prev,
      [optionId]: !prev?.[optionId]
    }));
  };

  const selectedReport = reportTypes?.find(r => r?.id === selectedReportType);
  const selectedFormatData = exportFormats?.find(f => f?.id === exportFormat);

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
            Export Reports
          </h3>
          <p className="text-sm text-text-secondary">
            Generate detailed reports for record-keeping and consultant sharing
          </p>
        </div>
        <Icon name="Download" size={24} className="text-primary" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Report Configuration */}
        <div className="space-y-6">
          {/* Report Type Selection */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Report Type</h4>
            <div className="space-y-2">
              {reportTypes?.map((report) => (
                <label
                  key={report?.id}
                  className={`block p-3 border rounded-lg cursor-pointer transition-agricultural ${
                    selectedReportType === report?.id
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <input
                      type="radio"
                      name="reportType"
                      value={report?.id}
                      checked={selectedReportType === report?.id}
                      onChange={(e) => setSelectedReportType(e?.target?.value)}
                      className="mt-1 w-4 h-4 text-primary border-border focus:ring-primary"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Icon name={report?.icon} size={16} className="text-primary" />
                        <span className="font-medium text-foreground">{report?.name}</span>
                      </div>
                      <p className="text-sm text-text-secondary mt-1">{report?.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-text-secondary">
                        <span>Size: {report?.estimatedSize}</span>
                        <span>Time: {report?.estimatedTime}</span>
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Export Format */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Export Format</h4>
            <div className="grid grid-cols-2 gap-2">
              {exportFormats?.map((format) => (
                <label
                  key={format?.id}
                  className={`block p-3 border rounded-lg cursor-pointer transition-agricultural ${
                    exportFormat === format?.id
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="exportFormat"
                      value={format?.id}
                      checked={exportFormat === format?.id}
                      onChange={(e) => setExportFormat(e?.target?.value)}
                      className="w-4 h-4 text-primary border-border focus:ring-primary"
                    />
                    <Icon name={format?.icon} size={16} className="text-primary" />
                    <div>
                      <div className="font-medium text-foreground text-sm">{format?.name}</div>
                      <div className="text-xs text-text-secondary">{format?.description}</div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Date Range</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-text-secondary mb-1">Start Date</label>
                <input
                  type="date"
                  value={dateRange?.start}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e?.target?.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1">End Date</label>
                <input
                  type="date"
                  value={dateRange?.end}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e?.target?.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Customization Options */}
        <div className="space-y-6">
          {/* Report Customization */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Report Customization</h4>
            <div className="space-y-3">
              {customizationOptions?.map((option) => (
                <label key={option?.id} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={customOptions?.[option?.id]}
                    onChange={() => handleCustomOptionChange(option?.id)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary rounded"
                  />
                  <span className="text-sm text-foreground">{option?.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Export Preview */}
          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-3">Export Preview</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Report Type:</span>
                <span className="text-foreground">{selectedReport?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Format:</span>
                <span className="text-foreground">{selectedFormatData?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Date Range:</span>
                <span className="text-foreground">{dateRange?.start} to {dateRange?.end}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Estimated Size:</span>
                <span className="text-foreground">{selectedReport?.estimatedSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Processing Time:</span>
                <span className="text-foreground">{selectedReport?.estimatedTime}</span>
              </div>
            </div>
          </div>

          {/* Recent Exports */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Recent Exports</h4>
            <div className="space-y-2">
              {[
                { name: 'comprehensive-2025-08-20.pdf', date: '2025-08-25', size: '2.3 MB' },
                { name: 'executive-summary-2025-08-15.xlsx', date: '2025-08-23', size: '850 KB' },
                { name: 'field-specific-2025-08-10.pdf', date: '2025-08-21', size: '1.1 MB' }
              ]?.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                  <div className="flex items-center space-x-2">
                    <Icon name="FileText" size={16} className="text-text-secondary" />
                    <div>
                      <div className="text-sm font-medium text-foreground">{file?.name}</div>
                      <div className="text-xs text-text-secondary">{file?.date} • {file?.size}</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Icon name="Download" size={14} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Export Button */}
      <div className="mt-6 flex items-center justify-between pt-4 border-t border-border">
        <div className="text-sm text-text-secondary">
          Report will be generated and downloaded automatically
        </div>
        <Button
          onClick={handleExport}
          disabled={isExporting}
          loading={isExporting}
          iconName="Download"
          iconPosition="left"
          iconSize={16}
        >
          {isExporting ? 'Generating Report...' : 'Export Report'}
        </Button>
      </div>
    </div>
  );
};

export default ExportReports;