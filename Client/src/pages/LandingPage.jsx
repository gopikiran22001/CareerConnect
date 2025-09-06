import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const LandingPage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '4s'}}></div>
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-16 relative z-10">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Find Your Next
            <span className="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent block">Career Move</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with top companies and discover opportunities that match your skills. 
            Whether you're a candidate looking for your dream job or a company seeking talent, 
            CareerConnect is your gateway to success.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/jobs"
              className="btn-primary text-lg px-8 py-4 group"
            >
              <span className="flex items-center justify-center">
                Search Jobs
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
            </Link>
            {user?.role === 'company' ? (
              <Link
                to="/dashboard"
                className="btn-secondary text-lg px-8 py-4 group glass-effect"
              >
                <span className="flex items-center justify-center">
                  Post a Job
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </Link>
            ) : (
              <Link
                to="/register"
                className="btn-secondary text-lg px-8 py-4 group glass-effect"
              >
                <span className="flex items-center justify-center">
                  Post a Job
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-blue-50 opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">10,000+</div>
              <div className="text-gray-600 font-medium">Active Jobs</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">5,000+</div>
              <div className="text-gray-600 font-medium">Companies</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">50,000+</div>
              <div className="text-gray-600 font-medium">Candidates</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">95%</div>
              <div className="text-gray-600 font-medium">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose CareerConnect?
            </h2>
            <p className="text-lg text-gray-600">
              We make job searching and hiring simple, efficient, and effective.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-8 text-center group hover:bg-gradient-to-br hover:from-primary-50 hover:to-blue-50">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors">Smart Job Matching</h3>
              <p className="text-gray-600 leading-relaxed">
                Our AI-powered algorithm matches you with jobs that fit your skills, experience, and preferences.
              </p>
            </div>

            <div className="card p-8 text-center group hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">Resume Parser</h3>
              <p className="text-gray-600 leading-relaxed">
                Upload your resume and let our system automatically extract your skills and experience.
              </p>
            </div>

            <div className="card p-8 text-center group hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors">Easy Application Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                Keep track of all your applications and get real-time updates on your application status.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-600 via-blue-600 to-purple-600 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-48 translate-y-48"></div>
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Take the Next Step?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of professionals who have found their dream jobs through CareerConnect.
          </p>
          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white hover:bg-gray-100 text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Get Started Today
              </Link>
              <Link
                to="/jobs"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Browse Jobs
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;