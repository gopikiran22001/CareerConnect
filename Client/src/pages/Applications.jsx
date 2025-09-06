import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { applicationsAPI } from '../services/api.jsx';
import ApplicationStatusBadge from '../components/ApplicationStatusBadge';

const Applications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await applicationsAPI.getMyApplications();
      setApplications(response.data || mockApplications);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
      setApplications(mockApplications); // Fallback to mock data
    } finally {
      setLoading(false);
    }
  };

  // Mock applications data
  const mockApplications = [
    {
      _id: '1',
      job: {
        _id: '1',
        title: 'Senior Frontend Developer',
        company: { name: 'TechCorp Inc.' },
        location: 'San Francisco, CA',
        salaryMin: 120,
        salaryMax: 160
      },
      status: 'under review',
      appliedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      _id: '2',
      job: {
        _id: '2',
        title: 'Backend Engineer',
        company: { name: 'StartupXYZ' },
        location: 'Remote',
        salaryMin: 90,
        salaryMax: 130
      },
      status: 'shortlisted',
      appliedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      _id: '3',
      job: {
        _id: '3',
        title: 'Full Stack Developer',
        company: { name: 'Digital Agency' },
        location: 'New York, NY',
        salaryMin: 100,
        salaryMax: 140
      },
      status: 'rejected',
      appliedDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status.toLowerCase() === filter;
  });

  const getStatusCount = (status) => {
    return applications.filter(app => 
      status === 'all' ? true : app.status.toLowerCase() === status
    ).length;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!user || user.role !== 'candidate') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">This page is only available for candidates.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Applications</h1>
          <p className="text-gray-600">Track the status of your job applications</p>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'all', label: 'All Applications' },
                { key: 'applied', label: 'Applied' },
                { key: 'under review', label: 'Under Review' },
                { key: 'shortlisted', label: 'Shortlisted' },
                { key: 'rejected', label: 'Rejected' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    filter === tab.key
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label} ({getStatusCount(tab.key)})
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Applications List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : filteredApplications.length > 0 ? (
          <div className="space-y-6">
            {filteredApplications.map((application) => (
              <div key={application._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1 mb-4 md:mb-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {application.job.title}
                        </h3>
                        <ApplicationStatusBadge status={application.status} />
                      </div>
                      
                      <p className="text-gray-600 mb-2">{application.job.company.name}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          {application.job.location}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                          ${application.job.salaryMin}k - ${application.job.salaryMax}k
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span>Applied: {formatDate(application.appliedDate)}</span>
                        <span>Last Updated: {formatDate(application.lastUpdated)}</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        to={`/jobs/${application.job._id}`}
                        className="btn-secondary text-center"
                      >
                        View Job
                      </Link>
                      {application.status === 'shortlisted' && (
                        <button className="btn-primary">
                          Schedule Interview
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Timeline/Progress */}
                <div className="border-t border-gray-100 px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Applied</span>
                    </div>
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${
                        ['under review', 'shortlisted', 'hired'].includes(application.status.toLowerCase())
                          ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                      <span className="text-sm text-gray-600">Under Review</span>
                    </div>
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${
                        ['shortlisted', 'hired'].includes(application.status.toLowerCase())
                          ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                      <span className="text-sm text-gray-600">Interview</span>
                    </div>
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${
                        application.status.toLowerCase() === 'hired' ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                      <span className="text-sm text-gray-600">Hired</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filter === 'all' ? 'No applications yet' : `No ${filter} applications`}
            </h3>
            <p className="text-gray-600 mb-6">
              {filter === 'all' 
                ? "Start applying to jobs to see your applications here"
                : `You don't have any ${filter} applications at the moment`
              }
            </p>
            <Link to="/jobs" className="btn-primary">
              Browse Jobs
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;