import React, { useState, useRef } from 'react';
import { profileAPI } from '../services/api.jsx';

const ResumeUploader = ({ currentResume, onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (file) => {
    if (!file) return;

    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a PDF or Word document');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('resume', file);
      
      const response = await profileAPI.uploadResume(formData);
      onUploadSuccess(response.data);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Resume</h3>
        {currentResume && (
          <a
            href={currentResume.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-700 text-sm flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Current Resume
          </a>
        )}
      </div>

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {uploading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mb-4"></div>
            <p className="text-gray-600">Uploading and parsing resume...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-lg font-medium text-gray-700 mb-2">
              Drop your resume here or click to browse
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Supports PDF and Word documents (max 5MB)
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-primary"
            >
              Choose File
            </button>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileSelect}
        className="hidden"
      />

      {currentResume && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-2">Parsed Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {currentResume.parsedData?.skills && (
              <div>
                <span className="font-medium text-gray-600">Skills:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {currentResume.parsedData.skills.slice(0, 6).map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {currentResume.parsedData?.experience && (
              <div>
                <span className="font-medium text-gray-600">Experience:</span>
                <p className="text-gray-700 mt-1">{currentResume.parsedData.experience} years</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUploader;