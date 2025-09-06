import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { profileAPI } from '../services/api.jsx';
import ResumeUploader from '../components/ResumeUploader';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    location: '',
    phone: '',
    skills: [],
    education: [],
    experience: [],
    bio: ''
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || '',
        email: user.email || '',
        location: user.location || '',
        phone: user.phone || '',
        skills: user.skills || [],
        education: user.education || [],
        experience: user.experience || [],
        bio: user.bio || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile({
        ...profile,
        skills: [...profile.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await profileAPI.updateProfile(profile);
      setEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResumeUploadSuccess = (resumeData) => {
    // Update profile with parsed resume data
    if (resumeData.parsedData) {
      setProfile(prev => ({
        ...prev,
        skills: [...new Set([...prev.skills, ...(resumeData.parsedData.skills || [])])],
        // Add other parsed fields as needed
      }));
    }
    alert('Resume uploaded successfully!');
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
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-white">My Profile</h1>
                <p className="text-primary-100 mt-1">Manage your professional information</p>
              </div>
              <button
                onClick={() => setEditing(!editing)}
                className="bg-white text-primary-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                {editing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    disabled={!editing}
                    className="input-field disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    disabled={!editing}
                    className="input-field disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={profile.location}
                    onChange={handleInputChange}
                    disabled={!editing}
                    placeholder="City, State"
                    className="input-field disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleInputChange}
                    disabled={!editing}
                    placeholder="(555) 123-4567"
                    className="input-field disabled:bg-gray-50"
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Professional Summary</h2>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
                disabled={!editing}
                rows={4}
                placeholder="Write a brief summary about your professional background and career goals..."
                className="input-field disabled:bg-gray-50"
              />
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Skills</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
                  >
                    {skill}
                    {editing && (
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-2 text-primary-600 hover:text-primary-800"
                      >
                        ×
                      </button>
                    )}
                  </span>
                ))}
              </div>
              {editing && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                    placeholder="Add a skill"
                    className="input-field flex-1"
                  />
                  <button
                    onClick={handleAddSkill}
                    className="btn-primary"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>

            {/* Resume Upload */}
            <div>
              <ResumeUploader
                currentResume={user.resume}
                onUploadSuccess={handleResumeUploadSuccess}
              />
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Work Experience</h2>
              {profile.experience.length > 0 ? (
                <div className="space-y-4">
                  {profile.experience.map((exp, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                      <p className="text-sm text-gray-500">{exp.duration}</p>
                      <p className="text-gray-700 mt-2">{exp.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <p className="text-gray-500">No work experience added yet</p>
                  {editing && (
                    <button className="mt-2 text-primary-600 hover:text-primary-700">
                      Add Experience
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Education</h2>
              {profile.education.length > 0 ? (
                <div className="space-y-4">
                  {profile.education.map((edu, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-600">{edu.school}</p>
                      <p className="text-sm text-gray-500">{edu.year}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <p className="text-gray-500">No education information added yet</p>
                  {editing && (
                    <button className="mt-2 text-primary-600 hover:text-primary-700">
                      Add Education
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Save Button */}
            {editing && (
              <div className="flex justify-end space-x-4 pt-6 border-t">
                <button
                  onClick={() => setEditing(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="btn-primary"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;