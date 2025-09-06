import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  const formatSalary = (min, max) => {
    if (!min && !max) return 'Salary not disclosed';
    if (min && max) return `$${min}k - $${max}k`;
    if (min) return `$${min}k+`;
    return `Up to $${max}k`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <div className="card p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h3>
          <p className="text-gray-600 mb-1">{job.company?.name || 'Company Name'}</p>
          <p className="text-sm text-gray-500 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {job.location}
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-primary-600">
            {formatSalary(job.salaryMin, job.salaryMax)}
          </p>
          <p className="text-sm text-gray-500">{formatDate(job.createdAt)}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-600 text-sm line-clamp-3">
          {job.description?.substring(0, 150)}...
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills?.slice(0, 4).map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
          >
            {skill}
          </span>
        ))}
        {job.skills?.length > 4 && (
          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
            +{job.skills.length - 4} more
          </span>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
            </svg>
            {job.type || 'Full-time'}
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {job.experienceLevel || 'Mid-level'}
          </span>
        </div>
        <Link
          to={`/jobs/${job._id}`}
          className="btn-primary text-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;