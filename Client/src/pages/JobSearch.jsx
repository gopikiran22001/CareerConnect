import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import JobCard from '../components/JobCard';
import JobFilterSidebar from '../components/JobFilterSidebar';
import { jobsAPI } from '../services/api.jsx';

const JobSearch = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    keyword: searchParams.get('keyword') || '',
    location: searchParams.get('location') || '',
    skills: [],
    experienceLevel: '',
    jobType: [],
    salaryMin: '',
    salaryMax: ''
  });

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = {
        ...filters,
        skills: filters.skills.join(','),
        jobType: filters.jobType.join(',')
      };
      
      // Remove empty values
      Object.keys(params).forEach(key => {
        if (!params[key]) delete params[key];
      });

      const response = await jobsAPI.getJobs(params);
      setJobs(response.data.jobs || mockJobs);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      setJobs(mockJobs); // Fallback to mock data
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newFilters = {
      ...filters,
      keyword: formData.get('keyword'),
      location: formData.get('location')
    };
    setFilters(newFilters);
    
    // Update URL params
    const params = new URLSearchParams();
    if (newFilters.keyword) params.set('keyword', newFilters.keyword);
    if (newFilters.location) params.set('location', newFilters.location);
    setSearchParams(params);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      keyword: filters.keyword,
      location: filters.location,
      skills: [],
      experienceLevel: '',
      jobType: [],
      salaryMin: '',
      salaryMax: ''
    };
    setFilters(clearedFilters);
  };

  // Mock data for demonstration
  const mockJobs = [
    {
      _id: '1',
      title: 'Senior Frontend Developer',
      company: { name: 'TechCorp Inc.' },
      location: 'San Francisco, CA',
      description: 'We are looking for a skilled Frontend Developer to join our team and help build amazing user experiences.',
      skills: ['React', 'JavaScript', 'TypeScript', 'CSS', 'HTML'],
      type: 'Full-time',
      experienceLevel: 'Senior',
      salaryMin: 120,
      salaryMax: 160,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      _id: '2',
      title: 'Backend Engineer',
      company: { name: 'StartupXYZ' },
      location: 'Remote',
      description: 'Join our backend team to build scalable APIs and microservices that power our platform.',
      skills: ['Node.js', 'Python', 'AWS', 'MongoDB', 'Docker'],
      type: 'Full-time',
      experienceLevel: 'Mid',
      salaryMin: 90,
      salaryMax: 130,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      _id: '3',
      title: 'Full Stack Developer',
      company: { name: 'Digital Agency' },
      location: 'New York, NY',
      description: 'Looking for a versatile developer who can work on both frontend and backend technologies.',
      skills: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Git'],
      type: 'Full-time',
      experienceLevel: 'Mid',
      salaryMin: 100,
      salaryMax: 140,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                name="keyword"
                type="text"
                placeholder="Job title, keywords, or company"
                defaultValue={filters.keyword}
                className="input-field"
              />
            </div>
            <div className="flex-1">
              <input
                name="location"
                type="text"
                placeholder="City, state, or remote"
                defaultValue={filters.location}
                className="input-field"
              />
            </div>
            <button type="submit" className="btn-primary whitespace-nowrap">
              Search Jobs
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <JobFilterSidebar
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Job Results */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {loading ? 'Searching...' : `${jobs.length} Jobs Found`}
              </h2>
              <select className="input-field w-auto">
                <option>Sort by: Most Recent</option>
                <option>Sort by: Salary (High to Low)</option>
                <option>Sort by: Salary (Low to High)</option>
                <option>Sort by: Company Name</option>
              </select>
            </div>

            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="card p-6 animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                    <div className="flex gap-2">
                      <div className="h-6 bg-gray-200 rounded w-16"></div>
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                      <div className="h-6 bg-gray-200 rounded w-18"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : jobs.length > 0 ? (
              <div className="space-y-6">
                {jobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
                <button
                  onClick={handleClearFilters}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {jobs.length > 0 && (
              <div className="flex justify-center mt-12">
                <div className="flex space-x-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-primary-600 text-white rounded-lg">
                    1
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    3
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSearch;