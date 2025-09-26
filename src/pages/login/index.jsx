import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import LoginForm from './components/LoginForm';
import HeroSection from './components/HeroSection';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/dashboard-overview');
    }
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Sign In - PestGuard Pro | Agricultural Intelligence Platform</title>
        <meta name="description" content="Sign in to PestGuard Pro to access AI-powered pest infestation predictions, satellite imagery analysis, and comprehensive crop protection tools for your farm." />
        <meta name="keywords" content="agricultural login, pest management, farm intelligence, crop protection, agricultural technology" />
        <meta property="og:title" content="Sign In - PestGuard Pro" />
        <meta property="og:description" content="Access your agricultural intelligence dashboard with AI-powered pest predictions and satellite monitoring." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="flex min-h-screen">
          {/* Hero Section - Left Side (60%) */}
          <div className="hidden lg:flex lg:w-3/5">
            <HeroSection />
          </div>

          {/* Login Form - Right Side (40%) */}
          <div className="w-full lg:w-2/5 flex items-center justify-center p-6 lg:p-12">
            <div className="w-full max-w-md">
              {/* Mobile Hero Content */}
              <div className="lg:hidden mb-8 text-center">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-xl font-heading font-bold text-foreground">
                      PestGuard Pro
                    </h1>
                    <p className="text-sm text-primary font-medium">
                      Agricultural Intelligence
                    </p>
                  </div>
                </div>
                <p className="text-text-secondary text-sm">
                  AI-powered pest management for modern farming
                </p>
              </div>

              <LoginForm />
            </div>
          </div>
        </div>

        {/* Mobile Trust Indicators */}
        <div className="lg:hidden bg-card border-t border-border p-6">
          <div className="flex items-center justify-center space-x-6">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span className="text-xs text-text-secondary">USDA Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14l9-5-9-5-9 5 9 5z"/>
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
              </svg>
              <span className="text-xs text-text-secondary">Research Backed</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
              </svg>
              <span className="text-xs text-text-secondary">Secure Platform</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;