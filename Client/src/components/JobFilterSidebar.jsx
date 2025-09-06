import React, { useState } from 'react';

const JobFilterSidebar = ({ filters, onFiltersChange, onClearFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleSkillToggle = (skill) => {
    const currentSkills = localFilters.skills || [];
    const newSkills = currentSkills.includes(skill)
      ? currentSkills.filter(s => s !== skill)
      : [...currentSkills, skill];
    handleFilterChange('skills', newSkills);
  };

  const popularSkills = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'TypeScript',
    'AWS', 'Docker', 'MongoDB', 'PostgreSQL', 'Git', 'Agile'
  ];

  const experienceLevels = ['Entry', 'Mid', 'Senior', 'Lead', 'Executive'];
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Remote', 'Hybrid'];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
        <button
          onClick={onClearFilters}
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          Clear All
        </button>
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location
        </label>
        <input
          type="text"
          placeholder="Enter city or state"
          value={localFilters.location || ''}
          onChange={(e) => handleFilterChange('location', e.target.value)}
          className="input-field"
        />
      </div>

      {/* Experience Level */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Experience Level
        </label>
        <div className="space-y-2">
          {experienceLevels.map((level) => (
            <label key={level} className="flex items-center">
              <input
                type="radio"
                name="experienceLevel"
                value={level}
                checked={localFilters.experienceLevel === level}
                onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
                className="mr-2 text-primary-600"
              />
              <span className="text-sm text-gray-600">{level}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Job Type */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Job Type
        </label>
        <div className="space-y-2">
          {jobTypes.map((type) => (
            <label key={type} className="flex items-center">
              <input
                type="checkbox"
                checked={localFilters.jobType?.includes(type) || false}
                onChange={(e) => {
                  const currentTypes = localFilters.jobType || [];
                  const newTypes = e.target.checked
                    ? [...currentTypes, type]
                    : currentTypes.filter(t => t !== type);
                  handleFilterChange('jobType', newTypes);
                }}
                className="mr-2 text-primary-600"
              />
              <span className="text-sm text-gray-600">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Salary Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Salary Range (in thousands)
        </label>
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Min"
            value={localFilters.salaryMin || ''}
            onChange={(e) => handleFilterChange('salaryMin', e.target.value)}
            className="input-field flex-1"
          />
          <input
            type="number"
            placeholder="Max"
            value={localFilters.salaryMax || ''}
            onChange={(e) => handleFilterChange('salaryMax', e.target.value)}
            className="input-field flex-1"
          />
        </div>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Skills
        </label>
        <div className="flex flex-wrap gap-2">
          {popularSkills.map((skill) => (
            <button
              key={skill}
              onClick={() => handleSkillToggle(skill)}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                localFilters.skills?.includes(skill)
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filters Count */}
      {Object.keys(localFilters).length > 0 && (
        <div className="pt-4 border-t">
          <p className="text-sm text-gray-600">
            {Object.values(localFilters).filter(v => v && v.length > 0).length} filters active
          </p>
        </div>
      )}
    </div>
  );
};

export default JobFilterSidebar;