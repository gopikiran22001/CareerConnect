import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { jobsAPI } from '../services/api.jsx';
import ApplicationStatusBadge from '../components/ApplicationStatusBadge';

const JobDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      const response = await jobsAPI.getJob(id);
      setJob(response.data || mockJob);
      // Check if user has already applied
      setHasApplied(response.data?.hasApplied || false);
    } catch (error) {
      console.error('Failed to fetch job details:', error);
      setJob(mockJob); // Fallback to mock data
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.role !== 'candidate') {
      alert('Only candidates can apply for jobs');
      return;
    }

    setApplying(true);
    try {
      await jobsAPI.applyToJob(id, {
        coverLetter: 'Applied through CareerConnect platform'
      });
      setHasApplied(true);
      alert('Application submitted successfully!');
    } catch (error) {
      console.error('Failed to apply:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setApplying(false);
    }
  };

  // Mock job data
  const mockJob = {
    _id: id,
    title: 'Senior Frontend Developer',
    company: {
      name: 'TechCorp Inc.',
      logo: 'https://via.placeholder.com/80x80',
      location: 'San Francisco, CA',
      size: '500-1000 employees',
      industry: 'Technology'
    },
    location: 'San Francisco, CA',
    type: 'Full-time',
    experienceLevel: 'Senior',
    salaryMin: 120,
    salaryMax: 160,
    description: `We are looking for a skilled Senior Frontend Developer to join our growing team. You will be responsible for building and maintaining user-facing web applications using modern JavaScript frameworks.

Key Responsibilities:
• Develop responsive web applications using React and TypeScript
• Collaborate with designers and backend developers
• Optimize applications for maximum speed and scalability
• Participate in code reviews and maintain high code quality standards
• Mentor junior developers and contribute to technical decisions

Requirements:
• 5+ years of experience in frontend development
• Strong proficiency in React, JavaScript, and TypeScript
• Experience with modern CSS frameworks and preprocessors
• Knowledge of state management libraries (Redux, Zustand)
• Familiarity with testing frameworks (Jest, React Testing Library)
• Experience with version control systems (Git)
• Strong problem-solving skills and attention to detail

Nice to Have:
• Experience with Next.js or other React frameworks
• Knowledge of backend technologies (Node.js, APIs)
• Experience with cloud platforms (AWS, Azure)
• Understanding of CI/CD pipelines`,
    skills: ['React', 'JavaScript', 'TypeScript', 'CSS', 'HTML', 'Redux', 'Git'],
    benefits: [
      'Competitive salary and equity package',
      'Health, dental, and vision insurance',
      'Flexible work arrangements',
      '401(k) with company matching',
      'Professional development budget',
      'Unlimited PTO policy'
    ],
    postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    applicationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h2>
          <button onClick={() => navigate('/jobs')} className="btn-primary">
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div className="flex items-start space-x-4 mb-6 md:mb-0">
              <img
                src={job.company.logo}
                alt={job.company.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                <p className="text-xl text-gray-600 mb-2">{job.company.name}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {job.location}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                    </svg>
                    {job.type}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    {job.experienceLevel}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-600 mb-2">
                ${job.salaryMin}k - ${job.salaryMax}k
              </div>
              <div className="text-sm text-gray-500 mb-4">
                Posted {new Date(job.postedDate).toLocaleDateString()}
              </div>
              
              {user?.role === 'candidate' && (
                hasApplied ? (
                  <ApplicationStatusBadge status="applied" />
                ) : (
                  <button
                    onClick={handleApply}
                    disabled={applying}
                    className="btn-primary w-full md:w-auto"
                  >
                    {applying ? 'Applying...' : 'Apply Now'}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Description */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Description</h2>
              <div className="prose max-w-none">
                {job.description.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Required Skills */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Required Skills</h2>
              <div className="flex flex-wrap gap-3">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-primary-100 text-primary-800 rounded-lg font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Company Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">About {job.company.name}</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Industry:</span>
                  <span className="font-medium">{job.company.industry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Company Size:</span>
                  <span className="font-medium">{job.company.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{job.company.location}</span>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Benefits & Perks</h3>
              <ul className="space-y-2">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Application Deadline */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-yellow-800 mb-2">Application Deadline</h3>
              <p className="text-yellow-700">
                {new Date(job.applicationDeadline).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;